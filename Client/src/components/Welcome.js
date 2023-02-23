import React from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";
export default function Welcome() {
  return (
    <Container>
      <img src={Robot} alt="" />
      <h1>
        Welcome, <span>!</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  gap: 10px;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;
