import { addDoc, collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import "./AddProject.css";
import MultipleSelectChip from "./MultipleSelectChip";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Typography } from "@mui/material";
import useGetUser from "../../utils/Hooks/useGetUser";
import { Box } from "@mui/system";

function AddProject() {
  const [user, setUser] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [selectedName, setSelectedName] = useState([]);
  const navigate = useNavigate();
  const userData = useGetUser();
  useEffect(() => {
    setUser(userData);
  }, [userData]);
  const handleSelectChange = (e) => {
    setSelectedName(e);
  };
  const handleCreateProject = async () => {
    const res = await addDoc(collection(db, "projects"), {
      name: projectName,
      description: projectDescription,
      teamMembers: selectedName,
      data: { ToDo: [], InProgress: [], Done: [] },
    });

    navigate(`/project/${res.id}`);
  };

  return (
    <div className="overlay">
      <Box
        className="card"
        sx={{
          borderRadius: 3,
        }}
      >
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Add New Project
        </Typography>
        <div>
          <TextField
            size="small"
            margin="normal"
            required
            fullWidth
            type="text"
            label="Project Name"
            onChange={(e) => setProjectName(e.target.value)}
            sx={{ width: "300px" }}
            autoFocus
          />
        </div>
        <div>
          <TextField
            size="small"
            margin="normal"
            required
            fullWidth
            type="text"
            label="Project Description"
            onChange={(e) => setProjectDescription(e.target.value)}
            sx={{ width: "300px" }}
          />
        </div>

        <div>
          <MultipleSelectChip
            user={user}
            handleSelectChange={handleSelectChange}
          />
        </div>
        <Box sx={{ display: "flex", marginTop: 5 }}>
          <Button variant="contained" onClick={handleCreateProject}>
            Create Project
          </Button>
          <Button
            variant="oulined"
            onClick={() => {
              navigate("/dashboard");
            }}
            sx={{ color: "blue" }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </div>
  );
}

export default AddProject;
