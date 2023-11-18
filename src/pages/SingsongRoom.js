import SceneComponent from "../components/ScenceComponent";
import Row from "react-bootstrap/Row";
import LoginBox from "../components/LoginBox";
import Container from "react-bootstrap/Container";
import RoomProfile from "../components/RoomProfile";

import { useState, useEffect, useCallback } from "react";
import commentJSON from "../data/comment.json";
import CommentList from "../components/CommentList";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import avatarJSON from "../data/avatar.json";
import modelJSON from "../data/furniture.json";

import { getRoomInfo } from "../apis/room";

function SingsongRoom({ authenticated, user, logout }) {
  let { roomId } = useParams();
  const navigate = useNavigate();
  const [comment, setComment] = useState([]);
  const [roomOwner, setRoomOwner] = useState(null);

  const [models, setModels] = useState([]);
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    getRoomInfo(roomId).then((result) => {
      if (result.status === 200) {
        const data = result.data.data;
        console.log("roomInfo : ", data);
        if (data.furniture && data.furniture.length > 0) {
          setModels([...data.furniture]);
        }
      }
    });
    let userGender;
    if (user !== null) {
      setRoomOwner(user.userNo);
      userGender = user.gender;
    } else {
      userGender = "female";
    }
    setAvatar(avatarJSON[userGender]);
    setComment([...commentJSON]);
  }, []);

  return (
    <>
      <Container style={{ marginTop: "20px" }}>
        <h1>
          <img src="/img/room.png" alt="icon" style={{ width: "40px", height: "40px" }} /> <b>SINGSONGROOM</b>
        </h1>
        <Row>
          <SceneComponent antialias id="my-canvas" user={user} isEdit={false} models={models} avatar={avatar} />
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <div className="col-8">
            <CommentList user={user} commentList={comment} />{" "}
          </div>
          <div className="vr" style={{ padding: "0px" }} />
          <div className="col-3" style={{ marginLeft: "20px" }}>
            {authenticated ? <RoomProfile user={user} /> : <LoginBox />}
            <div className="d-grid" style={{ marginLeft: "20px", marginTop: "10px" }}>
              {user === null ? null : user.userNo === roomOwner ? (
                <>
                  <Button variant="outline-secondary" size="lg">
                    <Link to={`/room/${roomId}/edit`} style={{ textDecoration: "none", color: "black" }}>
                      내 방 꾸미기
                    </Link>
                  </Button>
                  {/* <Button variant="outline-secondary" size="lg">
                    <Link to={`/avatar`} style={{ textDecoration: "none", color: "black" }}>
                      아바타 수정하기
                    </Link>
                  </Button> */}
                </>
              ) : null}
            </div>
          </div>
        </Row>
      </Container>
    </>
  );
}

export default SingsongRoom;
