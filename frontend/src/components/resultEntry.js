import React from "react";
import { Circle, XLg } from "react-bootstrap-icons";

const ResultEntry = ({ data }) => {
  return (
    <div
      className="d-flex justify-content-around align-items-center"
      style={{ columns: 3 }}
    >
      {data.correct ? <Circle size={30} /> : <XLg size={30} />}
      <p>sample2</p>
      <p>sample3</p>
    </div>
  );
};

export default ResultEntry;
