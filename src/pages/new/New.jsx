import React, { useState } from "react";
import NavBar from "../../components/navBar/NavBar";
import SideBar from "../../components/sideBar/SideBar";
import "./new.scss";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { grey } from "@mui/material/colors";
import axios from "axios";
import moment from "moment";
import { useContext } from "react";
import { DarkModeContext } from "../../features/context/darkReducer";
import { types } from "./activityTypes";

const New = () => {
  const { darkMode } = useContext(DarkModeContext);

  const [formContents, setFormContents] = useState({
    name: "",
    type: "",
    start_date_local: "",
    elapsed_time: "",
    description: "",
    distance: "",
    trainer: "",
  });
  const [valid, setValid] = useState(true);
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    if (name === "start_date_local") {
      validate(name, value) ? setValid(true) : setValid(false);
    } else if (name === "description") {
      validate(name, value) ? setValid(true) : setValid(false);
    }
    setFormContents({
      ...formContents,
      [name]: value,
    });
  };

  const validate = (name, value) => {
    if (name == "start_date_local") {
      const result = moment(value, "MM/DD/YYYY", true).isValid();
      return result;
    } else if (name == "description") {
      const result = typeof value;
      console.log(result);
      return result;
    }
  };

  const handleChecked = (event) => {
    setFormContents({ ...formContents, trainer: event.target.checked });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const submit = formatData();
    console.log(submit);
    // valid &&
    //   axios
    //     .post(
    //       "https://www.strava.com/api/v3/activities?access_token=a0049b5aabda1974255d565d3757292127db5b2a",
    //       submit
    //     )
    //     .then((response) => console.log(response));
  };

  const formatData = () => {
    const formmatted = {
      name: formContents.name,
      type: formContents.type,
      start_date_local: moment(formContents.start_date_local)
        .add(8, "hours")
        .toISOString(),
      elapsed_time: formContents.elapsed_time * 60,
      description: formContents.description,
      distance: formContents.distance * 1609.34,
      trainer: formContents.trainer,
    };
    return formmatted;
  };
  const activities = types.map((type, index) => {
    return (
      <MenuItem key={index} value={type}>
        {type}
      </MenuItem>
    );
  });
  return (
    <div className="new">
      <SideBar />
      <div className="newContainer">
        <NavBar />
        <div className="content">
          <div className="top">
            <p data-testid="test2">ADD ACTIVITY</p>
          </div>
          <div className="bottom">
            <div className="right">
              <Box
                component="form"
                sx={{
                  multilineColor: darkMode ? "#ffffff" : "red",
                  "& .MuiTextField-root": { m: 1, width: "100%" },
                }}
                noValidate
                autoComplete="off"
              >
                <div className="inputs">
                  <TextField
                    required
                    name="name"
                    id="name"
                    onChange={handleChange}
                    label="Activity Name"
                    className="formText"
                  />
                  <FormControl fullWidth sx={{ m: 1, width: "100%" }}>
                    <InputLabel id="typeLabel">Activity Type</InputLabel>
                    <Select
                      labelId="typeLabel"
                      name="type"
                      value={formContents.type}
                      label="Activty Type"
                      onChange={handleChange}
                      className="formText"
                    >
                      {activities}
                    </Select>
                  </FormControl>
                  {/* <TextField
                    name="type"
                    id="type"
                    onChange={handleChange}
                    label="Activity Type"
                  /> */}
                  <TextField
                    error={valid ? false : true}
                    name="start_date_local"
                    id="start_date_local"
                    onChange={handleChange}
                    label="Activity Start Date (MM/DD/YYYY)"
                    helperText={valid ? "" : "Must be in MM/DD/YYYY format"}
                    className="formText"
                  />
                  <TextField
                    name="elapsed_time"
                    id="elapsed_time"
                    label="Elapsed Time (Minutes)"
                    onChange={handleChange}
                    className="formText"
                  />
                  <TextField
                    name="description"
                    id="description"
                    onChange={handleChange}
                    label="Activity Description"
                    className="formText"
                  />
                  <TextField
                    name="distance"
                    id="distance"
                    onChange={handleChange}
                    label="Distance (Miles)"
                    className="formText"
                  />
                  {!valid && (
                    <div className="formError">
                      There is a problem with one of your entries!
                    </div>
                  )}
                  <div className="save">
                    <FormControlLabel
                      name="trainer"
                      id="trainer"
                      onClick={handleChecked}
                      control={
                        <Checkbox
                          sx={{
                            color: grey[800],
                            "&.Mui-checked": {
                              color: grey[600],
                            },
                          }}
                        />
                      }
                      label="Trainer?"
                    />
                    <Button
                      type="submit"
                      onClick={handleSubmit}
                      variant="contained"
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </Box>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
