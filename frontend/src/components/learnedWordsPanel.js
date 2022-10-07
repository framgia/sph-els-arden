import React from "react";
import Container from "react-bootstrap/Container";
import WordEntry from "./word";

const WordsPanel = ({ data }) => {
  return (
    <Container className="pt-4 bg-light">
      <Container
        style={{
          columns: 2,
          columnRule: "4px outset gray",
          fontWeight: "bold",
        }}
      >
        <div className="d-flex justify-content-around" style={{ columns: 2 }}>
          <p>WORDS</p>
          <p>ANSWERS</p>
        </div>
        <hr />
        <div className="d-flex justify-content-around" style={{ columns: 2 }}>
          <p>WORDS</p>
          <p>ANSWERS</p>
        </div>
        <hr />
      </Container>
      <Container style={{ columns: 2, columnRule: "4px outset gray" }}>
        {Object.keys(data).map((key) => (
          <React.Fragment key={key}>
            <WordEntry data={data[key]} />
          </React.Fragment>
        ))}
      </Container>
    </Container>
  );
};

export default WordsPanel;
