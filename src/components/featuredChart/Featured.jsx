import "./Featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Featured = () => {
  return (
    <div className="featured">
      <div className="top">
        <div className="title">Total Revenue</div>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar value={70} text={"70%"} strokeWidth="5" />
        </div>
        <p className="title">Total sales made today</p>
        <p className="amount">$420</p>
        <p className="description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">
              Target
              <div className="itemResult negative">
                <KeyboardArrowDownOutlinedIcon fontSize="small" />
                <div className="resultAmount">$12</div>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">
              Last Week
              <div className="itemResult positive">
                <KeyboardArrowUpOutlinedIcon fontSize="small" />
                <div className="resultAmount">$12</div>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">
              Last Month
              <div className="itemResult negative">
                <KeyboardArrowDownOutlinedIcon fontSize="small" />
                <div className="resultAmount">$12</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
