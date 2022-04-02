import React, { useEffect, useState } from "react";
import "./single.scss";
import SideBar from "../../components/sideBar/SideBar";
import NavBar from "../../components/navBar/NavBar";
import moment from "moment";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useParams, useNavigate } from "react-router-dom";

const Single = () => {
  const [data, setData] = useState();
  const [rows, setRows] = useState();
  const { activityId } = useParams();
  // const [activity, setActivity] = useState(activityId);

  const getSingle = async (activityId) => {
    const res = await axios.get(
      `https://www.strava.com/api/v3/activities/${activityId}?access_token=645937f93b3c693e5500b4c09c42e4bb9c77af0a`
    );
    setData(res.data);
  };

  useEffect(() => {
    getSingle(activityId);
  }, []);

  useEffect(() => {
    if (data) {
      const createRows = [
        createData(
          "Speed",
          `${data.average_speed} MPH`,
          `${data.max_speed} MPH`
        ),
        createData(
          "Heart Rate",
          `${Math.floor(data.average_heartrate)} BPM`,
          `${Math.floor(data.average_heartrate)} BPM`
        ),
        createData("Calories", data.calories, ""),
        createData(
          "Elapsed Time",
          data.elapsed_time > 3600
            ? moment.utc(data.elapsed_time * 1000).format("HH:mm:ss")
            : moment.utc(data.elapsed_time * 1000).format("mm:ss")
        ),
      ];
      setRows(createRows);
    }
  }, [data]);

  function createData(name, avg, max) {
    return { name, avg, max };
  }

  return (
    <div className="single">
      <SideBar />
      <div className="singleContainer">
        <NavBar />
        <div className="top">
          <div className="title">Activity Overview</div>
        </div>
        <div className="bottom">
          <div className="left">
            <div className="left-top">
              <div className="activityName">{data && data.name}</div>
              <div className="date">
                {data &&
                  moment(data.start_date_local).format(
                    "h:mm on dddd, MMMM, Do YYYY"
                  )}
              </div>
            </div>
            <div className="left-middle"></div>
          </div>
          <div className="right">
            <div className="right-top">
              <div className="distance">
                {data &&
                  (Math.round(data.distance * 0.062137) / 100).toFixed(2)}
                mi
                <div className="distanceText">Distance</div>
              </div>
              <div className="movingTime">
                {data && moment.utc(data.moving_time * 1000).format("mm:ss")}
                <div className="movingTimeText">Moving Time</div>
              </div>
            </div>
            <div className="right-bottom">
              <TableContainer component={Paper}>
                <Table
                  sx={{ minWidth: 250 }}
                  size="small"
                  aria-label="simple table"
                >
                  <TableHead>
                    <TableRow className="table">
                      <TableCell></TableCell>
                      <TableCell align="left">Avg</TableCell>
                      <TableCell align="left">Max</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows &&
                      rows.map((row) => (
                        <TableRow
                          className="table"
                          key={row.name}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {row.name}
                          </TableCell>
                          <TableCell align="left">{row.avg}</TableCell>
                          <TableCell align="left">{row.max}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Single;
