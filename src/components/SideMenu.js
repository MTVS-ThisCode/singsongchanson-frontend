import { Sidebar, Menu, MenuItem, menuClasses } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { CiMenuBurger } from "react-icons/ci";
import styles from "./Header.module.css";

function SideMenu({ toggled, setToggled }) {
  return (
    <div style={{ display: "flex", height: "100%" }}>
      <Sidebar onBackdropClick={() => setToggled(false)} toggled={toggled} breakPoint="always" backgroundColor="white" width="350px">
        <div style={{ marginLeft: "20px", marginTop: "20px" }}>
          <CiMenuBurger onClick={() => setToggled(!toggled)} className={styles.headerBtn} />
          <img src="/img/logo.png" alt="logo" className="logo" />
        </div>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Menu
            rootStyles={{
              [`.${menuClasses.menuItemRoot}`]: {
                width: "220px",
                backgroundColor: "#e1e1e1",
                marginTop: "10px",
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
                },
              },
            }}
          >
            <MenuItem component={<Link to="/mypage" />}>My Page</MenuItem>
            <MenuItem component={<Link to="/composition" />}> AI 작곡하기</MenuItem>
          </Menu>
        </div>
      </Sidebar>
    </div>
  );
}

export default SideMenu;
