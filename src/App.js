import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Routes,
  useParams,
  Navigate,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import New from "./pages/new/New";
import Single from "./pages/single/Single";
import FetchData from "./FetchData";
import Me from "./pages/me/Me";
function App() {
  return (
    <div className="App">
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
