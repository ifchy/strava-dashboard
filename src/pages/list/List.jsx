import DataTable from "../../components/datatable/DataTable";
import NavBar from "../../components/navBar/NavBar";
import SideBar from "../../components/sideBar/SideBar";
import "./list.scss";
const Home = () => {
  return (
    <div className="list">
      <SideBar />
      <div className="listContainer">
        <NavBar />
        <DataTable />
      </div>
    </div>
  );
};

export default Home;
