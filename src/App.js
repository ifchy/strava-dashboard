import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import New from "./pages/new/New";
import Single from "./pages/single/Single";
import FetchData from "./FetchData";
import Me from "./pages/me/Me";
import "./theme/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./features/context/darkReducer";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <Router>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="athlete" element={<Me />} />
            <Route path="test" element={<FetchData />} />
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
