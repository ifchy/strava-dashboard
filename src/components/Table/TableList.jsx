import "./TableList.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import React, { useEffect } from "react";
import moment from "moment";
import { getStravaData, allData } from "../../features/stravaData";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const TableList = () => {
  const dispatch = useDispatch();
  const dataStatus = useSelector((state) => state.data.status);
  const { data } = useSelector(allData);
  const navigate = useNavigate();
  const rendered = data.map((ride, index) => {
    const {
      name,
      start_date,
      type,
      elapsed_time,
      distance,
      average_heartrate,
      id,
    } = ride;
    const final = {
      name,
      start_date,
      type,
      elapsed_time:
        elapsed_time > 3600
          ? moment.utc(elapsed_time * 1000).format("HH:mm:ss")
          : moment.utc(elapsed_time * 1000).format("mm:ss"),
      distance: `${(Math.round(distance * 0.062137) / 100).toFixed(2)} miles`,
      average_heartrate: average_heartrate
        ? Math.floor(average_heartrate)
        : "Not available",
      id,
    };
    return final;
  });

  useEffect(() => {
    // getRides();
    if (dataStatus === "idle") {
      dispatch(getStravaData());
    }
  }, []);

  return (
    <div className="table">
      <TableContainer component={Paper} className="table">
        <Table sx={{ minWidth: 250 }} aria-label="simple table">
          <TableHead>
            <TableRow className="tableHeader">
              <TableCell className="tableCell">Workout Name</TableCell>
              <TableCell className="tableCell">Date</TableCell>
              <TableCell className="tableCell">Type</TableCell>
              <TableCell className="tableCell">Elapsed Time</TableCell>
              <TableCell className="tableCell">Distance</TableCell>
              <TableCell className="tableCell">Avg HR</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              rendered.map((row, index) => (
                <TableRow
                  className="tableRow"
                  key={index}
                  id={row.id}
                  onClick={() => {
                    navigate(`/activities/${row.id}`);
                  }}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell className="tableCell">{row.name}</TableCell>
                  <TableCell className="tableCell">
                    {moment(row.start_date).format("MM/DD/YYYY")}
                  </TableCell>
                  <TableCell className="tableCell">{row.type}</TableCell>
                  <TableCell className="tableCell">
                    {row.elapsed_time}
                  </TableCell>
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
