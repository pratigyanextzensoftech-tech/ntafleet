import React, { Suspense, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Loader from "../Layout/Loader";
import { authRoutes } from "./AuthRoutes";
import LayoutRoutes from "../Route/LayoutRoutes";
import Signin from "../Auth/Signin";
import PrivateRoute from "./PrivateRoute";
import { classes } from "../Data/Layouts";
import OtpVerify from "../Auth/OtpVerify";

const Routers = () => {
  const login = useState(JSON.parse(localStorage.getItem("login")))[0];
  const [authenticated, setAuthenticated] = useState(false);
  const defaultLayoutObj = classes.find(
    (item) => Object.values(item).pop(1) === "compact-wrapper"
  );

  useEffect(() => {
    let abortController = new AbortController();
    setAuthenticated(JSON.parse(localStorage.getItem("authenticated")));
    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<PrivateRoute />}>
            {login || authenticated ? (
              <>
                <Route index element={<Navigate to= {"/dashboard"}/>} />
              </>
            ) : null}
            <Route path="/*" element={<LayoutRoutes />} />
          </Route>

          <Route path="login" element={<Signin />} />
          <Route path="verify" element={<OtpVerify />} />

          {authRoutes.map(({ path, Component }, i) => (
            <Route path={path} element={Component} key={i} />
          ))}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Routers;
