import { CiMenuBurger } from "react-icons/ci";

import { BsSearch } from "react-icons/bs";

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import styles from "./Header.module.css";

function Header({ toggled, setToggled, user }) {
  return (
    <Navbar className="" style={{ paddingTop: "10px", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Container>
        <CiMenuBurger onClick={() => setToggled(!toggled)} className={styles.headerBtn} />
        <Navbar.Brand href="/">
          <img src="/img/logo.png" alt="logo" className="logo" />
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Form className="d-flex">
            <InputGroup className="mb-3 rounded-pill">
              <Form.Control type="search" placeholder="Search" aria-label="Search" />
              <InputGroup.Text>
                <BsSearch />
              </InputGroup.Text>
            </InputGroup>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
