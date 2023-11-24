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
import { getMymusic } from "../apis/song";

function SingsongRoom({ authenticated, user, logout }) {
  let { roomId } = useParams();
  const navigate = useNavigate();
  const [roomOwner, setRoomOwner] = useState({ userNo: null, nickName: null, profileImg: null });

  const [models, setModels] = useState(null);
  const [musicList, setMusicList] = useState(null);
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    getRoomInfo(roomId).then((result) => {
      console.log(result);
      if (result.status === 200) {
        const data = result.data.data;
        if (data.furniture && data.furniture.length > 0) {
          setModels([...data.furniture]);
        }
        setAvatar(avatarJSON[user.gender]);
        setRoomOwner({ userNo: data.userNo, nickName: data.userName, profileImg: data.userProfileImg });
        getMymusic(data.userNo).then((result) => {
          if (result.status === 200) {
            const data = result.data.data;
            setMusicList([...data]);
          }
        });
      }
    });
  }, []);

  return (
    <>
      <Container style={{ marginTop: "20px" }}>
        <h1>
          <img src="/img/room.png" alt="icon" style={{ width: "40px", height: "40px" }} /> <b>SINGSONGROOM</b>
        </h1>
        <Row>{musicList === null ? null : <SceneComponent antialias id="my-canvas" user={user} isEdit={false} models={models} avatar={avatar} musicList={musicList} />}</Row>
        <Row style={{ marginTop: "20px" }}>
          <div className="col-8">
            <CommentList user={user} roomId={roomId} />{" "}
          </div>
          <div className="vr" style={{ padding: "0px" }} />
          <div className="col-3" style={{ marginLeft: "20px" }}>
            {roomOwner === null ? null : <RoomProfile user={roomOwner} />}
            <div className="d-grid" style={{ marginLeft: "20px", marginTop: "10px" }}>
              {user === null && roomOwner === null ? null : user.userNo === roomOwner.userNo ? (
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
