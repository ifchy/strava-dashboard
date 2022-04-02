import React from "react";
import Chart from "../../components/chart/Chart";
import Featured from "../../components/featuredChart/Featured";
import NavBar from "../../components/navBar/NavBar";
import SideBar from "../../components/sideBar/SideBar";
import TableList from "../../components/Table/TableList";
import Widget from "../../components/widgets/Widget";
import "./home.scss";
const Home = () => {
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
          <div className="listTitle">Past Workouts</div>
          <TableList />
        </div>
      </div>
    </div>
  );
};

export default Home;
