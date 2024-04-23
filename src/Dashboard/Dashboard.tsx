import useGetIssue from "../utils/Hooks/useGetIssue";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";

import Grid from "@mui/material/Grid";

import Box from "@mui/material/Box";
import Assigned from "../Component/Assigned/Assigned";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ErrorIcon from "@mui/icons-material/Error";
import { pink } from "@mui/material/colors";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { KeyboardDoubleArrowDown } from "@mui/icons-material";
import BarChart from "../Component/BarChart/BarChart";

function Dashboard() {
  const response = useGetIssue();
  const [issue, setIssue] = useState();
  const [data, setData] = useState();
  const [project, setProject] = useState();
  useEffect(() => {
    setData(response);
    console.log("response", response);
    const assignedTOMe = response?.map((item) => item.data);
    console.log("assignedTOMe", assignedTOMe);
    setIssue(assignedTOMe);
  }, [response]);

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid
            item
            xs={6}
            sx={{
              marginTop: 5,
              marginLeft: 4,
              borderRadius: 2,
              borderTop: "5px solid #1976d2",
              borderBottom: "2px solid #F0F8FF",
              borderRight: "2px solid #F0F8FF",
              borderLeft: "2px solid #F0F8FF",
            }}
          >
            <Typography
              sx={{
                fontWeight: "bold",
              }}
            >
              Assigned to Me
            </Typography>
            <TableContainer>
              <Table
                sx={{
                  minWidth: 650,
                }}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: "#172B4D" }}>IssueType</TableCell>
                    <TableCell>Summary</TableCell>
                    <TableCell>Reporter</TableCell>
                    <TableCell>Priority</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {issue?.map((item) => {
                    return Object.keys(item).map((data) => {
                      return item[data].map((rows) => {
                        return (
                          <TableRow
                            key="1"
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell
                              component="th"
                              scope="row"
                              sx={{ color: "#0C66E4" }}
                            >
                              {rows.issueType == "Story" ? (
                                <BookmarkIcon color="success" />
                              ) : rows.issueType == "Task" ? (
                                <CheckBoxIcon color="primary" />
                              ) : (
                                <ErrorIcon sx={{ color: pink[500] }} />
                              )}
                            </TableCell>
                            <TableCell sx={{ color: "#0C66E4" }}>
                              {rows.issue}
                            </TableCell>
                            <TableCell sx={{ color: "#0C66E4" }}>
                              {rows.reporter}
                            </TableCell>
                            <TableCell sx={{ color: "#0C66E4" }}>
                              {rows.priority == "Highest" ? (
                                <KeyboardDoubleArrowUpIcon
                                  sx={{ color: "#880808" }}
                                />
                              ) : rows.priority == "High" ? (
                                <KeyboardDoubleArrowUpIcon
                                  sx={{ color: "#D70040" }}
                                />
                              ) : rows.priority == "Medium" ? (
                                <ExpandLessIcon sx={{ color: "#FFD700" }} />
                              ) : rows.priority == "Low" ? (
                                <KeyboardDoubleArrowDown
                                  sx={{ color: "#008000" }}
                                />
                              ) : (
                                <KeyboardDoubleArrowDown
                                  sx={{ color: "#7CFC00" }}
                                />
                              )}
                            </TableCell>
                          </TableRow>
                        );
                      });
                    });
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={6}>
            {<BarChart data={issue} />}
          </Grid>
          <Grid item xs={6}></Grid>
          <Grid item xs={6}></Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Dashboard;
