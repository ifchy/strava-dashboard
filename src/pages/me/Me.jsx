import React, { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import NavBar from "../../components/navBar/NavBar";
import SideBar from "../../components/sideBar/SideBar";
import "./me.scss";
import { getUserData, userData } from "../../features/userSlice";
import { getProfileData, profileData } from "../../features/profileSlice";
import { useDispatch, useSelector } from "react-redux";

const Me = () => {
  const [userInfo, setUserInfo] = useState();
  const [rows, setRows] = useState();
  const [allTime, setAllTime] = useState();
  const [clubs, setClubs] = useState();
  const { user } = useSelector(userData);
  const { profile } = useSelector(profileData);
  const dispatch = useDispatch();
  const dataStatus = useSelector((state) => state.user.status);

  function createData(name, metric) {
    return { name, metric };
  }
  useEffect(() => {}, []);

  useEffect(() => {
    // getRides();
    if (dataStatus === "idle") {
      dispatch(getUserData());
      setUserInfo(user);
      dispatch(getProfileData());
    }
  }, []);

  useEffect(() => {
    if (user) {
      const rows = [
        createData(
          "Distance",
          `${Math.floor((user.ytd_ride_totals.distance * 0.062137) / 100)} mi`
        ),
        createData(
          "Time",
          moment
            .utc(user.ytd_ride_totals.elapsed_time * 1000)
            .format("HH:mm:ss")
        ),
        createData(
          "Elev Gain",
          `${Math.floor(user.ytd_ride_totals.elevation_gain * 3.28084)} ft`
        ),
        createData("Rides", user.ytd_ride_totals.count),
      ];
      setRows(rows);
      const allTime = [
        createData(
          "Distance",
          `${Math.floor((user.all_ride_totals.distance * 0.062137) / 100)} mi`
        ),
        createData("Rides", user.all_ride_totals.count),
        createData(
          "Longest Ride",
          `${(Math.round(user.biggest_ride_distance * 0.062137) / 100).toFixed(
            2
          )} mi`
        ),
        createData(
          "Biggest Climb",
          `${Math.floor(user.biggest_climb_elevation_gain * 3.28084)} ft`
        ),
      ];
      setAllTime(allTime);
    }
  }, []);

  useEffect(() => {
    if (profile) {
      const itemData = profile.clubs.map((club) => {
        return {
          img: club.profile,
          title: club.name,
          url: club.url,
        };
      });
      setClubs(itemData);
    }
  }, []);

  return (
    <div className="me">
      <SideBar />
      <div className="main">
        <NavBar />
        <div className="meContainer">
          <div className="top">MY STATS</div>
          <div className="bottom">
            <div className="bottom-right">
              <TableContainer component={Paper}>
                <Table
                  sx={{ minWidth: 250 }}
                  size="small"
                  aria-label="a dense table"
                >
                  <TableHead>
                    <TableRow className="tableRow">
                      <TableCell
                        align="center"
                        colSpan={3}
                        className="tableCell"
                      >
                        <DirectionsBikeIcon className="icon" />
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow className="tableHead">
                      <TableCell
                        align="left"
                        colSpan={3}
                        className="tableHeadText"
                      >
                        YTD Totals
                      </TableCell>
                    </TableRow>
                    {rows &&
                      rows.map((row) => (
                        <TableRow
                          key={row.name}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                          className="tableRow"
                        >
                          <TableCell
                            component="th"
                            scope="row"
                            className="tableCell"
                          >
                            {row.name}
                          </TableCell>
                          <TableCell align="left" className="tableCell">
                            {row.metric}
                          </TableCell>
                        </TableRow>
                      ))}
                    <TableRow className="tableHead">
                      <TableCell
                        align="left"
                        colSpan={3}
                        className="tableHeadText"
                      >
                        All-Time
                      </TableCell>
                    </TableRow>
                    {allTime &&
                      allTime.map((row) => (
                        <TableRow
                          key={row.name}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                          className="tableRow"
                        >
                          <TableCell
                            component="th"
                            scope="row"
                            className="tableCell"
                          >
                            {row.name}
                          </TableCell>
                          <TableCell align="left" className="tableCell">
                            {row.metric}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            <div className="bottom-left">
              <div className="profileTitle">
                <img src={profile.profile} alt="" className="profPic" />
                <div className="profile-right">
                  <div className="followingCount">
                    Following
                    <p>{profile.follower_count}</p>
                  </div>
                  <div className="followerCount">
                    Followers
                    <p>{profile.friend_count}</p>
                  </div>
                  <div className="follow">
                    <a
                      href="https://strava.com/athletes/762309"
                      target="_clean"
                    >
                      Follow me on
                      <img
                        src="https://badges.strava.com/logo-strava.png"
                        alt="Strava"
                      />
                    </a>
                  </div>
                </div>
              </div>
              <div className="info">
                <p className="name">
                  {`${profile.firstname} ${profile.lastname}`}
                </p>
                <p className="location">
                  <LocationOnOutlinedIcon className="icon" />
                  {profile.city}, {profile.state}
                </p>
                <p className="social">
                  Strava member since:{" "}
                  {moment(profile.created_at).format("MMMM Do YYYY")}
                </p>
              </div>
              <div className="clubs">
                <p className="clubTitle">Clubs</p>
                <ImageList
                  sx={{
                    gridAutoFlow: "column",
                    gridTemplateColumns:
                      "repeat(auto-fill,minmax(100px, 1fr) ) !important",
                    gridAutoColumns: "minmax(100px, 1fr)",
                  }}
                >
                  {clubs &&
                    clubs.map((item) => (
                      <ImageListItem key={item.img} align="center">
                        <img
                          src={`${item.img}?w=248&fit=crop&auto=format`}
                          srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                          alt={item.title}
                          loading="lazy"
                          href={`https://www.strava.com/clubs/${item.url}`}
                        />
                        <ImageListItemBar
                          title={item.title}
                          position="below"
                          align="center"
                        />
                      </ImageListItem>
                    ))}
                </ImageList>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Me;
