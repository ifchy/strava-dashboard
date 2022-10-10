import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "../features/stravaData";
import userReducer from "../features/userSlice";
import profileReducer from "../features/profileSlice";
import authReducer from "../features/auth/authSlice";

export default configureStore({
  reducer: {
    data: dataReducer,
    user: userReducer,
    profile: profileReducer,
    token: authReducer,
  },
});
