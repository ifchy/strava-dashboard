import React, { useEffect } from "react";
import NavBar from "components/navBar/NavBar";
import SideBar from "components/sideBar/SideBar";
import RedirectToken from "components/redirectToken/RedirectToken";
import "./redirect.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAuthToken } from "features/auth/authSlice";
const Redirect = () => {
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.token.status);
  const navigate = useNavigate();

  useEffect(() => {
    if (authStatus === "idle") {
      dispatch(getAuthToken());
    }
    if (authStatus === "success") {
      navigate("/");
    }
  }, [authStatus]);
  return (
    <div className="login">
      <SideBar />
      <div className="loginContainer">
        <NavBar />
        <div>
          <h1>Login</h1>
          <button onClick={(e) => console.log("token")}>
            Connect with Strava
          </button>
        </div>
      </div>
    </div>
  );
};

export default Redirect;
