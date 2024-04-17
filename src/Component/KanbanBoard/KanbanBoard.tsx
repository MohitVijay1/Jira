import { useEffect, useState } from "react";
import DraggableColumns from "../DraggableColumns/DraggableColumns";
import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import NewIssue from "../NewIssue/NewIssue";
import { Box, Button, Modal, TextField } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

const KanbanBoard = ({ project, projectId, user }) => {
  const [data, setData] = useState({});
  const [showIssue, setShowIssue] = useState(false);
  const [showColumn, setShowColumn] = useState(false);
  const [newColumn, setNewColumn] = useState("");

  const handleClick = () => {
    setData({ ...data, [newColumn]: [] });
    setShowColumn(false);
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
    setData(project[0].data);
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
    <div>
      <div>
        <Button
          variant="outlined"
          onClick={() => {
            setShowIssue(!showIssue);
          }}
        >
          CREATE ISSUE
        </Button>

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
            user={user}
          />
        </Modal>
      </div>

      <Box sx={{ display: "flex" }}>
        <DraggableColumns
          data={data}
          setData={setData}
          user={user}
          handleModifyData={handleModifyData}
        />
        {!showColumn && (
          <Button
            onClick={() => setShowColumn(true)}
            sx={{
              // width: 170,
              // height: "auto",
              // maxWidth: 400,
              // minHeight: "100%",
              // backgroundColor: "#F5F5F5",
              width: 170,
              maxHeight: "auto",
              marginTop: "20px",
              height: "325px",
              maxWidth: 400,
              minHeight: "100%",
              backgroundColor: "#F5F5F5",
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
    </div>
  );
};

export default KanbanBoard;
