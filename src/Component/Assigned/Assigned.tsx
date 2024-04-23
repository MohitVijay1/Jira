import React from "react";

function Assigned({ data }) {
  return (
    <div>
      {data.length > 0 &&
        data.map((item) => {
          return <h5>{item.issue}</h5>;
        })}
    </div>
  );
}

export default Assigned;
