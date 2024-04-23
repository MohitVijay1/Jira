import {
  Avatar,
  Box,
  Button,
  Modal,
  Tooltip,
  Typography,
  capitalize,
} from "@mui/material";
import { useEffect, useState } from "react";
import ViewIssue from "../ViewIssue/ViewIssue";
import Card from "@mui/material/Card";
import { deepPurple, pink } from "@mui/material/colors";
import CardContent from "@mui/material/CardContent";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ErrorIcon from "@mui/icons-material/Error";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { KeyboardDoubleArrowDown } from "@mui/icons-material";
const style = {};
const DraggableColumns = ({
  user,
  data,
  search,
  setData,
  handleModifyData,
  handleDelete,
}) => {
  const [open, setOpen] = useState(false);
  const [columns, setColumns] = useState();
  const [viewIssue, setViewIssue] = useState(false);
  const [updatedTask, setUpdatedTask] = useState();

  useEffect(() => {
    const filteredData = Object.keys(data).reduce((acc, key) => {
      acc[key] = data[key].filter((item) =>
        item.issue.toLowerCase().includes(search.toLowerCase())
      );
      return acc;
    }, {});
    setColumns(filteredData);
    console.log("search", search);
  }, [data, search]);

  const onDragStart = (e, columnName, taskId) => {
    e.dataTransfer.setData("columnName", columnName);
    e.dataTransfer.setData("taskId", taskId);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (e, targetColumnName) => {
    const sourceColumnName = e.dataTransfer.getData("columnName");
    const sourceTaskId = e.dataTransfer.getData("taskId");
    const targetTaskId = e.target.getAttribute("data-taskid");
    const newColumns = { ...columns };

    if (sourceColumnName === targetColumnName) {
      const tasks = [...newColumns[sourceColumnName]];
      const [removedTask] = tasks.splice(sourceTaskId, 1);
      tasks.splice(targetTaskId, 0, removedTask);
      newColumns[sourceColumnName] = tasks;
    } else {
      const sourceTasks = [...newColumns[sourceColumnName]];
      const targetTasks = [...newColumns[targetColumnName]];
      const [removedTask] = sourceTasks.splice(sourceTaskId, 1);
      targetTasks.splice(targetTaskId, 0, removedTask);
      newColumns[sourceColumnName] = sourceTasks;
      newColumns[targetColumnName] = targetTasks;
    }

    setColumns(newColumns);
    console.log("newcoloums", newColumns);

    setData(newColumns);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div style={{ display: "flex" }}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ViewIssue
            data={data}
            task={updatedTask}
            user={user}
            key={updatedTask}
            handleClose={handleClose}
            handleModifyData={handleModifyData}
            handleDelete={handleDelete}
          />
        </Box>
      </Modal>
      {columns &&
        Object.entries(columns).map(([columnName, tasks]) => (
          <Box
            sx={{
              width: 170,
              maxHeight: "auto",
              height: "auto",
              maxWidth: 400,
              backgroundColor: "#F5F5F5",
            }}
            key={columnName}
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, columnName)}
            style={{ margin: 8, padding: 8 }}
          >
            <Typography sx={{ textTransform: "capitalize" }}>
              {columnName} {tasks.length}
            </Typography>
            {tasks.map((task, index) => (
              <Box
                key={index}
                draggable
                onDragStart={(e) => onDragStart(e, columnName, index)}
                data-taskid={index}
                sx={{
                  margin: "4px",
                  cursor: "pointer",
                  display: "flex",
                }}
              >
                <Box
                  sx={{ padding: 0.5, margin: 2 }}
                  onClick={() => {
                    setViewIssue(true);
                  }}
                >
                  <Box
                    onClick={() => {
                      handleOpen();

                      task.column = columnName;
                      setUpdatedTask(task);
                    }}
                    sx={{
                      backgroundColor: "white",
                    }}
                  >
                    <Card sx={{ minWidth: 100 }}>
                      {console.log(task)}
                      <CardContent>
                        <Typography
                          variant="p"
                          sx={{
                            fontSize: "14px",
                            color: "#172B48",
                            fontWeight: "bold",
                          }}
                          color="text.secondary"
                          gutterBottom
                        >
                          {task.issue}
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-around",
                            marginTop: 2,
                          }}
                        >
                          <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            {task.issueType == "Story" ? (
                              <BookmarkIcon color="success" />
                            ) : task.issueType == "Task" ? (
                              <CheckBoxIcon color="primary" />
                            ) : (
                              <ErrorIcon sx={{ color: pink[500] }} />
                            )}
                          </Typography>
                          <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            {task.priority == "Highest" ? (
                              <KeyboardDoubleArrowUpIcon
                                sx={{ color: "#880808" }}
                              />
                            ) : task.priority == "High" ? (
                              <KeyboardDoubleArrowUpIcon
                                sx={{ color: "#D70040" }}
                              />
                            ) : task.priority == "Medium" ? (
                              <ExpandLessIcon sx={{ color: "#FFD700" }} />
                            ) : task.priority == "Low" ? (
                              <KeyboardDoubleArrowDown
                                sx={{ color: "#008000" }}
                              />
                            ) : (
                              <KeyboardDoubleArrowDown
                                sx={{ color: "#7CFC00" }}
                              />
                            )}
                          </Typography>
                          <Tooltip title={`Assignee:${task.assignee}`} arrow>
                            <Avatar
                              sx={{
                                bgcolor: "#1976D2",
                                width: 24,
                                height: 24,
                                color: "black",
                              }}
                            >
                              {task.assignee[0].toUpperCase()}
                            </Avatar>
                          </Tooltip>
                        </Box>
                      </CardContent>
                    </Card>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        ))}
    </div>
  );
};

export default DraggableColumns;
