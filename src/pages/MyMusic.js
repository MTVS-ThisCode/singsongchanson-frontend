import { useState, useEffect } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import { Link, useParams } from "react-router-dom";
import LoginBox from "../components/LoginBox";
import UserBox from "../components/UserBox";
import MusicPlayer from "../components/MusicPlayer";
import MusicList from "../components/MusicList";
//import musicList from "../data/musicList.json";

import { getMymusic } from "../apis/song";

function MyMusic({ authenticated, user, logout }) {
  let { userId } = useParams();
  const [musicList, setMusicList] = useState([]);
  console.log("userId : ", userId);

  useEffect(() => {
    getMymusic(userId).then((result) => {
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
      <Container style={{ marginTop: "20px" }}>
        <h1>
          <img src="/img/new-music.png" alt="icon" style={{ width: "40px", height: "40px" }} />
          <b style={{ marginLeft: "10px" }}>MY MUSIC</b>
        </h1>
        <Row>
          <b>내가 만든 노래 {musicList.length}개</b>
          <div className="col-8">
            <MusicList musicList={musicList} setMusicList={setMusicList} />
          </div>
          <div className="col-2">{authenticated ? <UserBox user={user} logout={logout}></UserBox> : <LoginBox />}</div>
        </Row>
      </Container>
    </>
  );
}

export default MyMusic;
