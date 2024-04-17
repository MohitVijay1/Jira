import { Box, Button, Modal, Typography, capitalize } from "@mui/material";
import { useEffect, useState } from "react";
import ViewIssue from "../ViewIssue/ViewIssue";
import Card from "@mui/material/Card";
import { pink } from "@mui/material/colors";
import CardContent from "@mui/material/CardContent";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ErrorIcon from "@mui/icons-material/Error";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const DraggableColumns = ({ user, data, setData, handleModifyData }) => {
  const [open, setOpen] = useState(false);
  const [columns, setColumns] = useState();
  const [viewIssue, setViewIssue] = useState(false);
  const [updatedTask, setUpdatedTask] = useState();

  useEffect(() => {
    setColumns(data);
  }, [data]);
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
      {columns &&
        Object.entries(columns).map(([columnName, tasks]) => (
          <Box
            sx={{
              width: 170,
              maxHeight: "auto",
              height: "250px",
              maxWidth: 400,
              minHeight: "100%",
              backgroundColor: "#F5F5F5",
            }}
            key={columnName}
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, columnName)}
            style={{ margin: 8, padding: 8 }}
          >
            <Typography sx={{ textTransform: "capitalize" }}>
              {columnName}
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
                      />
                    </Box>
                  </Modal>

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
                          sx={{ fontSize: 14, color: "#172B48" }}
                          color="text.secondary"
                          gutterBottom
                        >
                          {task.issue}
                        </Typography>

                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                          {task.issueType == "Story" ? (
                            <BookmarkIcon color="success" />
                          ) : task.issueType == "Task" ? (
                            <CheckBoxIcon color="primary" />
                          ) : (
                            <ErrorIcon sx={{ color: pink[500] }} />
                          )}
                        </Typography>
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
