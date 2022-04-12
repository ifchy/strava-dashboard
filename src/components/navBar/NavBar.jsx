import './NavBar.scss';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import { Avatar } from '@mui/material';
import { useContext } from 'react';
import { DarkModeContext } from '../../features/context/darkReducer';

const NavBar = () => {
  const { darkMode, dispatch } = useContext(DarkModeContext);

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Search..." />
        </div>
        <div className="title">STRAVA</div>
        <div className="items">
          <div className="toggle">
            <DarkModeOutlinedIcon
              className="icon"
              onClick={() => dispatch({ type: 'TOGGLE' })}
            />
            <LightModeOutlinedIcon
              className="icon"
              onClick={() => dispatch({ type: 'TOGGLE' })}
            />
            <div
              className="toggleButton"
              style={
                darkMode
                  ? {
                      left: 0,
                      backgroundColor: '#bb86fc',
                    }
                  : { right: 0 }
              }
              onClick={() => dispatch({ type: 'TOGGLE' })}
            ></div>
          </div>
          <div className="item">
            <Avatar
              className="avatar"
              style={
                darkMode
                  ? {
                      backgroundColor: '#3700b3',
                      border: '1px solid #bb86fc69',
                    }
                  : {
                      backgroundColor: 'gray',
                    }
              }
            >
              M
            </Avatar>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
