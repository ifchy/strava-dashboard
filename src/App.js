import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import New from "./pages/new/New";
import Single from "./pages/single/Single";
import Me from "./pages/me/Me";
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
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route
              path="athlete"
              element={
                <ProtectedRoute>
                  <Me />
                </ProtectedRoute>
              }
            />
            <Route path="redirect/exchange_token" element={<Redirect />} />
            <Route path="activities">
              <Route index element={<List />} />
              <Route path=":activityId" element={<Single />} />
              <Route path="new" element={<New />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
