import NavBar from "components/navBar/NavBar";
import SideBar from "components/sideBar/SideBar";
import React, { useEffect } from "react";
import "./login.scss";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const authStatus = useSelector((state) => state.token.status);
  const navigate = useNavigate();

  useEffect(() => {
    if (authStatus === "success") {
      navigate("/");
    }
  }, []);

  const redirectUrl = "https://strava-react-dashboard.netlify.app/redirect";
  const scope = "activity:read_all,profile:read_all,activity:write";

  const handleLogin = () => {
    window.location = `http://www.strava.com/oauth/authorize?client_id=80161&response_type=code&redirect_uri=${redirectUrl}/exchange_token&approval_prompt=force&scope=${scope}`;
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
