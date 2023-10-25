import Container from "react-bootstrap/Container";
import CompositionForm from "../components/CompositionForm";
import Col from "react-bootstrap/Col";
import { Row } from "react-bootstrap";

import LoginBox from "../components/LoginBox";
import CreateAlbum from "../components/CreateAlbum";

function Composition() {
  return (
    <>
      <Container style={{ marginTop: "20px" }}>
        <h1>
          <img src="/img/icon-music.png" alt="icon" style={{ width: "40px", height: "40px" }} /> <b>COMPOSITION</b>
        </h1>
        <Row style={{ marginTop: "30px" }}>
          <Col xs={8}>
            <CompositionForm />
          </Col>
          <Col xs={2}>
            <LoginBox />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Composition;
