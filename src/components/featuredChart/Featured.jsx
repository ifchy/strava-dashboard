import "./Featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "react-circular-progressbar/dist/styles.css";
import { getStravaData, allData } from "../../features/stravaData";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { useState } from "react";
import ReactTooltip from "react-tooltip";

const Featured = () => {
  const { data } = useSelector(allData);
  const rendered = data.map((ride, index) => {
    const { start_date, type, elapsed_time, distance, average_heartrate, id } =
      ride;
    const final = {
      date: moment(start_date).format("YYYY-MM-DD"),
      total: elapsed_time,
      details: [{ type, distance, id }],
    };
    return final;
  });

  const months = {
    today: moment().format("YYYY-MM-DD"),
    oneMonthAgo: moment().add(-1, "months").format("YYYY-MM-DD"),
    twoMonthAgo: moment().add(-2, "months").format("YYYY-MM-DD"),
    threeMonthAgo: moment().add(-3, "months").format("YYYY-MM-DD"),
    fourMonthAgo: moment().add(-4, "months").format("YYYY-MM-DD"),
    fiveMonthAgo: moment().add(-5, "months").format("YYYY-MM-DD"),
    sixMonthAgo: moment().add(-6, "months").format("YYYY-MM-DD"),
  };

  const [metric, setMetric] = useState(months.today);

  const handleChange = (e) => {
    setMetric(e.target.value);
    console.log(metric);
  };

  return (
    <div className="featured">
      <div className="top">
        <div className="title">Workouts for Month:</div>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="heatCal">
          <CalendarHeatmap
            startDate={metric}
            endDate={moment(metric).add(1, "months")}
            values={rendered}
            showWeekdayLabels={true}
            horizontal={false}
            tooltipDataAttrs={(value) => {
              return { "data-tip": moment(value.date).format("ddd MMM D") };
            }}
          />
          <ReactTooltip />
        </div>
        <div className="selectorMonth">
          <select value={metric} onChange={handleChange}>
            <option selected value={months.today}>
              {months.today}
            </option>
            <option value={months.oneMonthAgo}>{months.oneMonthAgo}</option>
            <option value={months.twoMonthAgo}>{months.twoMonthAgo}</option>
            <option value={months.threeMonthAgo}>{months.threeMonthAgo}</option>
            <option value={months.fourMonthAgo}>{months.fourMonthAgo}</option>
            <option value={months.fiveMonthAgo}>{months.fiveMonthAgo}</option>
            <option value={months.sixMonthAgo}>{months.sixMonthAgo}</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Featured;
