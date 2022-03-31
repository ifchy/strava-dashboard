import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getStravaData = createAsyncThunk("data/getData", async () => {
  const res = await axios.get(
    "https://www.strava.com/api/v3/athlete/activities?access_token=0927ef28fcd04ef4427827c60df63e14e77b5684&per_page=50"
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
