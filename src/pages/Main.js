import React from "react";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import LoginBox from "../components/LoginBox";
import UserBox from "../components/UserBox";

function Main({ authenticated, user, logout }) {
  return (
    <>
      <Container>
        <h1>Main</h1>
        <Row>
          <div className="col-8"></div>
          <div className="col-2">{authenticated ? <UserBox user={user} logout={logout}></UserBox> : <LoginBox />}</div>
        </Row>
      </Container>
    </>
  );
}

export default Main;
