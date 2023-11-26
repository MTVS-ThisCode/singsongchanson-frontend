import Stack from "react-bootstrap/Stack";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import loginStyle from "./Login.module.css";
import userBoxStyle from "./UserBox.module.css";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

function UserBox({ user, logout }) {
  return (
    <Stack gap={4} className="col-1 mx-auto">
      <div className={userBoxStyle.userBox}>
        <Row>
          <Col>
            <img className={userBoxStyle.profileImage} src={user.profileImg} alt="profileImage" />
          </Col>
          <Col>
            <h3 className={userBoxStyle.nickname}>
              <b>{user.nickName}</b>
            </h3>
          </Col>
          <Col>
            <Button variant="outline-secondary" type="button" size="sm" className={userBoxStyle.logoutBtn} onClick={logout}>
              로그아웃
            </Button>
          </Col>
        </Row>
      </div>
      <div style={{ marginLeft: "12px", marginTop: "-25px" }}>
        <Row className={loginStyle.signInBtn}>
          <Col className={loginStyle.box}>
            <Link to={`/room/${user.roomId}`} style={{ textDecoration: "none", color: "black" }}>
              MY 싱송룸
            </Link>
          </Col>
          <Col className={loginStyle.box}>
            <Link to={`/music/${user.userNo}`} style={{ textDecoration: "none", color: "black" }}>
              MY 뮤직
            </Link>
          </Col>
        </Row>
      </div>
      {/* <div style={{ marginLeft: "12px" }}>
        <Row className={loginStyle.signInBtn}>
          <Col className={loginStyle.box}>팔로워</Col>
          <Col className={loginStyle.box}>팔로잉</Col>
        </Row>
      </div>
      <div style={{ marginLeft: "12px" }}>
        <Row className={loginStyle.signInBtn}>
          <Col className={loginStyle.box}>캐릭터 생성하기</Col>
        </Row>
      </div> */}
    </Stack>
  );
}

export default UserBox;
