import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import moment from "moment";

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

export const getProfileData = createAsyncThunk(
  "data/getProfileData",
  async () => {
    const res = await axios.get(
      `https://www.strava.com/api/v3/athlete?access_token=a8f9a52858d2b70c361698b6ae730e1b26312de4`
    );
    return res.data;
  }
);

const initialState = {
  profile: [],
  status: "idle",
  error: null,
};

export const profileSlice = createSlice({
  name: "profileData",
  initialState,
  reducers: {},
  extraReducers: {
    [getProfileData.pending]: (state) => {
      state.status = "pending";
      state.error = false;
    },
    [getProfileData.fulfilled]: (state, action) => {
      state.status = "success";
      state.profile = action.payload;
    },
    [getProfileData.rejected]: (state) => {
      state.status = "error";
      state.error = true;
    },
  },
});

export default profileSlice.reducer;
export const profileData = (state) => state.profile;
