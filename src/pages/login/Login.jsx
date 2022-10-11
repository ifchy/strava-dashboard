import NavBar from "components/navBar/NavBar";
import SideBar from "components/sideBar/SideBar";
import React, { useEffect } from "react";
import "./login.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAuthToken } from "features/auth/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.token.status);
  const navigate = useNavigate();

  const getToken = () => {
    if (authStatus === "idle") {
      dispatch(getAuthToken());
    }
  };

  useEffect(() => {
    if (authStatus === "success") {
      navigate("/");
    }
  }, []);

  const redirectUrl = "http://localhost:3000/redirect";
  const scope = "activity:read_all,profile:read_all,activity:write";

  const handleLogin = () => {
    window.location = `http://www.strava.com/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=code&redirect_uri=${redirectUrl}/exchange_token&approval_prompt=force&scope=${scope}`;
  };

  return (
    <div className="login">
      <SideBar />
      <div className="loginContainer">
        <NavBar />
        <div>
          <h1>Login</h1>
          <button onClick={handleLogin}>Connect with Strava</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
