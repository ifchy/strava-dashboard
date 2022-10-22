import { getAuthToken } from "features/auth/authSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const RedirectToken = () => {
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.token.status);
  const navigate = useNavigate();

  useEffect(() => {
    // getRides();
    if (authStatus === "idle") {
      dispatch(getAuthToken());
    }
  }, []);
  if (authStatus === "success") {
    navigate("/");
  }
  return (
    <div className="login">
      {authStatus === "pending" && <h1>LOADING...</h1>}
      {authStatus === "success" && <h1>AUTH TOKEN RETREIVED</h1>}
    </div>
  );
};

export default RedirectToken;
