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
        <h1>Main</h1>
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
