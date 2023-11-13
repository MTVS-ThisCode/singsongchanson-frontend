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
import { getRoomList } from "../apis/room";

function RoomList({ authenticated, user, logout }) {
  const [roomList, setRoomList] = useState([]);

  useEffect(() => {
    getRoomList().then((result) => {
      if (result.status === 200) {
        const data = result.data.data;
        console.log(data);
        setRoomList([...data]);
      }
    });
  }, []);

  return (
    <>
      <Container style={{ marginTop: "20px" }}>
        <h1>SINGSONGROOM List</h1>
        <Row>
          <div className="col-8">
            {roomList.map((room) => (
              <Card style={{ width: "18rem" }} key={roomList.indexOf(room)}>
                <Card.Img variant="top" src={room.thumbnail} />
                <Card.Body>
                  <Image className={commentStyle.profileImage} src={room.userProfileImg} alt="profileImage"></Image>
                  <Card.Title>{room.userName}님의 싱송룸</Card.Title>
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
