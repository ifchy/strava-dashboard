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
import { MapContainer, TileLayer, useMap } from "react-leaflet";
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
  return null;
}

function MarkerColored({ coords, color, popupText }) {
  const map = useMap();
  useEffect(() => {
    const marker = L.marker([coords[0], coords[1]]).addTo(map);
    marker._icon.classList.add(color);
    marker.bindPopup(popupText);
  }, [coords]);
  return null;
}
function MapZoom({ polyline }) {
  const group = new L.featureGroup();
  const map = useMap();
  const coords = L.polyline(L.PolylineUtil.decode(polyline)).getLatLngs();
  coords.map((coord) => {
    L.marker([coord.lat, coord.lng]).addTo(group);
  });
  map.fitBounds(group.getBounds());
  return null;
}
const Single = () => {
  const [data, setData] = useState();
  const [rows, setRows] = useState();
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
              {data && (
                <MapContainer
                  center={[data.start_latlng[0], data.start_latlng[1]]}
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
                  <MarkerColored
                    coords={data.start_latlng}
                    color={"start"}
                    popupText={"Start of Activity"}
                  />
                  <MarkerColored
                    coords={data.end_latlng}
                    color={"end"}
                    popupText={"End of Activity"}
                  />
                  <MapZoom polyline={data.map.polyline} />
                </MapContainer>
              )}
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
              <div className="elevationGain">
                {data && Math.round(data.total_elevation_gain * 3.28084)}
                ft
                <div className="elevationGainText">Elevation Gain</div>
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
