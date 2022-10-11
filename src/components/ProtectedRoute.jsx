import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const authStatus = useSelector((state) => state.token.status);
  if (authStatus === "idle") {
    return <Navigate to="/login" replace />;
  }
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
