import React, { useState } from "react";
import NavBar from "../../components/navBar/NavBar";
import SideBar from "../../components/sideBar/SideBar";
import "./new.scss";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";
import moment from "moment";

const New = () => {
  const [formContents, setFormContents] = useState({
    name: "",
    type: "",
    start_date_local: "",
    elapsed_time: "",
    description: "",
    distance: "",
    trainer: "",
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormContents({
      ...formContents,
      [name]: value,
    });
  };

  const handleChecked = (event) => {
    setFormContents({ ...formContents, trainer: event.target.checked });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const submit = formatData();
    // console.log(submit);
    axios
      .post(
        "https://www.strava.com/api/v3/activities?access_token=cc6f7be7e41f015efd7e1ec9d56f0478c686823b",
        submit
      )
      .then((response) => console.log(response));
    // setSubmitted((submitted) => !submitted);
    // setFormContents({ title: "", content: "", author: "" });
    // setTimeout(() => {
    //   setSubmitted((submitted) => !submitted);
    // }, 2000);
  };

  const formatData = () => {
    const formmatted = {
      name: formContents.name,
      type: formContents.type,
      start_date_local: moment(
        formContents.start_date_local,
        "MM/DD/YYYY"
      ).toISOString(),
      elapsed_time: formContents.elapsed_time * 60,
      description: formContents.description,
      distance: formContents.distance * 1609.34,
      trainer: formContents.trainer,
    };
    return formmatted;
  };
  return (
    <div className="new">
      <SideBar />
      <div className="newContainer">
        <NavBar />
        <div className="content">
          <div className="top">
            <p>ADD ACTIVITY</p>
          </div>
          <div className="bottom">
            <div className="right">
              <Box
                component="form"
                sx={{
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
                  />
                  <TextField
                    name="type"
                    id="type"
                    onChange={handleChange}
                    label="Activity Type"
                  />
                  <TextField
                    name="start_date_local"
                    id="start_date_local"
                    onChange={handleChange}
                    label="Activity Start Date (MM/DD/YYY)"
                  />
                  <TextField
                    name="elapsed_time"
                    id="elapsed_time"
                    label="Elapsed Time (Minutes)"
                    onChange={handleChange}
                  />
                  <TextField
                    name="description"
                    id="description"
                    onChange={handleChange}
                    label="Activity Description"
                  />
                  <TextField
                    name="distance"
                    id="distance"
                    onChange={handleChange}
                    label="Distance"
                  />
                  <div className="save">
                    <FormControlLabel
                      name="trainer"
                      id="trainer"
                      onClick={handleChecked}
                      control={<Checkbox />}
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
