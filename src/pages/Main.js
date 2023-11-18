import React from "react";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import LoginBox from "../components/LoginBox";
import UserBox from "../components/UserBox";
import Card from "react-bootstrap/Card";
import MusicPlayer from "../components/MusicPlayer";

import { useState, useEffect } from "react";

import { getAllmusic } from "../apis/song";

function Main({ authenticated, user, logout }) {
  const [musicList, setMusicList] = useState([]);

  const playMusicHandler = (e) => {
    console.log(e);
  };

  useEffect(() => {
    getAllmusic().then((result) => {
      console.log(result);
      if (result.status === 200) {
        const data = result.data.data;
        console.log(data);
        setMusicList([...data]);
      }
    });
  }, []);

  return (
    <>
      <Container>
        <h1>Main</h1>
        <Row>
          <div className="col-8">
            {musicList.map((music) => (
              <div style={{ width: "180px", height: "180px", padding: "2px", margin: "10px", float: "left" }} key={music.musicNo}>
                <Card className="bg-dark text-white" onClick={playMusicHandler}>
                  <Card.Img src={music.albumImgUrl} alt="Card image" style={{ backgroundColor: "black", opacity: "0.5" }} />
                  <Card.ImgOverlay>
                    <Card.Title>{music.title}</Card.Title>
                    <Card.Text>{music.description}</Card.Text>
                    <MusicPlayer url={music.musicUrl} />
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

export default Main;
