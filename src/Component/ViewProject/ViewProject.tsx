import { useEffect, useState } from "react";
import useGetProjects from "../../utils/Hooks/useGetProjects";
import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

function ViewProject() {
  const [projects, setProjects] = useState();
  const [search, setSearch] = useState("");
  const project = useGetProjects();
  console.log(search);
  useEffect(() => {
    setProjects(project);
    console.log(project);
  }, [project]);
  useEffect(() => {
    const data =
      projects &&
      project.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );

    setProjects(data);
  }, [search]);

  return (
    <Box sx={{ marginLeft: 9 }}>
      <Box sx={{ marginTop: 9, width: "auto", marginBottom: -5 }}>
        <Typography
          sx={{
            color: "#172B4D",
            marginLeft: 5,
            fontSize: "24px",
            fontWeight: "bold",
          }}
        >
          Projects
        </Typography>
      </Box>
      <Box sx={{ marginLeft: 5, marginTop: 10 }}>
        <TextField
          size="small"
          sx={{ marginBottom: 3 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          placeholder="Search Projects"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        ></TextField>
        <TableContainer
          component={Paper}
          sx={{
            width: 650,
            borderTop: "2px solid #F0F8FF",
            borderBottom: "2px solid #F0F8FF",
            borderRight: "2px solid #F0F8FF",
            borderLeft: "5px solid #1976d2",
            borderRadius: 2,
          }}
        >
          <Table sx={{ width: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", color: "#172B4D" }}>
                  Name
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#172B4D" }}>
                  Type
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projects &&
                projects?.map((project) => (
                  <TableRow>
                    <Link to={`/project/${project.id}`}>
                      {" "}
                      <TableCell sx={{ color: "#0C66E4" }}>
                        {project.name}
                      </TableCell>{" "}
                    </Link>
                    <TableCell>Project management</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default ViewProject;
