import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { routes } from "./Routes";
import AppLayout from "../Layout/Layout";

const LayoutRoutes = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        {/* Default redirect when logged in */}
        <Route index element={<Navigate to="/dashboard" replace />} />
        {routes.map(({ path, Component }, i) => (
          <Route key={i} path={path} element={Component} />
        ))}
      </Route>
    </Routes>
  );
};

export default LayoutRoutes;
