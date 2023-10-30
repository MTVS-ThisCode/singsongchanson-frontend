import Container from "react-bootstrap/Container";
import CompositionForm from "../components/CompositionForm";
import Col from "react-bootstrap/Col";
import { Row } from "react-bootstrap";

import LoginBox from "../components/LoginBox";
import UserBox from "../components/UserBox";
import CreateAlbum from "../components/CreateAlbum";

function Composition({ authenticated, user, logout }) {
  return (
    <>
      <Container style={{ marginTop: "20px" }}>
        <h1>
          <img src="/img/icon-music.png" alt="icon" style={{ width: "40px", height: "40px" }} /> <b>COMPOSITION</b>
        </h1>
        <Row>
          <div className="col-8">
            <CompositionForm />
          </div>
          <div className="col-2">{authenticated ? <UserBox user={user} logout={logout}></UserBox> : <LoginBox />}</div>
        </Row>
      </Container>
    </>
  );
}

export default Composition;
