import { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";
import { Box, Paper, Typography } from "@mui/material";

function Chart({ data }) {
  const [column, setColumn] = useState([]);
  const [columnCount, setColumnCount] = useState([]);
  const [xAxis, setXAxis] = useState([]);
  const [yAxis, setYAxis] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);

  useEffect(() => {
    const counting = [];
    // setPieChartData([]);

    data &&
      data?.forEach((item) => {
        Object.keys(item).map((col) => {
          setColumn(() => {
            const newData = column;

            if (!newData.includes(col)) {
              newData.push(col);
            }

            return newData;
          });
        });
      });

    column.forEach((i) => {
      let count = 0;
      data &&
        data.forEach((item) => {
          Object.keys(item).map((col) => {
            if (i === col) {
              count += item[col].length;
              console.log(count);
            }
          });
        });

      counting.push({ [i]: count });
    });

    setColumnCount(counting);

    const keysArray = [];
    const valuesArray = [];

    counting.forEach((obj) => {
      Object.keys(obj).forEach((key, index) => {
        keysArray.push(key);

        valuesArray.push(obj[key]);
      });
    });

    for (let i = 0; i < keysArray.length; i++) {
      const ob = {
        id: i,
        value: valuesArray[i],
        label: keysArray[i],
      };
      console.log("ob", ob);

      const newData = pieChartData;
      newData.push(ob);
      console.log(newData);
      setPieChartData(newData);
    }
    setXAxis(keysArray);
    setYAxis(valuesArray);
  }, [data]);
  console.log("piechar", pieChartData);

  return (
    <Box
      sx={{
        display: "flex",
        alignContent: "center",
        justifyContent: "space-around",
        marginLeft: 30,
      }}
    >
      <Box
        component={Paper}
        sx={{
          marginTop: 4,
          borderTop: "5px solid #1976d2",
          borderBottom: "2px solid #F0F8FF",
          borderRight: "2px solid #F0F8FF",
          borderLeft: "2px solid #F0F8FF",
        }}
      >
        <Typography sx={{ marginLeft: 4, fontWeight: "bold", marginTop: 2 }}>
          BarGraph
        </Typography>
        <BarChart
          xAxis={[{ scaleType: "band", data: xAxis }]}
          series={[{ data: yAxis }]}
          width={500}
          height={300}
        />
      </Box>

      <Box
        component={Paper}
        sx={{
          marginTop: 4,
          marginLeft: 10,
          borderTop: "5px solid #1976d2",
          borderBottom: "2px solid #F0F8FF",
          borderRight: "2px solid #F0F8FF",
          borderLeft: "2px solid #F0F8FF",
        }}
      >
        <Typography sx={{ marginLeft: 4, fontWeight: "bold", marginTop: 2 }}>
          Progress
        </Typography>
        <PieChart
          series={[
            {
              data: pieChartData,
            },
          ]}
          width={400}
          height={200}
        />
      </Box>
    </Box>
  );
}

export default Chart;
