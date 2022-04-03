import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "../features/stravaData";
import userReducer from "../features/userSlice";
import profileReducer from "../features/profileSlice";

export default configureStore({
  reducer: {
    data: dataReducer,
    user: userReducer,
    profile: profileReducer,
  },
});
