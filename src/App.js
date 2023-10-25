import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import Main from "./pages/Main";
import Mypage from "./pages/MyPage";
import Composition from "./pages/Composition";
import OAuth2RedirectHandler from "./oauth2/OAuth2RedirectHandler";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Main />} />
            <Route path="main" element={<Main />} />
            <Route path="mypage" element={<Mypage />} />
            <Route path="composition" element={<Composition />} />
            {/* <Route path="menu">
              <Route index element={<Menu />} />
              <Route path=":menuCode" element={<MenuDetails />} />
              <Route path="search" element={<MenuSearchResult />} />
            </Route> */}
          </Route>
          <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
