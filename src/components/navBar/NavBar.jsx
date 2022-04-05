import "./NavBar.scss";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import { Avatar } from "@mui/material";

const NavBar = () => {
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Search..." />
        </div>
        <div className="items">
          <div className="toggle">
            <DarkModeOutlinedIcon className="icon" />
            <LightModeOutlinedIcon className="icon" />
          </div>
          <div className="item">
            <Avatar className="avatar">M</Avatar>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
