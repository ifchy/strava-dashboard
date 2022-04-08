import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import moment from "moment";

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
    `https://www.strava.com/api/v3/athlete/activities?access_token=1629be10d3d2c15f361724718eaea08625ab4889&per_page=100&after=${sixMonthsAgo}&before=${today}`
  );
  return res.data;
});

const initialState = {
  data: [],
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
