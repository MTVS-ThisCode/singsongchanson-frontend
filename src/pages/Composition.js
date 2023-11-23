import Container from "react-bootstrap/Container";
import CompositionForm from "../components/CompositionForm";
import CompositionResult from "../components/CompositionResult";

import Col from "react-bootstrap/Col";
import { Row } from "react-bootstrap";

import LoginBox from "../components/LoginBox";
import UserBox from "../components/UserBox";
import CreateAlbum from "../components/CreateAlbum";
import { useState } from "react";

function Composition({ authenticated, user, logout }) {
  const [post, setPost] = useState(false);
  const [results, setResults] = useState(null);
  const [prepared, setPrepared] = useState(false);

  return (
    <>
      <Container style={{ marginTop: "20px" }}>
        <h1>
          <img src="/img/icon-music.png" alt="icon" style={{ width: "40px", height: "40px" }} /> <b>COMPOSITION</b>
        </h1>
        <Row>
          {post ? (
            <>
              <div className="col-4">
                <CompositionResult results={results} />
              </div>
              <div className="col-4"></div>
            </>
          ) : (
            <>
              <div className="col-8">
                <CompositionForm setPost={setPost} setResults={setResults} />
              </div>
            </>
          )}
          <div className="col-2">{authenticated ? <UserBox user={user} logout={logout}></UserBox> : <LoginBox />}</div>
        </Row>
      </Container>
    </>
  );
}

export default Composition;
