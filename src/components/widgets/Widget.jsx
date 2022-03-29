import "./Widget.scss";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import PersonIcon from "@mui/icons-material/Person";

const Widget = ({ type }) => {
  let data;

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
        icon: <PersonIcon className="icon" />,
      };
      break;
    case "order":
      data = { title: "ORDERS", isMoney: false };
      break;
    case "earnings":
      data = { title: "EARNINGS", isMoney: false };
      break;
    case "balance":
      data = { title: "BALANCE", isMoney: false };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">11111</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpOutlinedIcon />
          10%
        </div>
        <div className="icons">{data.icon}</div>
      </div>
    </div>
  );
};

export default Widget;
