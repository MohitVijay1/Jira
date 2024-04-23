import { useEffect, useState } from "react";
import DraggableColumns from "../DraggableColumns/DraggableColumns";
import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import NewIssue from "../NewIssue/NewIssue";
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  InputAdornment,
  Modal,
  TextField,
  Tooltip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

const KanbanBoard = ({ project, projectId, user }) => {
  const [data, setData] = useState({});
  const [showIssue, setShowIssue] = useState(false);
  const [showColumn, setShowColumn] = useState(false);
  const [newColumn, setNewColumn] = useState("");
  const [search, setSearch] = useState("");
  const [teamMembers, setTeamMembers] = useState();

  const handleClick = () => {
    setData({ ...data, [newColumn]: [] });

    setShowColumn(false);
  };
  const handleDelete = (task) => {
    const column = task.column;

    const newData = data[column].filter(
      (item) => JSON.stringify(item) !== JSON.stringify(task)
    );

    const newData1 = data;
    newData1[column] = newData;

    setData(newData1);
  };
  const handleNewIssueClick = (
    issueType,
    column,
    issue,
    description,
    assignee,
    reporter,
    priority
  ) => {
    const obj = {
      issueType: issueType,
      column: column,
      issue: issue,
      description: description,
      assignee: assignee,
      reporter: reporter,
      priority: priority,
    };
    const newData = {
      ...data,
      [column]: [...data[column], obj],
    };

    setData(newData);
  };

  const handleModifyData = (
    issueType,
    column,
    issue,
    description,
    assignee,
    reporter,
    priority,
    task
  ) => {
    const obj = {
      issueType: issueType,
      column: column,
      issue: issue,
      description: description,
      assignee: assignee,
      reporter: reporter,
      priority: priority,
    };
    const newData = {
      ...data,
      [column]: [...data[column], obj],
    };
    const issueType1 = task.column;
    console.log(issueType1);

    const newData1 = newData[issueType1].filter((item) => {
      return JSON.stringify(item) !== JSON.stringify(task);
    });

    newData[issueType1] = newData1;

    setData(newData);
  };
  useEffect(() => {
    setData(project[0]?.data);
    setTeamMembers(project[0]?.teamMembers);
  }, [project]);
  useEffect(() => {
    console.log("update request has been called");
    const fetchData = async () => {
      const docRef = doc(db, "projects", projectId);

      await updateDoc(docRef, {
        data: data,
      });
    };
    fetchData();
  }, [data]);

  return (
    <Box sx={{ marginLeft: 10 }}>
      <div>
        <Box sx={{ marginLeft: 1, marginBottom: 1, display: "flex" }}>
          <Button
            variant="contained"
            onClick={() => {
              setShowIssue(!showIssue);
            }}
          >
            Create Issue
          </Button>

          <TextField
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{
              marginLeft: 2,
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <AvatarGroup
            sx={{
              marginLeft: 1,
            }}
          >
            {teamMembers &&
              teamMembers.map((people) => {
                return (
                  <Tooltip title={people}>
                    <Avatar
                      sx={{ backgroundColor: "#3f50b5" }}
                      alt={people.toUpperCase()}
                      src="/static/images/avatar/1.jpg"
                    />
                  </Tooltip>
                );
              })}
          </AvatarGroup>
        </Box>

        <Modal
          open={showIssue}
          onClose={() => setShowIssue(!showIssue)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <NewIssue
            data={data}
            setShowIssue={setShowIssue}
            handleNewIssueClick={handleNewIssueClick}
          />
        </Modal>
      </div>

      <Box sx={{ display: "flex" }}>
        <DraggableColumns
          data={data}
          setData={setData}
          search={search}
          user={user}
          handleModifyData={handleModifyData}
          handleDelete={handleDelete}
        />
        {!showColumn && (
          <Button
            onClick={() => setShowColumn(true)}
            sx={{
              width: 170,
              backgroundColor: "#F5F5F5",
              margin: 1,
            }}
          >
            <AddIcon />
          </Button>
        )}
        {showColumn && (
          <Box sx={{ marginTop: 1, display: "flex", flexDirection: "column" }}>
            <TextField
              onChange={(e) => setNewColumn(e.target.value)}
              autoFocus
            />

            <Box>
              {" "}
              <Button onClick={handleClick}>
                <CheckIcon />
              </Button>
              <Button onClick={() => setShowColumn(false)}>
                <ClearIcon />
              </Button>
            </Box>
          </Box>
        )}
      </Box>
      <div></div>
    </Box>
  );
};

export default KanbanBoard;
