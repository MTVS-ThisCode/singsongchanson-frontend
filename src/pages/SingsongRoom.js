import SceneComponent from "../components/ScenceComponent";
import Row from "react-bootstrap/Row";
import LoginBox from "../components/LoginBox";
import Container from "react-bootstrap/Container";
import RoomProfile from "../components/RoomProfile";

import { useState, useEffect } from "react";
import commentJSON from "../data/comment.json";
import CommentList from "../components/CommentList";
import { useNavigate } from "react-router-dom";

function SingsongRoom({ authenticated, user, logout }) {
  const navigate = useNavigate();
  const [comment, setComment] = useState([]);

  useEffect(() => {
    if (user === null) {
      console.log("SingsongRoom : ", user);
    }
  }, []);

  useEffect(() => {
    setComment([...commentJSON]);
  }, []);

  return (
    <>
      <Container style={{ marginTop: "20px" }}>
        <h1>
          <img src="/img/room.png" alt="icon" style={{ width: "40px", height: "40px" }} /> <b>SINGSONGROOM</b>
        </h1>
        <Row>
          <SceneComponent antialias id="my-canvas" user={user} />
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <div className="col-8">{/* <CommentList user={user} commentList={comment} /> */}</div>
          <div className="vr" style={{ padding: "0px" }} />
          <div className="col-3" style={{ marginLeft: "20px" }}>
            {/* {authenticated ? <RoomProfile user={user} /> : <LoginBox />} */}
          </div>
        </Row>
      </Container>
    </>
  );
}

export default SingsongRoom;
