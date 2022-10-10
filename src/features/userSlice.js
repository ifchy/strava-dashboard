import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { user_data_raw } from "./data/userData_raw";

export const getUserData = createAsyncThunk(
  "data/getUserData",
  async (__, thunkAPI) => {
    const access_token = thunkAPI.getState().token.token.access_token;
    const res = await axios.get(
      `https://www.strava.com/api/v3/athletes/762309/stats?access_token=${access_token}`
    );
    return res.data;
  }
);

const initialState = {
  user: user_data_raw[0],
  status: "idle",
  error: null,
};

export const userSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {},
  extraReducers: {
    [getUserData.pending]: (state) => {
      state.status = "pending";
      state.error = false;
    },
    [getUserData.fulfilled]: (state, action) => {
      state.status = "success";
      state.user = action.payload;
    },
    [getUserData.rejected]: (state) => {
      state.status = "error";
      state.error = true;
    },
  },
});

export default userSlice.reducer;
export const userData = (state) => state.user;
