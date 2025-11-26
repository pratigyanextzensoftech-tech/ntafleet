import React, { Suspense, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Loader from "../Layout/Loader";
import { authRoutes } from "./AuthRoutes";
import LayoutRoutes from "../Route/LayoutRoutes";
import Signin from "../Auth/Signin";
import PrivateRoute from "./PrivateRoute";
import OtpVerify from "../Auth/OtpVerify";

const Routers = () => {
  const login = JSON.parse(sessionStorage.getItem("login"));
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    setAuthenticated(JSON.parse(sessionStorage.getItem("authenticated")));
  }, []);

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* ✅ Public Routes */}
          <Route path="/login" element={<Signin />} />
          <Route path="/verify" element={<OtpVerify />} />
          {authRoutes.map(({ path, Component }, i) => (
            <Route key={i} path={path} element={Component} />
          ))}

          {/* ✅ Private Routes */}
         <Route element={<PrivateRoute />}>
  {/* All main routes */}
  <Route path="/*" element={<LayoutRoutes />} />
</Route>

          {/* fallback route */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Routers;
