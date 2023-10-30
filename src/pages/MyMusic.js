import { useState, useEffect } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import { Link, useParams } from "react-router-dom";
import LoginBox from "../components/LoginBox";
import UserBox from "../components/UserBox";
import MusicPlayer from "../components/MusicPlayer";

import musicList from "../data/musicList.json";

function MyMusic({ authenticated, user, logout }) {
  let { userId } = useParams();
  console.log("userId : ", userId);

  const playMusicHandler = (e) => {
    console.log(e);
  };

  return (
    <>
      <Container style={{ marginTop: "20px" }}>
        <h1>MY MUSIC</h1>
        <Row>
          <b>내가 만든 노래 {musicList.length}개</b>
          <div className="col-8">
            {musicList.map((music) => (
              <div style={{ width: "180px", height: "180px", padding: "2px", margin: "10px", float: "left" }}>
                <Card className="bg-dark text-white" onClick={playMusicHandler}>
                  <Card.Img src="/img/3rdPrototype.jpeg" alt="Card image" style={{ backgroundColor: "black", opacity: "0.5" }} />
                  <Card.ImgOverlay>
                    <Card.Title>{music.title}</Card.Title>
                    <Card.Text>{music.description}</Card.Text>
                    <MusicPlayer url={music.url} />
                  </Card.ImgOverlay>
                </Card>
              </div>
            ))}
          </div>
          <div className="col-2">{authenticated ? <UserBox user={user} logout={logout}></UserBox> : <LoginBox />}</div>
        </Row>
      </Container>
    </>
  );
}

export default MyMusic;
