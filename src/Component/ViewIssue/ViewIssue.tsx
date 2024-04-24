import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import "./ViewIssue.css";
import CancelIcon from "@mui/icons-material/Cancel";
import { useState } from "react";
import ErrorIcon from "@mui/icons-material/Error";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { pink } from "@mui/material/colors";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { KeyboardDoubleArrowDown } from "@mui/icons-material";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

function ViewIssue({
  user,
  task,
  handleClose,
  handleModifyData,
  data,
  handleDelete,
}) {
  const [issueType, setIssueType] = useState(task.issueType);
  const [column, setColumn] = useState(task.column);
  const [issue, setIssue] = useState(task.issue);
  const [priority, setPriority] = useState(task.priority);
  const [description, setDescription] = useState(task.description);
  const [assignee, setAssignee] = useState(task.assignee);
  const [reporter, setReporter] = useState(task.reporter);

  const handleChange = (event) => {
    setIssueType(event.target.value);
  };
  const handleDeleteButton = () => {
    handleDelete(task);
    handleClose();
  };
  const handleColumn = (e) => {
    setColumn(e.target.value);
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

  const handleModify = () => {
    handleModifyData(
      issueType,
      column,
      issue,
      description,
      assignee,
      reporter,
      priority,
      task
    );
    handleClose();
  };

  return (
    <Box className="newissue-overlay" sx={{}}>
      <Box className="newissue-card" sx={{ marginTop: 30 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Box sx={{ marginLeft: 10 }}>
            <FormControl fullWidth>
              <Select
                value={issueType}
                onChange={handleChange}
                required
                sx={{
                  boxShadow: "none",
                  ".MuiOutlinedInput-notchedOutline": { border: 0 },
                  "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                    {
                      border: 0,
                    },
                  "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                    {
                      border: 0,
                    },
                }}
              >
                <MenuItem value={"bug"}>
                  <Box sx={{ display: "flex" }}>
                    <ErrorIcon sx={{ color: pink[500], marginRight: 1 }} />
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
          <Box
            sx={{
              display: "flex",

              marginBottom: 10,
            }}
          >
            <Button sx={{ height: 0, marginTop: 3 }}>
              <CloseIcon
                onClick={handleClose}
                sx={{
                  fontSize: 25,
                  color: "#42526E",
                  "&:hover": {
                    backgroundColor: "#EDEDED", // Change background color on hover
                  },
                }}
              />
            </Button>
            <Button sx={{ height: 0, marginTop: 3 }}>
              <DeleteOutlineIcon
                onClick={handleDeleteButton}
                sx={{
                  fontSize: 25,
                  color: "#42526E",
                  "&:hover": {
                    backgroundColor: "#EDEDED", // Change background color on hover
                  },
                }}
              />
            </Button>
          </Box>
        </Box>

        <Box sx={{ marginTop: 1 }}>
          <TextField
            placeholder="Enter your issue "
            value={issue}
            onChange={(e) => setIssue(e.target.value)}
            size="small"
            sx={{
              color: "#172B4D",
              width: "675px",
              marginLeft: 4,
              "&:hover": {
                backgroundColor: "#EDEDED", // Change background color on hover
              },
            }}
            inputProps={{ style: { fontSize: 30 } }}
          />
        </Box>
        <Box sx={{ marginTop: 4, width: 700 }}>
          <Typography
            sx={{
              color: "#5E6C84",
              fontSize: "13px",
              marginBottom: 1,
              marginLeft: 5,
            }}
          >
            Description
          </Typography>
          <ReactQuill
            className="texteditor"
            placeholder="Description"
            theme="snow"
            value={description}
            onChange={setDescription}
            style={{
              marginLeft: 30,
            }}
          />
        </Box>
        <Box sx={{ width: 675, marginTop: 10, marginLeft: 4 }}>
          <FormControl fullWidth>
            <InputLabel id="Priority">Priority</InputLabel>

            <Select
              labelId="Priority"
              id="Priority"
              value={priority}
              label="Priority"
              onChange={handlePriority}
              required
              sx={{
                "&:hover": {
                  backgroundColor: "#EDEDED", // Change background color on hover
                },
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
        <Box sx={{ width: 675, marginTop: 5, marginLeft: 4 }}>
          <FormControl fullWidth>
            <InputLabel id="reporter">Reporter</InputLabel>
            <Select
              labelId="reporter"
              id="reporter"
              value={reporter}
              label="reporter"
              onChange={handleReporter}
              required
              sx={{
                "&:hover": {
                  backgroundColor: "#EDEDED", // Change background color on hover
                },
              }}
            >
              {user?.map((key, index) => {
                return (
                  <MenuItem value={key.name} key={index}>
                    {key.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ width: 675, marginTop: 5, marginLeft: 4 }}>
          <FormControl fullWidth>
            <InputLabel id="assignee">Assignee</InputLabel>
            <Select
              labelId="assignee"
              id="assignee"
              value={assignee}
              label="assignee"
              onChange={handleAssignee}
              required
              sx={{
                "&:hover": {
                  backgroundColor: "#EDEDED", // Change background color on hover
                },
              }}
            >
              {user.map((key, index) => {
                return (
                  <MenuItem value={key.name} key={index}>
                    {key.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ marginLeft: 70, marginTop: 3 }}>
          <Button variant="contained" onClick={handleModify}>
            Modify
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default ViewIssue;
