import { addDoc, collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import "./AddProject.css";
import MultipleSelectChip from "./MultipleSelectChip";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Typography } from "@mui/material";

function AddProject() {
  const [user, setUser] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [selectedName, setSelectedName] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const data = await getDocs(collection(db, "users"));
      const newData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

      setUser(newData);
    };
    fetchData();
  }, []);
  const handleSelectChange = (e) => {
    setSelectedName(e);
  };
  const handleCreateProject = async () => {
    await addDoc(collection(db, "projects"), {
      name: projectName,
      description: projectDescription,
      teamMembers: selectedName,
    });
  };

  return (
    <div className="overlay">
      <div className="card">
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
          />
        </div>

        <div>
          <MultipleSelectChip
            user={user}
            handleSelectChange={handleSelectChange}
          />
        </div>
        <div>
          <Button
            sx={{
              marginTop: 1,
            }}
            variant="contained"
            onClick={handleCreateProject}
          >
            Create Project
          </Button>
        </div>
        <Button
          sx={{
            marginTop: 1,
          }}
          variant="contained"
          onClick={() => {
            navigate("/homepage");
          }}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}

export default AddProject;
