import React from "react";
import Chart from "../../components/chart/Chart";
import Featured from "../../components/featuredChart/Featured";
import NavBar from "../../components/navBar/NavBar";
import SideBar from "../../components/sideBar/SideBar";
import TableList from "../../components/Table/TableList";
import Widget from "../../components/widgets/Widget";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useNavigate } from "react-router-dom";
import "./home.scss";
const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="home">
      <SideBar />
      <div className="home-container">
        <NavBar />
        <div className="widgetContainer">
          <div className="titleBlock">This Month vs. Last Month</div>
          <div className="widgets">
            <Widget type="workouts" />
            <Widget type="time" />
            <Widget type="distance" />
            <Widget type="heartrate" />
          </div>
        </div>
        <div className="charts">
          <Featured />
          <Chart />
        </div>
        <div className="listContainer">
          <div className="listTitle">
            <span>Past Workouts</span>
            <span htmlFor="addWorkout" className="addWorkout">
              Add Workout
              <AddBoxIcon
                id="addWorkout"
                onClick={() => navigate("/activities/new")}
                aria-label="addWorkout"
                data-testid="test"
              />
            </span>
          </div>
          <TableList />
        </div>
      </div>
    </div>
  );
};

export default Home;
