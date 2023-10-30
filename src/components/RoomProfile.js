import Stack from "react-bootstrap/Stack";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import roomProfilexStyle from "./RoomProfile.module.css";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

function RoomProfile({ user }) {
  return (
    <>
      <div className={roomProfilexStyle.roomProfile}>
        <Row>
          <Col>
            <img className={roomProfilexStyle.profileImage} src={user.profileImg} alt="profileImage" />
            <h6 className={roomProfilexStyle.nickname}>
              <b>{user.nickName} 님의 SINGSONGROOM</b>
            </h6>
          </Col>
        </Row>
      </div>
      <div>
        <Row className={roomProfilexStyle.signInBtn}>
          <Col className={roomProfilexStyle.box}>팔로워</Col>
          <Col className={roomProfilexStyle.box}>팔로잉</Col>
        </Row>
      </div>
    </>
  );
}
export default RoomProfile;
