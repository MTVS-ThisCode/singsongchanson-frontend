import { useState, useEffect } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import LoginBox from "../components/LoginBox";
import UserBox from "../components/UserBox";

function MusicList({ authenticated, user, logout }) {
  return (
    <>
      <Container style={{ marginTop: "20px" }}>
        <h1>MUSIC List</h1>
        <Row>
          <div className="col-8"></div>
          <div className="col-2">{authenticated ? <UserBox user={user} logout={logout}></UserBox> : <LoginBox />}</div>
        </Row>
      </Container>
    </>
  );
}

export default MusicList;
