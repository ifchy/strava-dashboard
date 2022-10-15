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
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import L from "leaflet";
import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import "polyline-encoded";

function EncodedPolyline({ color, data }) {
  const map = useMap();
  useEffect(() => {
    if (!map) return;
    L.polyline(L.PolylineUtil.decode(data), {
      color: "red",
      weight: 5,
    }).addTo(map);
  }, [map, data, color]);
  console.log(L.polyline(L.PolylineUtil.decode(data)).getLatLngs()[0].lat);
  return null;
}

const Single = () => {
  const [data, setData] = useState();
  const [rows, setRows] = useState();
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const { activityId } = useParams();
  // const [activity, setActivity] = useState(activityId);
  const { access_token } = useSelector((state) => state.token.token);
  const getSingle = async (activityId) => {
    const res = await axios.get(
      `https://www.strava.com/api/v3/activities/${activityId}?access_token=${access_token}`
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
          `${Math.floor(data.average_speed * 2.23694)} MPH`,
          `${Math.floor(data.max_speed * 2.23694)} MPH`
        ),
        createData(
          "Heart Rate",
          !data.average_heartrate
            ? "Not Available"
            : Math.floor(data.average_heartrate) + "BPM",
          !data.max_heartrate
            ? "Not Available"
            : Math.floor(data.max_heartrate) + "BPM"
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
      const startData = L.polyline(
        L.PolylineUtil.decode(data.map.polyline)
      ).getLatLngs()[0];
      const count = L.polyline(
        L.PolylineUtil.decode(data.map.polyline)
      ).getLatLngs().length;

      const endData = L.polyline(
        L.PolylineUtil.decode(data.map.polyline)
      ).getLatLngs()[count - 1];
      setStart(startData);
      console.log(count);
      console.log(endData);
      setEnd(endData);
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
          <div className="title">ACTIVITY OVERVIEW</div>
          <div className="title">{}</div>
        </div>
        <div className="bottom">
          <div className="left">
            <div className="left-top">
              <div className="activityName">{data && data.name}</div>
              <div className="date">
                {data &&
                  moment(data.start_date).format(
                    "h:mma on dddd, MMMM, Do YYYY"
                  )}
              </div>
            </div>
            <div className="left-middle">
              <MapContainer
                center={[33.95315119086205, -84.62824205841956]}
                zoom={13}
                scrollWheelZoom={false}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {data && (
                  <EncodedPolyline color={"red"} data={data.map.polyline} />
                )}
                {start && (
                  <>
                    <Marker position={[start.lat, start.lng]}>
                      <Popup>Start</Popup>
                    </Marker>
                    <Marker position={[end.lat, end.lng]}>
                      <Popup>End</Popup>
                    </Marker>
                  </>
                )}
              </MapContainer>
            </div>
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
                {data && moment.utc(data.moving_time * 1000).format("h:mm:ss")}
                <div className="movingTimeText">Moving Time</div>
              </div>
              <div className="elapsedTime">
                {data && moment.utc(data.elapsed_time * 1000).format("h:mm:ss")}
                <div className="elapsedTimeText">Elapsed Time</div>
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
                    <TableRow className="tableHead">
                      <TableCell className="tableCell"></TableCell>
                      <TableCell align="left" className="tableCell">
                        Avg
                      </TableCell>
                      <TableCell align="left" className="tableCell">
                        Max
                      </TableCell>
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
                          <TableCell
                            component="th"
                            scope="row"
                            className="tableCell"
                          >
                            {row.name}
                          </TableCell>
                          <TableCell align="left" className="tableCell">
                            {row.avg}
                          </TableCell>
                          <TableCell align="left" className="tableCell">
                            {row.max}
                          </TableCell>
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
