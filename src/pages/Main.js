import React from "react";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import LoginBox from "../components/LoginBox";
import UserBox from "../components/UserBox";

import MusicList from "../components/MusicList";
import { useState, useEffect } from "react";

import { getAllmusic } from "../apis/song";

function Main({ authenticated, user, logout }) {
  const [musicList, setMusicList] = useState([]);

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
        <h1>
          <img src="/img/new-music.png" alt="icon" style={{ width: "40px", height: "40px" }} />
          <b style={{ marginLeft: "10px" }}>NEW MUSIC</b>
        </h1>
        <Row>
          <div className="col-8">
            <MusicList musicList={musicList} setMusicList={setMusicList} />
          </div>
          <div className="col-2">{authenticated ? <UserBox user={user} logout={logout}></UserBox> : <LoginBox />}</div>
        </Row>
      </Container>
    </>
  );
}

export default Main;
