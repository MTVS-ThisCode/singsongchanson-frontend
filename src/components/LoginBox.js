import Stack from "react-bootstrap/Stack";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import loginStyle from "./Login.module.css";
import { KAKAO_AUTH_URL } from "../constants";

function LoginBox() {
  return (
    <Stack gap={2} className="col-1 mx-auto">
      <div className={loginStyle.signInBtn}>
        <p>싱송샹송을 더 안전하고 편리하게 이용하세요.</p>
        <a className={loginStyle.kakaoBtn} href={KAKAO_AUTH_URL}>
          <img src="/img/KakaoSignIn.png" alt="카카오" />
        </a>
      </div>
      <div style={{ marginLeft: "12px" }}>
        <Row className={loginStyle.signInBtn}>
          <Col className={loginStyle.box}>회원등급</Col>
          <Col className={loginStyle.box}>일반</Col>
        </Row>
      </div>
    </Stack>
  );
}

export default LoginBox;
