import "./Chart.scss";
import React, { useState, useEffect } from "react";
import moment from "moment";
import { getStravaData, allData } from "../../features/stravaData";
import { useDispatch, useSelector } from "react-redux";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useContext } from "react";
import { DarkModeContext } from "../../features/context/darkReducer";

const Chart = () => {
  const { darkMode } = useContext(DarkModeContext);
  const { data } = useSelector(allData);
  const [metric, setMetric] = useState("Workouts");

  const oneMonthAgo = moment().startOf("month").add(-1, "months");
  const twoMonthAgo = moment().startOf("month").add(-2, "months");
  const threeMonthAgo = moment().startOf("month").add(-3, "months");
  const fourMonthAgo = moment().startOf("month").add(-4, "months");
  const fiveMonthAgo = moment().startOf("month").add(-5, "months");
  const sixMonthAgo = moment().startOf("month").add(-6, "months");
  const sixMonthData = createRow(
    moment().subtract(6, "months").format("MMMM"),
    data.filter((ride) => moment(ride.start_date).isAfter(sixMonthAgo)).length,
    data
      .filter((ride) => moment(ride.start_date).isAfter(sixMonthAgo))
      .reduce(
        (prevTime, thisTime) => {
          return {
            elapsedTime: prevTime.elapsedTime + thisTime.elapsed_time,
            distance: prevTime.distance + thisTime.distance,
            avgHR: prevTime.avgHR + thisTime.average_heartrate,
          };
        },
        {
          elapsedTime: 0,
          distance: 0,
          avgHR: 0,
        }
      )
  );

  function createRow(month, total, reducedData) {
    return {
      name: month,
      Workouts: total,
      "Elapsed Time": Math.floor(reducedData.elapsedTime / 60),
      Distance: (Math.round(reducedData.distance * 0.062137) / 100).toFixed(2),
      average_heartrate: reducedData.avgHR,
    };
  }

  const dataArray = [
    createRow(
      moment().subtract(6, "months").format("MMMM"),
      data.filter((ride) =>
        moment(ride.start_date).isBetween(sixMonthAgo, fiveMonthAgo)
      ).length,
      data
        .filter((ride) =>
          moment(ride.start_date).isBetween(sixMonthAgo, fiveMonthAgo)
        )
        .reduce(
          (prevTime, thisTime) => {
            return {
              elapsedTime: prevTime.elapsedTime + thisTime.elapsed_time,
              distance: prevTime.distance + thisTime.distance,
              avgHR: prevTime.avgHR + thisTime.average_heartrate,
            };
          },
          {
            elapsedTime: 0,
            distance: 0,
            avgHR: 0,
          }
        )
    ),
    createRow(
      moment().subtract(5, "months").format("MMMM"),
      data.filter((ride) =>
        moment(ride.start_date).isBetween(fiveMonthAgo, fourMonthAgo)
      ).length,
      data
        .filter((ride) =>
          moment(ride.start_date).isBetween(fiveMonthAgo, fourMonthAgo)
        )
        .reduce(
          (prevTime, thisTime) => {
            return {
              elapsedTime: prevTime.elapsedTime + thisTime.elapsed_time,
              distance: prevTime.distance + thisTime.distance,
              avgHR: prevTime.avgHR + thisTime.average_heartrate,
            };
          },
          {
            elapsedTime: 0,
            distance: 0,
            avgHR: 0,
          }
        )
    ),
    createRow(
      moment().subtract(4, "months").format("MMMM"),
      data.filter((ride) =>
        moment(ride.start_date).isBetween(fourMonthAgo, threeMonthAgo)
      ).length,
      data
        .filter((ride) =>
          moment(ride.start_date).isBetween(fourMonthAgo, threeMonthAgo)
        )
        .reduce(
          (prevTime, thisTime) => {
            return {
              elapsedTime: prevTime.elapsedTime + thisTime.elapsed_time,
              distance: prevTime.distance + thisTime.distance,
              avgHR: prevTime.avgHR + thisTime.average_heartrate,
            };
          },
          {
            elapsedTime: 0,
            distance: 0,
            avgHR: 0,
          }
        )
    ),
    createRow(
      moment().subtract(3, "months").format("MMMM"),
      data.filter((ride) =>
        moment(ride.start_date).isBetween(threeMonthAgo, twoMonthAgo)
      ).length,
      data
        .filter((ride) =>
          moment(ride.start_date).isBetween(threeMonthAgo, twoMonthAgo)
        )
        .reduce(
          (prevTime, thisTime) => {
            return {
              elapsedTime: prevTime.elapsedTime + thisTime.elapsed_time,
              distance: prevTime.distance + thisTime.distance,
              avgHR: prevTime.avgHR + thisTime.average_heartrate,
            };
          },
          {
            elapsedTime: 0,
            distance: 0,
            avgHR: 0,
          }
        )
    ),
    createRow(
      moment().subtract(2, "months").format("MMMM"),
      data.filter((ride) =>
        moment(ride.start_date).isBetween(twoMonthAgo, oneMonthAgo)
      ).length,
      data
        .filter((ride) =>
          moment(ride.start_date).isBetween(twoMonthAgo, oneMonthAgo)
        )
        .reduce(
          (prevTime, thisTime) => {
            return {
              elapsedTime: prevTime.elapsedTime + thisTime.elapsed_time,
              distance: prevTime.distance + thisTime.distance,
              avgHR: prevTime.avgHR + thisTime.average_heartrate,
            };
          },
          {
            elapsedTime: 0,
            distance: 0,
            avgHR: 0,
          }
        )
    ),
    createRow(
      moment().subtract(1, "months").format("MMMM"),
      data.filter((ride) =>
        moment(ride.start_date).isBetween(
          oneMonthAgo,
          moment().startOf("month")
        )
      ).length,
      data
        .filter((ride) =>
          moment(ride.start_date).isBetween(
            oneMonthAgo,
            moment().startOf("month")
          )
        )
        .reduce(
          (prevTime, thisTime) => {
            return {
              elapsedTime: prevTime.elapsedTime + thisTime.elapsed_time,
              distance: prevTime.distance + thisTime.distance,
              avgHR: prevTime.avgHR + thisTime.average_heartrate,
            };
          },
          {
            elapsedTime: 0,
            distance: 0,
            avgHR: 0,
          }
        )
    ),
    createRow(
      moment().format("MMMM"),
      data.filter((ride) =>
        moment(ride.start_date).isAfter(moment().startOf("month"))
      ).length,
      data
        .filter((ride) =>
          moment(ride.start_date).isAfter(moment().startOf("month"))
        )
        .reduce(
          (prevTime, thisTime) => {
            return {
              elapsedTime: prevTime.elapsedTime + thisTime.elapsed_time,
              distance: prevTime.distance + thisTime.distance,
              avgHR: prevTime.avgHR + thisTime.average_heartrate,
            };
          },
          {
            elapsedTime: 0,
            distance: 0,
            avgHR: 0,
          }
        )
    ),
  ];
  const handleChange = (e) => {
    setMetric(e.target.value);
  };
  let ending;
  switch (metric) {
    case "Distance":
      ending = "miles";
      break;
    case "Elapsed time":
      ending = "minutes";
      break;
  }
  return (
    <div className="chart">
      <div className="title">
        Last 6 months- Total {metric}: {sixMonthData[metric]} {ending}
        <span className="title">
          <select value={metric} onChange={handleChange}>
            <option value={"Workouts"}>Workouts</option>
            <option value={"Elapsed Time"}>Elapsed Time</option>
            <option value={"Distance"}>Distance</option>
            <option value={"Average_heartrate"}>Average Heart Rate</option>
          </select>
        </span>
      </div>

      <ResponsiveContainer width="100%" aspect={2 / 1}>
        <AreaChart
          width={730}
          height={250}
          data={dataArray}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id={metric} x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={darkMode ? "#bb86fc" : "#8884d8"}
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor={darkMode ? "#bb86fc" : "#8884d8"}
                stopOpacity={0.2}
              />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="name"
            stroke={darkMode ? "#ffffff" : "gray"}
            className="xAxis"
          />
          <YAxis
            dataKey={metric}
            stroke={darkMode ? "#ffffff" : "gray"}
            className="yAxis"
          />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            className="areaChart"
            type="monotone"
            dataKey={metric}
            stroke={darkMode ? `#3700b3` : "#8884d8"}
            fillOpacity={0.65}
            fill={darkMode ? `#bb86fc` : "#8884d8"}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
