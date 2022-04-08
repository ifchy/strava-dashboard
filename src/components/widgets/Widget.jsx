import "./Widget.scss";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import TimerIcon from "@mui/icons-material/Timer";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import StraightenIcon from "@mui/icons-material/Straighten";
import { allData } from "../../features/stravaData";
import { useSelector } from "react-redux";
import moment from "moment";

const Widget = ({ type }) => {
  const { data } = useSelector(allData);

  const oneMonthAgo = moment().startOf("month");
  const twoMonthsAgo = moment().startOf("month").add(-1, "months");
  const oneMonthData = data.filter((ride) =>
    moment(ride.start_date).isAfter(oneMonthAgo)
  );
  const twoMonthData = data.filter((ride) =>
    moment(ride.start_date).isBetween(twoMonthsAgo, oneMonthAgo)
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
        workouts:
          oneMonthData.length === 0 ? "No Activities!" : oneMonthData.length,
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
              border: "1px solid rgba(0, 133, 0, 0.25)",
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
        workouts:
          (oneMonthSeries.elapsedTime === 0) & (oneMonthData.length === 0)
            ? "No Activities!"
            : moment.utc(oneMonthSeries.elapsedTime * 1000).format("HH:mm:ss"),
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
              border: "1px solid rgba(218, 165, 32, 0.25)",
            }}
          />
        ),
        change: Math.round(
          Math.abs(
            (oneMonthSeries.elapsedTime - twoMonthSeries.elapsedTime) /
              twoMonthSeries.elapsedTime
          ) * 100
        ),
      };
      break;
    case "distance":
      widgetCard = {
        title: "DISTANCE",
        workouts:
          oneMonthSeries.distance === 0
            ? "No Activities!"
            : Math.floor(oneMonthSeries.distance * 0.00062137),
        className:
          oneMonthSeries.distance - twoMonthSeries.distance >= 0
            ? "percentage positive"
            : "percentage negative",
        icon: (
          <StraightenIcon
            className="icon"
            style={{
              color: "rgba(0, 0, 200, 1)",
              backgroundColor: "rgba(0, 0, 200, 0.25)",
              border: "1px solid rgba(0, 0, 200, 0.25)",
            }}
          />
        ),
        change:
          Math.abs(
            Math.round(
              (oneMonthSeries.distance * 0.00062137 -
                twoMonthSeries.distance * 0.00062137) /
                (twoMonthSeries.distance * 0.00062137)
            )
          ) * 100,
      };
      break;
    case "heartrate":
      widgetCard = {
        title: "HEART RATE",
        workouts:
          oneMonthData.length === 0
            ? "No Activities!"
            : isNaN(
                Math.floor(
                  oneMonthSeries.avgHR / oneMonthData.length -
                    twoMonthSeries.avgHR / twoMonthData.length
                )
              ) && "Not Available",
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
              border: "1px solid rgba(255, 0, 0, 0.25)",
            }}
          />
        ),
        change: oneMonthSeries.avgHR
          ? Math.abs(
              (oneMonthSeries.avgHR - twoMonthSeries.avgHR) /
                twoMonthSeries.avgHR
            ) * 100
          : "",
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
