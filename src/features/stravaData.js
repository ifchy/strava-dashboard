import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import moment from "moment";
import { data_raw } from "./data/stravaData_raw";

const getAccessToken = async (req, res) => {
  const headers = {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
  };

  const body = JSON.stringify({
    client_id: process.env.REACT_APP_STRAVA_CLIENT_ID,
    client_secret: process.env.REACT_APP_STRAVA_SECRET,
    refresh_token: process.env.REACT_APP_STRAVA_REFRESH_TOKEN,
    grant_type: "refresh_token",
  });
  const reauthToken = await fetch("https://www.strava.com/oauth/token", {
    method: "post",
    headers,
    body,
  });

  const { access_token } = await reauthToken.json();
  return access_token;
};
export const getStravaData = createAsyncThunk("data/getData", async () => {
  const sixMonthsAgo = moment().subtract(6, "months").unix();
  const today = moment().unix();
  // const token = await getAccessToken();
  const res = await axios.get(
    `https://www.strava.com/api/v3/athlete/activities?access_token=3819e8601574e55e59888263e78cce6b7186ae89&per_page=100&after=${sixMonthsAgo}&before=${today}`
  );
  return res.data;
});

const initialState = {
  data: data_raw,
  status: "idle",
  error: null,
};

export const dataSlice = createSlice({
  name: "stravaData",
  initialState,
  reducers: {
    getRefreshToken: {},
  },
  extraReducers: {
    [getStravaData.pending]: (state) => {
      state.status = "pending";
      state.error = false;
    },
    [getStravaData.fulfilled]: (state, action) => {
      state.status = "success";
      state.data = action.payload;
    },
    [getStravaData.rejected]: (state) => {
      state.status = "error";
      state.error = true;
    },
  },
});

export default dataSlice.reducer;
export const allData = (state) => state.data;
