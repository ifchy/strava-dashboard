import "./Widget.scss";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import TimerIcon from "@mui/icons-material/Timer";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import StraightenIcon from "@mui/icons-material/Straighten";
import { getStravaData, allData } from "../../features/stravaData";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { red } from "@mui/material/colors";

const Widget = ({ type }) => {
  const dispatch = useDispatch();
  const dataStatus = useSelector((state) => state.data.status);
  const { data } = useSelector(allData);

  const oneMonthAgo = moment().add(-1, "months");
  const twoMonthsAgo = moment().add(-2, "months");
  const oneMonthData = data.filter((ride) =>
    moment(ride.start_date).isAfter(oneMonthAgo)
  );
  const twoMonthData = data.filter((ride) =>
    moment(ride.start_date).isAfter(twoMonthsAgo)
  );
  const oneMonthSeries = oneMonthData.reduce(
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
  );
  const twoMonthSeries = twoMonthData.reduce(
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
  );

  // elapsed_time > 3600
  //   ? moment.utc(elapsed_time * 1000).format("HH:mm:ss")
  //   : moment.utc(elapsed_time * 1000).format("mm:ss");

  let widgetCard;

  switch (type) {
    case "workouts":
      widgetCard = {
        title: "WORKOUTS",
        workouts: oneMonthData.length,
        className:
          oneMonthData.length - twoMonthData.length > 0
            ? "percentage positive"
            : "percentage negative",
        icon: (
          <DirectionsRunIcon
            className="icon"
            style={{
              color: "rgba(0, 133, 0, 1)",
              backgroundColor: "rgba(0, 133, 0, 0.25)",
            }}
          />
        ),
        change:
          Math.abs(
            (oneMonthData.length - twoMonthData.length) / twoMonthData.length
          ) * 100,
      };
      break;
    case "time":
      widgetCard = {
        title: "TIME",
        workouts: moment
          .utc(oneMonthSeries.elapsedTime * 1000)
          .format("HH:mm:ss"),
        className:
          oneMonthSeries.elapsedTime - twoMonthSeries.elapsedTime > 0
            ? "percentage positive"
            : "percentage negative",
        icon: (
          <TimerIcon
            className="icon"
            style={{
              color: "rgb(218, 165, 32)",
              backgroundColor: "rgba(218, 165, 32, 0.25)",
            }}
          />
        ),
        change:
          Math.abs(
            (oneMonthSeries.elapsedTime - twoMonthSeries.elapsedTime) /
              twoMonthSeries.elapsedTime
          ) * 100,
      };
      break;
    case "distance":
      widgetCard = {
        title: "DISTANCE",
        workouts: oneMonthSeries.distance,
        className:
          oneMonthSeries.distance - twoMonthSeries.distance > 0
            ? "percentage positive"
            : "percentage negative",
        icon: (
          <StraightenIcon
            className="icon"
            style={{
              color: "rgba(0, 0, 200, 1)",
              backgroundColor: "rgba(0, 0, 200, 0.25)",
            }}
          />
        ),
        change:
          Math.abs(
            (oneMonthSeries.distance - twoMonthSeries.distance) /
              twoMonthSeries.distance
          ) * 100,
      };
      break;
    case "heartrate":
      widgetCard = {
        title: "HEART RATE",
        workouts: Math.floor(oneMonthSeries.avgHR / twoMonthSeries.length),
        className:
          oneMonthSeries.avgHR - twoMonthSeries.avgHR > 0
            ? "percentage positive"
            : "percentage negative",
        icon: (
          <MonitorHeartIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.25)",
            }}
          />
        ),
        change:
          Math.abs(
            (oneMonthSeries.avgHR - twoMonthSeries.avgHR) / twoMonthSeries.avgHR
          ) * 100,
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{widgetCard.title}</span>
        <span className="counter">{widgetCard.workouts}</span>
      </div>
      <div className="right">
        <div className={widgetCard.className}>
          {widgetCard.className === "percentage positive" ? (
            <KeyboardArrowUpOutlinedIcon />
          ) : (
            <KeyboardArrowDownOutlinedIcon />
          )}
          {widgetCard.change}%
        </div>
        <div className="icons">{widgetCard.icon}</div>
      </div>
    </div>
  );
};

export default Widget;
