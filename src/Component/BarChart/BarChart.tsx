import { useEffect, useState } from "react";

function BarChart({ data }) {
  const [column, setColumn] = useState([]);
  //   const [counting, setCounting] = useState([]);

  useEffect(() => {
    console.log("data", data);
    const counting = [];
    data &&
      data.forEach((item) => {
        Object.keys(item).map((col) => {
          setColumn(() => {
            const newData = column;

            if (!newData.includes(col)) {
              newData.push(col);
              counting.push([col, 1]);
            } else {
              console.log(col);
              if (item[col].length > 0) {
                counting.forEach((item) => {
                  console.log("item", item[0] === col);
                  if (item[0] === col) {
                    item[1]++;
                  }
                });
              }
            }
            return newData;
          });
        });
      });

    console.log("counting", counting);
    console.log(column);
  }, []);

  console.log("columnnnn", column);
  return <div>BarChart</div>;
}

export default BarChart;
