import {
  addDoc,
  collection,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
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
  const [projectNameErr, setProjectNameErr] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectDescriptionErr, setProjectDescriptionErr] = useState("");
  const [selectedName, setSelectedName] = useState([]);

  const [selectedNameErr, setSelectedNameErr] = useState("");

  const navigate = useNavigate();
  const userData = useGetUser();
  useEffect(() => {
    setUser(userData);
  }, [userData]);
  const handleSelectChange = (e) => {
    setSelectedName(e);
    setSelectedNameErr(" ");
  };
  const handleCreateProject = async () => {
    const projectNameRegex = /^[a-zA-Z0-9 ]+$/;
    if (!projectNameRegex.test(projectName)) {
      setProjectNameErr("Please enter a valid project name");
      return;
    }
    if (projectDescription === "") {
      setProjectDescriptionErr("Project Description can't be empty");
      return;
    }
    if (selectedName.length == 0) {
      setSelectedNameErr("Project should contain atleast one members");
      return;
    }
    console.log(selectedName);
    const res = await addDoc(collection(db, "projects"), {
      name: projectName,
      description: projectDescription,
      teamMembers: selectedName,
      data: { ToDo: [], InProgress: [], Done: [] },
      created: serverTimestamp(),
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
            error={projectNameErr}
            helperText={projectNameErr}
            label="Project Name"
            onChange={(e) => {
              setProjectNameErr("");
              setProjectName(e.target.value);
            }}
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
            error={projectDescriptionErr}
            helperText={projectDescriptionErr}
            label="Project Description"
            onChange={(e) => {
              setProjectDescriptionErr("");
              setProjectDescription(e.target.value);
            }}
            sx={{ width: "300px" }}
          />
        </div>

        <div>
          <MultipleSelectChip
            user={user}
            handleSelectChange={handleSelectChange}
          />
          <Typography
            sx={{
              color: "#D32F2F",
              fontSize: "12px",
              marginLeft: 1,
            }}
          >
            {selectedNameErr}
          </Typography>
        </div>
        <Box sx={{ display: "flex", marginTop: 6 }}>
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
