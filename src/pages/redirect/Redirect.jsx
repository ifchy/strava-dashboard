import React from "react";
import NavBar from "components/navBar/NavBar";
import SideBar from "components/sideBar/SideBar";
import RedirectToken from "components/redirectToken/RedirectToken";
import "./redirect.scss";
const Redirect = () => {
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
          <h1>
            <RedirectToken />
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Redirect;
