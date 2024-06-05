import { Button, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import ErrorIcon from "@mui/icons-material/Error";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useEffect, useState } from "react";
import "./NewIssue.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import useGetCurrentUser from "../../utils/Hooks/useGetCurrentUser";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { KeyboardDoubleArrowDown } from "@mui/icons-material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { pink } from "@mui/material/colors";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import useGetUser from "../../utils/Hooks/useGetUser";

function NewIssue({
  data,
  setShowIssue,
  handleNewIssueClick,
  name,
  teamMembers,
}) {
  const [issueType, setIssueType] = useState("");
  const [column, setColumn] = useState(name);
  const [newIssue, setNewIssue] = useState("");
  const [assignee, setAssignee] = useState("");
  const [reporter, setReporter] = useState("");
  const [priority, setPriority] = useState("");
  const [description, setDescription] = useState("");
  const [members, setMembers] = useState();
  const currentUser = useGetCurrentUser();
  const user = useGetUser();
  console.log("first-col", name);

  const handleIssueType = (e) => {
    console.log(e.target.value);
    setIssueType(e.target.value);
  };
  const handleChange = (event) => {
    setIssueType(event.target.value);
  };
  const handleAssignee = (e) => {
    setAssignee(e.target.value);
  };
  const handleReporter = (e) => {
    setReporter(e.target.value);
  };

  const handlePriority = (e) => {
    setPriority(e.target.value);
  };

  const handleCreate = () => {
    handleNewIssueClick(
      issueType,
      column,
      newIssue,
      description,
      assignee,
      reporter,
      priority
    );
    setShowIssue(false);
  };
  useEffect(() => {
    console.log("name", name);
  }, [name]);

  useEffect(() => {
    setReporter(currentUser[0]?.name);
  }, [currentUser]);
  useEffect(() => {
    setMembers(teamMembers);
  }, [teamMembers]);
  return (
    <Box className="newissue-overlay">
      <Box
        sx={{
          borderRadius: 2,
          marginTop: 55,
          height: "1000px",
          marginBottom: 3,
        }}
        className="newissue-card"
      >
        <Typography
          variant="h5"
          sx={{ marginRight: 71, marginBottom: 5, fontWeight: "bold" }}
        >
          Create issue
        </Typography>
        <Box sx={{ width: 700 }}>
          <Typography
            sx={{
              color: "#5E6C84",
              fontSize: "13px",
              marginBottom: 1,
              fontWeight: "bold",
            }}
          >
            Issue Type
          </Typography>
          <FormControl fullWidth>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={issueType}
              onChange={handleIssueType}
              required
              autoFocus
              sx={{
                backgroundColor: "#F4F5F7",
                height: 30,
              }}
            >
              <MenuItem value={"bug"}>
                <Box sx={{ display: "flex" }}>
                  <ErrorIcon sx={{ color: pink[500] }} />
                  Bug
                </Box>
              </MenuItem>
              <MenuItem value="Task">
                <Box sx={{ display: "flex" }}>
                  <CheckBoxIcon color="primary" />
                  Task
                </Box>
              </MenuItem>
              <MenuItem value="Story">
                {" "}
                <Box sx={{ display: "flex" }}>
                  <BookmarkIcon color="success" />
                  Story
                </Box>
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ width: 700, marginTop: 3 }}>
          <Typography
            sx={{
              color: "#5E6C84",
              fontSize: "13px",
              marginBottom: 1,
              fontWeight: "bold",
            }}
          >
            Column Name
          </Typography>
          <FormControl fullWidth>
            <Select
              value={column}
              onChange={(e) => setColumn(e.target.value)}
              required
              sx={{
                backgroundColor: "#F4F5F7",
                height: 30,
              }}
            >
              {Object.entries(data)?.map((key, index) => {
                return (
                  <MenuItem value={key[0]} key={index}>
                    {key[0]}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ marginTop: 4 }}>
          <Typography
            sx={{ color: "#5E6C84", fontSize: "13px", marginBottom: 1 }}
          >
            Short Summary
          </Typography>
          <TextField
            placeholder="Enter your issue "
            value={newIssue}
            onChange={(e) => setNewIssue(e.target.value)}
            sx={{ width: 700, backgroundColor: "#F4F5F7" }}
            size="small"
          />
          <Typography
            sx={{ color: "#5E6C84", fontSize: "13px", marginBottom: 1 }}
          >
            Concisely summarize the issue in one or two sentences.
          </Typography>
        </Box>

        <Box sx={{ marginTop: 4, width: 700 }}>
          <Typography
            sx={{ color: "#5E6C84", fontSize: "13px", marginBottom: 1 }}
          >
            Description
          </Typography>
          <ReactQuill
            className="texteditor"
            placeholder="Description"
            theme="snow"
            value={description}
            onChange={setDescription}
          />
        </Box>

        <Box sx={{ width: 700, marginTop: 10 }}>
          <Typography
            sx={{ color: "#5E6C84", fontSize: "13px", marginBottom: 1 }}
          >
            Reporter
          </Typography>

          <FormControl fullWidth>
            <Select
              labelId="reporter"
              id="reporter"
              value={reporter}
              onChange={handleReporter}
              required
              sx={{
                backgroundColor: "#F4F5F7",
                height: 30,
              }}
            >
              {members &&
                members?.map((name, index) => {
                  return (
                    <MenuItem value={name} key={index}>
                      {name}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ width: 700, marginTop: 1 }}>
          <Typography
            sx={{ color: "#5E6C84", fontSize: "13px", marginBottom: 1 }}
          >
            Assignee
          </Typography>
          <FormControl fullWidth>
            <Select
              labelId="assignee"
              id="assignee"
              value={assignee}
              onChange={handleAssignee}
              required
              sx={{
                backgroundColor: "#F4F5F7",
                height: 30,
              }}
            >
              {console.log("teammember", teamMembers)}
              {teamMembers?.map((name, index) => {
                return (
                  <MenuItem value={name} key={index}>
                    {name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <Button
            onClick={() => setAssignee(currentUser[0]?.name)}
            size="small"
          >
            Assign to me
          </Button>
        </Box>
        <Box sx={{ width: 700, marginTop: 1 }}>
          <Typography
            sx={{ color: "#5E6C84", fontSize: "13px", marginBottom: 1 }}
          >
            Priority
          </Typography>
          <FormControl fullWidth>
            <Select
              labelId="Priority"
              id="Priority"
              value={priority}
              onChange={handlePriority}
              required
              sx={{
                backgroundColor: "#F4F5F7",
                height: 30,
              }}
            >
              <MenuItem value="Highest">
                <Box sx={{ display: "flex" }}>
                  <KeyboardDoubleArrowUpIcon sx={{ color: "#880808" }} />
                  Highest
                </Box>
              </MenuItem>
              <MenuItem value="High">
                <Box sx={{ display: "flex" }}>
                  <KeyboardDoubleArrowUpIcon sx={{ color: "#D70040" }} />
                  High
                </Box>
              </MenuItem>
              <MenuItem value="Medium">
                <Box sx={{ display: "flex" }}>
                  <ExpandLessIcon sx={{ color: "#FFAC1C" }} />
                  Medium
                </Box>
              </MenuItem>
              <MenuItem value="Low">
                <Box sx={{ display: "flex" }}>
                  <KeyboardDoubleArrowDown sx={{ color: "#008000" }} />
                  Low
                </Box>
              </MenuItem>
              <MenuItem value="Lowest">
                <Box sx={{ display: "flex" }}>
                  <KeyboardDoubleArrowDown sx={{ color: "#7CFC00" }} />
                  Lowest
                </Box>
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ marginTop: 4, marginLeft: 60 }}>
          <Button
            sx={{ marginLeft: 1 }}
            variant="contained"
            onClick={handleCreate}
            sx={{ marginRight: 4 }}
          >
            Create
          </Button>
          <Button onClick={() => setShowIssue(false)}>Cancel</Button>
        </Box>
      </Box>
    </Box>
  );
}

export default NewIssue;
