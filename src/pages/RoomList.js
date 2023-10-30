import { useState, useEffect } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import LoginBox from "../components/LoginBox";
import UserBox from "../components/UserBox";

import roomJSON from "../data/room.json";
import commentStyle from "../components/Comment.module.css";

function RoomList({ authenticated, user, logout }) {
  const [roomList, setRoomList] = useState([]);

  useEffect(() => {
    setRoomList([...roomJSON]);
  }, []);

  return (
    <>
      <Container style={{ marginTop: "20px" }}>
        <h1>SINGSONGROOM List</h1>
        <Row>
          <div className="col-8">
            {roomList.map((room) => (
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src={room.thumbnail} />
                <Card.Body>
                  <Image className={commentStyle.profileImage} src={room.user.profileImg} alt="profileImage"></Image>
                  <Card.Title>{room.user.nickname}님의 싱송룸</Card.Title>
                  <Link to={`/room/${room.roomId}`} style={{ textDecoration: "none", color: "black" }}>
                    <Button variant="dark" size="lg">
                      싱송룸 방문
                    </Button>
                  </Link>
                </Card.Body>
              </Card>
            ))}
          </div>
          <div className="col-2">{authenticated ? <UserBox user={user} logout={logout}></UserBox> : <LoginBox />}</div>
        </Row>
      </Container>
    </>
  );
}

export default RoomList;
