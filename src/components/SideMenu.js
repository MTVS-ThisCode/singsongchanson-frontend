import { Sidebar, Menu, MenuItem, menuClasses } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { CiMenuBurger } from "react-icons/ci";
import styles from "./Header.module.css";
import Image from "react-bootstrap/Image";

function SideMenu({ toggled, setToggled }) {
  return (
    <div style={{ display: "flex", height: "100%" }}>
      <Sidebar onBackdropClick={() => setToggled(false)} toggled={toggled} breakPoint="always" backgroundColor="white" width="350px">
        <div style={{ marginLeft: "20px", marginTop: "20px" }}>
          <CiMenuBurger onClick={() => setToggled(!toggled)} className={styles.headerBtn} />
          <img src="/img/logo.png" alt="logo" className="logo" />
        </div>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "10px" }}>
          <Menu
            rootStyles={{
              ["." + menuClasses.button]: {
                "&:hover": {
                  backgroundColor: "#9283F6",
                  borderRadius: "10px",
                },
              },
              [`.${menuClasses.menuItemRoot}`]: {
                width: "220px",
                backgroundColor: "#e1e1e1",
                marginTop: "20px",
                borderRadius: "10px",
              },
            }}
            menuItemStyles={{
              button: {
                // the active class will be added automatically by react router
                // so we can use it to style the active menu item
                [`&.active`]: {
                  backgroundColor: "#13395e",
                  color: "#b6c8d9",
                  borderRadius: "10px",
                },
              },
            }}
          >
            <MenuItem icon={<Image src="/img/room.png" style={{ width: "30px", height: "30px" }} />} component={<Link to="/room" />}>
              싱송룸
            </MenuItem>
            <MenuItem icon={<Image src="/img/composition.png" style={{ width: "30px", height: "30px" }} />} component={<Link to="/composition" />}>
              AI 작곡하기
            </MenuItem>
            <MenuItem icon={<Image src="/img/composition.png" style={{ width: "30px", height: "30px" }} />} component={<Link to="/music/2" />}>
              마이 뮤직
            </MenuItem>
          </Menu>
        </div>
      </Sidebar>
    </div>
  );
}

export default SideMenu;
