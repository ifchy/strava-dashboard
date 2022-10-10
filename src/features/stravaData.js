import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import moment from "moment";
import { data_raw } from "./data/stravaData_raw";

export const getStravaData = createAsyncThunk(
  "data/getData",
  async (__, thunkAPI) => {
    const access_token = thunkAPI.getState().token.token.access_token;
    const sixMonthsAgo = moment().subtract(6, "months").unix();
    const today = moment().unix();
    // const token = await getAccessToken();
    const res = await axios.get(
      `https://www.strava.com/api/v3/athlete/activities?access_token=${access_token}&per_page=100&after=${sixMonthsAgo}&before=${today}`
    );
    return res.data;
  }
);

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
