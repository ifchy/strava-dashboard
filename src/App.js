import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import New from "./pages/new/New";
import Single from "./pages/single/Single";
import Me from "./pages/me/Me";
import Map from "pages/map/Map";
import "./theme/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./features/context/darkReducer";
import Redirect from "pages/redirect/Redirect";
import { useSelector } from "react-redux";
import ProtectedRoute from "components/ProtectedRoute";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <Router>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route path="map" element={<Map />} />
            <Route path="redirect/exchange_token" element={<Redirect />} />
            <Route element={<ProtectedRoute />}>
              <Route index element={<Home />} />
              <Route path="athlete" element={<Me />} />
              <Route path="activities">
                <Route index element={<List />} />
                <Route path=":activityId" element={<Single />} />
                <Route path="new" element={<New />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
