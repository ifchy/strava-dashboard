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

const Chart = () => {
  const dispatch = useDispatch();
  const dataStatus = useSelector((state) => state.data.status);
  const { data } = useSelector(allData);
  const [metric, setMetric] = useState("workouts");

  const oneMonthAgo = moment().add(-1, "months");
  const twoMonthAgo = moment().add(-2, "months");
  const threeMonthAgo = moment().add(-3, "months");
  const fourMonthAgo = moment().add(-4, "months");
  const fiveMonthAgo = moment().add(-5, "months");
  const sixMonthAgo = moment().add(-6, "months");
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
      workouts: total,
      "elapsed time": Math.floor(reducedData.elapsedTime / 60),
      distance: (Math.round(reducedData.distance * 0.062137) / 100).toFixed(2),
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
        moment(ride.start_date).isBetween(oneMonthAgo, moment())
      ).length,
      data
        .filter((ride) =>
          moment(ride.start_date).isBetween(oneMonthAgo, moment())
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
      data.filter((ride) => moment(ride.start_date).isAfter(oneMonthAgo))
        .length,
      data
        .filter((ride) => moment(ride.start_date).isAfter(oneMonthAgo))
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
  console.log(dataArray);
  const handleChange = (e) => {
    setMetric(e.target.value);
    console.log(metric);
  };
  let ending;
  switch (metric) {
    case "distance":
      ending = "miles";
      break;
    case "elapsed time":
      ending = "minutes";
      break;
  }
  return (
    <div className="chart">
      <div className="title">
        Last 6 months- Total {metric}: {sixMonthData[metric]} {ending}
      </div>
      <div className="title">
        <select value={metric} onChange={handleChange}>
          <option value={"workouts"}>Workouts</option>
          <option value={"elapsed time"}>Elapsed Time</option>
          <option value={"distance"}>Distance</option>
          <option value={"average_heartrate"}>Average Heart Rate</option>
        </select>
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
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <YAxis dataKey={metric} stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey={metric}
            stroke="#8884d8"
            fillOpacity={0.45}
            fill="#8884d8"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
