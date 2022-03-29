import "./SideBar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PeopleIcon from "@mui/icons-material/People";
import RouteIcon from "@mui/icons-material/Route";
import LogoutIcon from "@mui/icons-material/Logout";

const SideBar = () => {
  return (
    <div className="sidebar">
      <div className="top">
        <span className="logo">admin</span>
      </div>
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <li>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
          <p className="title">LISTS</p>
          <li>
            <PersonIcon className="icon" />
            <span>Me</span>
          </li>
          <li>
            <PeopleIcon className="icon" />
            <span>Strava Clubs</span>
          </li>
          <li>
            <RouteIcon className="icon" />
            <span>Routes</span>
          </li>
          <p className="title">SETTINGS</p>
          <li>
            <AccountCircleIcon className="icon" />
            <span>Profile</span>
          </li>
          <li>
            <LogoutIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <p className="title">THEME</p>
        <div className="picker">
          <div className="colorOptions"></div>
          <div className="colorOptions"></div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
