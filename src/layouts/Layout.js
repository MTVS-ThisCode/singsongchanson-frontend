import Header from "../components/Header";
import SideMenu from "../components/SideMenu";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import Container from "react-bootstrap/Container";

function Layout() {
  const [toggled, setToggled] = useState(false);

  return (
    <>
      <Header toggled={toggled} setToggled={setToggled} />
      <div style={{ display: "flex", height: "100%", minHeight: "100vh" }}>
        <SideMenu toggled={toggled} setToggled={setToggled} />
        <Container>
          <Outlet />
        </Container>
      </div>
    </>
  );
}

export default Layout;
