import { useState, useEffect, useCallback } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./layouts/Layout";
import Main from "./pages/Main";
import SingsongRoom from "./pages/SingsongRoom";
import RoomList from "./pages/RoomList";
import Composition from "./pages/Composition";
import MusicList from "./pages/MusicList";
import SingsongRoomEdit from "./pages/SingSongRoomEdit";
import AvatarEdit from "./pages/AvatarEdit";

import OAuth2RedirectHandler from "./oauth2/OAuth2RedirectHandler";

import "bootstrap/dist/css/bootstrap.css";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants";
import { getCurrentUser } from "./apis/auth";
import MyMusic from "./pages/MyMusic";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const loadCurrentlyLoggedInUser = useCallback(async () => {
    const res = await getCurrentUser(localStorage.getItem(ACCESS_TOKEN));
    if (res.status === 200) {
      setCurrentUser(res.data.data);
      setAuthenticated(true);
    }
  }, []);
  // const loadCurrentlyLoggedInUser = () => {
  //   getCurrentUser(localStorage.getItem(ACCESS_TOKEN))
  //     .then((response) => {
  //       console.log(response);
  //       setCurrentUser(response.data.data);
  //       setAuthenticated(true);
  //       console.log(authenticated);
  //       console.log(currentUser);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  const handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    setAuthenticated(false);
    setCurrentUser(null);
    alert("로그아웃 했습니다.");
  };

  useEffect(() => {
    if (localStorage.getItem(ACCESS_TOKEN)) {
      loadCurrentlyLoggedInUser();
    }
  }, [loadCurrentlyLoggedInUser]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout user={currentUser} />}>
            <Route index element={<Main authenticated={authenticated} user={currentUser} logout={handleLogout} />} />
            {/* <Route path="room" element={<SingsongRoom authenticated={authenticated} user={currentUser} />} />/*} */}
            <Route path="composition" element={<Composition authenticated={authenticated} user={currentUser} logout={handleLogout} />} />
            <Route path="avatar" element={<AvatarEdit authenticated={authenticated} user={currentUser} />} />
            <Route path="room">
              <Route index element={<RoomList authenticated={authenticated} user={currentUser} logout={handleLogout} />} />
              <Route path=":roomId" element={<SingsongRoom authenticated={authenticated} user={currentUser} />} />
              <Route path=":roomId/edit" element={<SingsongRoomEdit authenticated={authenticated} user={currentUser} />} />
            </Route>
            <Route path="music">
              <Route index element={<MusicList authenticated={authenticated} user={currentUser} logout={handleLogout} />} />
              <Route path=":userId" element={<MyMusic authenticated={authenticated} user={currentUser} logout={handleLogout} />} />
            </Route>
          </Route>
          <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
