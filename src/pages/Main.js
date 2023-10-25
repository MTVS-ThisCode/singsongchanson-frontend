import React from "react";
import Row from "react-bootstrap/Row";
import LoginBox from "../components/LoginBox";

function Main() {
  return (
    <>
      <Row>
        <div className="col-8"></div>
        <div className="col-2">
          <LoginBox />
        </div>
      </Row>
    </>
  );
}

export default Main;
