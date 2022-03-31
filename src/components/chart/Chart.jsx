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

  const oneMonthAgo = moment().add(-1, "months");
  const twoMonthAgo = moment().add(-2, "months");
  const threeMonthAgo = moment().add(-3, "months");
  const fourMonthAgo = moment().add(-4, "months");
  const fiveMonthAgo = moment().add(-5, "months");
  const sixMonthAgo = moment().add(-6, "months");
  const sixMonthData = data.filter((ride) =>
    moment(ride.start_date).isAfter(sixMonthAgo)
  );

  function createRow(month, total) {
    return { name: month, Total: total };
  }

  const dataArray = [
    createRow(
      moment().subtract(3, "months").format("MMMM"),
      data.filter((ride) => moment(ride.start_date).isAfter(threeMonthAgo))
        .length
    ),
    { name: "February", Total: 20 },
    { name: "March", Total: 30 },
    { name: "April", Total: 10 },
    { name: "May", Total: 0 },
    { name: "June", Total: 22 },
  ];

  return (
    <div className="chart">
      <div className="title">Last 6 months</div>
      <ResponsiveContainer width="100%" aspect={2 / 1}>
        <AreaChart
          width={730}
          height={250}
          data={dataArray}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="Total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <YAxis dataKey="Total" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Total"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#Total)"
          />
          <Area
            type="monotone"
            dataKey="pv"
            stroke="#82ca9d"
            fillOpacity={1}
            fill="url(#colorPv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
