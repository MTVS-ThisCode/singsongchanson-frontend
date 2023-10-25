import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Container from "react-bootstrap/Container";

function NavigationBar() {
  return (
    <>
      <Navbar collapseOnSelect style={{ backgroundColor: "white", height: "70px" }}>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand className="fw-bold text-muted">SingSongChanSon</Navbar.Brand>
          </LinkContainer>
        </Container>
        <Navbar.Toggle />
        <Container>
          <Navbar.Collapse className="justify-content-end">
            <Nav activeKey={window.location.pathname}>
              <LinkContainer to="/mypage">
                <Nav.Link>MY PAGE</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/login">
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
export default NavigationBar;
