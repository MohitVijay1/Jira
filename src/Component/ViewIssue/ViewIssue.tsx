import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import "./ViewIssue.css";
import CancelIcon from "@mui/icons-material/Cancel";
import { useState } from "react";

function ViewIssue({ user, task, handleClose, handleModifyData, data }) {
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
    <Box
      className="card-issue"
      sx={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          marginTop: 3,
        }}
      >
        <Box sx={{ width: 225 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Issue Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={issueType}
              label="issueType"
              onChange={handleChange}
              required
              autoFocus
            ></Select>
          </FormControl>
        </Box>
        <Box sx={{ marginTop: 4 }}>
          <TextField
            placeholder="Enter your issue "
            label="Issue "
            value={issue}
            onChange={(e) => setIssue(e.target.value)}
          />
        </Box>
        <Box sx={{ width: 225, marginTop: 1 }}>
          <FormControl fullWidth>
            <InputLabel id="Priority">Priority</InputLabel>

            <Select
              labelId="Priority"
              id="Priority"
              value={priority}
              label="Priority"
              onChange={handlePriority}
              required
            >
              <MenuItem value="Highest">Highest</MenuItem>
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
              <MenuItem value="Lowest">Lowest</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ width: 225, marginTop: 1 }}>
          <FormControl fullWidth>
            <InputLabel id="assignee">Assignee</InputLabel>
            <Select
              labelId="assignee"
              id="assignee"
              value={assignee}
              label="assignee"
              onChange={handleAssignee}
              required
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
        <Box sx={{ width: 225, marginTop: 1 }}>
          <FormControl fullWidth>
            <InputLabel id="reporter">Reporter</InputLabel>
            <Select
              labelId="reporter"
              id="reporter"
              value={reporter}
              label="reporter"
              onChange={handleReporter}
              required
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
        <Box sx={{ marginTop: 4 }}>
          <TextField
            placeholder="Description"
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Box>
        <Button variant="outlined" onClick={handleModify}>
          Modify
        </Button>
      </Box>

      <Button sx={{ height: 0, marginTop: 3 }}>
        <CancelIcon onClick={handleClose} sx={{ fontSize: 30 }} />
      </Button>
    </Box>
  );
}

export default ViewIssue;
