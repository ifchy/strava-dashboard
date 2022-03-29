import "./TableList.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import React, { useState, useEffect } from "react";
import moment from "moment";

const TableList = () => {
  const [rides, setRides] = useState([]);

  const getRides = async () => {
    const data = [];
    const config = {
      method: "get",
      url: "https://www.strava.com/api/v3/athlete/activities?access_token=8b23ff6c62081735f1d5b20b723edfa8191dd9aa&per_page=50",
      headers: {
        Cookie: "_strava4_session=3gqjghe8q5s2i0i2vck7vqs06jca5vd9",
      },
    };
    const response = await fetch(config.url);
    const jsonData = await response.json();
    data.push(...jsonData);
    // setRides([...rides, jsonData]);
    const rendered = data.map((ride, index) => {
      const {
        name,
        start_date,
        type,
        elapsed_time,
        distance,
        average_heartrate,
      } = ride;
      const final = {
        name,
        start_date,
        type,
        elapsed_time: `${Math.floor(elapsed_time / 60)}:${Math.floor(
          elapsed_time % 60
        )}`,
        distance,
        average_heartrate: Math.floor(average_heartrate),
      };
      return final;
    });
    setRides(rendered);
  };
  const ten = () => {
    const rows = [];
    for (let i = 0; i < 10; i++) {
      rows.push(rides[i]);
    }
    return rows;
  };
  console.log(ten());
  useEffect(() => {
    getRides();
  }, []);

  return (
    <div className="table">
      <TableContainer component={Paper} className="table">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="tableCell">Workout Name</TableCell>
              <TableCell className="tableCell">Date</TableCell>
              <TableCell className="tableCell">Type</TableCell>
              <TableCell className="tableCell">Elapsed Time</TableCell>
              <TableCell className="tableCell">Distance</TableCell>
              <TableCell className="tableCell">Avg HR</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rides.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell className="tableCell">{row.name}</TableCell>
                <TableCell className="tableCell">
                  {moment(row.start_date).format("MM/DD/YYYY")}
                </TableCell>
                <TableCell className="tableCell">{row.type}</TableCell>
                <TableCell className="tableCell">{row.elapsed_time}</TableCell>
                <TableCell className="tableCell">{row.distance}</TableCell>
                <TableCell className="tableCell">
                  {row.average_heartrate}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TableList;
