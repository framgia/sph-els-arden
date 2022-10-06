import React from "react";
import Container from "react-bootstrap/Container";
import "../asset/style.css";

const WordEntry = ({ data }) => {
  return (
    <Container
      className="pt-2 bg-light rounded d-flex justify-content-around"
      style={{ columns: 2 }}
    >
      <p>{data.word}</p>
      <p>{data.answer}</p>
    </Container>
  );
};

export default WordEntry;
