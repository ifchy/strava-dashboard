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
import * as d3 from "d3";

// const DrawChart = ({ coords, data }) => {
//   const margin = { top: 0, right: 0, bottom: 15, left: 50 };
//   const width = 700 - margin.left - margin.right;
//   const height = 155 - margin.top - margin.bottom;
//   const xAxisTicks = 8;
//   const yAxisTicks = 6;
//   const makeXGridlines = (xScale) => d3.axisBottom(xScale).ticks(xAxisTicks);
//   const makeYGridlines = (yScale) => d3.axisLeft(yScale).ticks(yAxisTicks);
//   useEffect(() => {
//     const xScale = d3
//       .scaleLinear()
//       .domain(d3.extent(data, (d) => d.x))
//       .range([0, width]);
//     const yScale = d3
//       .scaleLinear()
//       .domain([d3.min(data, (co) => co.y), d3.max(data, (co) => co.y)])
//       .range([height, 0]);
//     const svg = d3
//       .select("#elevationChart")
//       .append("svg")
//       .attr("width", 700)
//       .attr("height", 155)
//       .attr("viewBox", "0 0 " + width + " " + 160)
//       .attr("preserveAspectRatio", "xMinYMid")
//       .append("g")
//       .attr("transform", `translate(${margin.left}, 2.5)`);
//     const area = d3
//       .area()
//       .x((d) => xScale(d.x))
//       .y0(yScale(yScale.domain()[0]))
//       .y1((d) => yScale(d.y))
//       .curve(d3.curveCatmullRom.alpha(0.005));
//     svg
//       .append("g")
//       .attr("transform", `translate(0, ${height})`)
//       .call(d3.axisBottom(xScale));
//     svg.append("g").call(d3.axisLeft(yScale));
//     // Make X grid:
//     svg
//       .append("g")
//       .attr("class", "chartGrid")
//       .attr("transform", `translate(0, ${height})`)
//       .call(
//         makeXGridlines(xScale)
//           // STRETCH IT PARALLEL TO Y:
//           .tickSize(-height)
//           // NO FORMAT, THESE JUST BE LINES:
//           .tickFormat("")
//       );
//     // Make Y grid:
//     svg.append("g").attr("class", "chartGrid").call(
//       makeYGridlines(yScale)
//         // STRETCH IT PARALLEL TO X:
//         .tickSize(-width)
//         // NO FORMAT, THESE JUST BE LINES:
//         .tickFormat("")
//     );
//     svg
//       .append("path")
//       .attr("d", area(data))
//       .attr("class", "chartLine")
//       .style("stroke", "#787979")
//       .style("stroke-opacity", 0.2)
//       .style("stroke-width", 1)
//       .style("fill", "#787979")
//       .style("fill-opacity", 0.2);
//   }, []);
//   return (
//     <div>
//       <div id="elevationChart" />
//     </div>
//   );
// };

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
              
              {/* && (
                <DrawChart
                  data={[
                    { x: 5, y: 15 },
                    { x: 15, y: 20 },
                    { x: 35, y: 5 },
                  ]}
                  coords={data.start_latlng}
                />
              )} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Single;
