import SceneComponent from "../components/ScenceComponent";
import Row from "react-bootstrap/Row";
import LoginBox from "../components/LoginBox";
import Container from "react-bootstrap/Container";

function Mypage() {
  return (
    <>
      <Container>
        <h1>마이페이지</h1>
        <Row>
          <div className="col-9">
            <SceneComponent antialias id="my-canvas" />
          </div>
          <LoginBox />
        </Row>
      </Container>
    </>
  );
}

export default Mypage;
