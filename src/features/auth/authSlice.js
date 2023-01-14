import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const cleanUpAuthToken = (str) => {
  return str.split("&")[1].slice(5);
};

const testAuthGetter = async (authTok) => {
  try {
    const response = await axios.post(
      `https://www.strava.com/api/v3/oauth/token?client_id=80161&client_secret=9ecaf49393024b2e29790ebdbf44c55e963d922d&code=${authTok}&grant_type=authorization_code`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const getAuthToken = createAsyncThunk("data/getAuthToken", async () => {
  const authTok = cleanUpAuthToken(window.location.search);
  const tokens = await testAuthGetter(authTok);
  //   const accessToken = tokens.access_token;
  return tokens;
  //   const res = await axios.get(
  //     `https://www.strava.com/api/v3/athlete?access_token=1957e24a146cbce58b3fc3325fe0bd29bd69f9ef`
  //   );
  //   return res.data;
});

const initialState = {
  token: null,
  status: "idle",
  error: null,
};

export const authSlice = createSlice({
  name: "AuthToken",
  initialState,
  reducers: {},
  extraReducers: {
    [getAuthToken.pending]: (state) => {
      state.status = "pending";
      state.error = false;
    },
    [getAuthToken.fulfilled]: (state, action) => {
      state.status = "success";
      state.token = action.payload;
    },
    [getAuthToken.rejected]: (state) => {
      state.status = "error";
      state.error = true;
    },
  },
});

export default authSlice.reducer;
export const authToken = (state) => state.accessToken;
