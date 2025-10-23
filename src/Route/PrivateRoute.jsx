import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const login = JSON.parse(localStorage.getItem("login"));
  const authenticated = JSON.parse(localStorage.getItem("authenticated"));

  return login || authenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
