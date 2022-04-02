import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import moment from "moment";

export const getStravaData = createAsyncThunk("data/getData", async () => {
  // const getAccessToken = () => {
  //   const headers = {
  //     Accept: "application/json, text/plain, */*",
  //     "Content-Type": "application/json",
  //   };

  //   const body = JSON.stringify({
  //     client_id: process.env.STRAVA_CLIENT_ID,
  //     client_secret: process.env.STRAVA_SECRET,
  //     refresh_token: process.env.STRAVA_REFRESH_TOKEN,
  //     grant_type: "refresh_token",
  //   });

  //   const reauthToken = await fetch("https://www.strava.com/oauth/token", {
  //     method: "post",
  //     headers,
  //     body,
  //   });

  //   const { access_token } = await reauthToken.json()
  //   return access_token
  // }

  const sixMonthsAgo = moment().subtract(6, "months").unix();
  const today = moment().unix();
  const res = await axios.get(
    `https://www.strava.com/api/v3/athlete/activities?access_token=645937f93b3c693e5500b4c09c42e4bb9c77af0a&per_page=100&after=${sixMonthsAgo}&before=${today}`
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
  reducers: {},
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
