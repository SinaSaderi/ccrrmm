import React from "react";
import { PropTypes } from "prop-types";
import styled from "styled-components";

function ErrorComponent({ message }) {
  return (
    <Container>
      <h2>no data</h2>
      <h1>{message}</h1>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  h1 {
    padding: 1rem;
    text-align: center;
    font-weight: 500;
  }

  img {
    width: 30%;
    min-width: 250px;
  }
`;

export default ErrorComponent;

ErrorComponent.defaultProps = {
  message: "Error",
};

ErrorComponent.propTypes = {
  message: PropTypes.string,
};
