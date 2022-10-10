import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { profile_data_raw } from "./data/profileData_raw";

export const getProfileData = createAsyncThunk(
  "data/getProfileData",
  async (__, thunkAPI) => {
    const access_token = thunkAPI.getState().token.token.access_token;
    const res = await axios.get(
      `https://www.strava.com/api/v3/athlete?access_token=${access_token}`
    );
    return res.data;
  }
);

const initialState = {
  profile: profile_data_raw[0],
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
