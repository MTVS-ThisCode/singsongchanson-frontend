import SceneComponent from "../components/ScenceComponent";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import { useState, useEffect, useCallback, useRef } from "react";

import { useParams } from "react-router-dom";
import avatarJSON from "../data/avatar.json";
import allFurnitureJSON from "../data/allModels.json";
import FurnitureList from "../components/FurnitureList";

import { getRoomInfo } from "../apis/room";

function SingsongRoomEdit({ authenticated, user, logout }) {
  let { roomId } = useParams();

  const [models, setModels] = useState(null);
  const [avatar, setAvatar] = useState(null);

  const [allModels, setAllModels] = useState([]);
  const [allAvatars, setAllAvatars] = useState([]);

  const [updatedRoom, setUpdatedRoom] = useState(null);

  useEffect(() => {
    const initroom = [];
    localStorage.setItem("room", JSON.stringify(initroom));
    getRoomInfo(roomId)
      .then((result) => {
        if (result.status === 200) {
          const data = result.data.data;
          console.log("roomInfo : ", data);
          if (data.furniture && data.furniture.length > 0) {
            setModels([...data.furniture]);
            localStorage.setItem("room", JSON.stringify([...data.furniture]));
          }
        } else {
          localStorage.setItem("room", JSON.stringify(initroom));
        }
      })
      .catch((e) => {
        localStorage.setItem("room", JSON.stringify(initroom));
      });
    let userGender;
    if (user !== null) {
      userGender = user.gender;
    } else {
      userGender = "female";
    }
    setAllModels([...allFurnitureJSON]);
    setAvatar(avatarJSON[userGender]);
  }, []);

  return (
    <>
      <Container style={{ marginTop: "20px" }}>
        <h1>
          <img src="/img/room.png" alt="icon" style={{ width: "40px", height: "40px" }} /> <b>SINGSONGROOM Edit</b>
        </h1>
        <Row>
          <div className="col-8">
            <SceneComponent antialias id="my-canvas" user={user} isEdit={true} models={JSON.parse(localStorage.getItem("room"))} avatar={avatar} roomId={roomId} />
          </div>
          <div className="col-4">
            <FurnitureList allModels={allModels} setModels={setModels} models={JSON.parse(localStorage.getItem("room"))} />
          </div>
        </Row>
      </Container>
    </>
  );
}

export default SingsongRoomEdit;
