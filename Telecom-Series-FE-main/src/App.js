import React, { useState } from "react";
import { StyleSystemProvider } from "@architecture-it/stylesystem";
import CssBaseline from "@mui/material/CssBaseline";
import "../src/css/app.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";

import Navbar from "./components/Navbar";
import Login from "./pages/Login/Login";
import VSM from "./pages/ValidacionSerieMay/vsm";
import Consultas from "./pages/Consultas/consultas";
import IngresoManual from "./pages/IngresoManual";
import { msalConfig } from "./authConfig";
import AuthProvider from "./components/AuthProvider";

const { PrivateRoute, PublicRoute } = AuthProvider;
const msalInstance = new PublicClientApplication(msalConfig);

function App() {
  const [token, setToken] = useState({
    accessToken: null,
    refreshToken: null,
    expireTime: null,
    userName: null,
    permissions: null,
  });

  return (
    <MsalProvider instance={msalInstance}>
      <StyleSystemProvider>
        <CssBaseline />
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
              path="/"
            />

            <Route
              element={
                <PrivateRoute>
                  <VSM />
                </PrivateRoute>
              }
              path="/validaciones"
            />
            <Route
              element={
                <PrivateRoute>
                  <Consultas />
                </PrivateRoute>
              }
              path="/consultas"
            />
            <Route
              element={
                <PrivateRoute>
                  <IngresoManual />
                </PrivateRoute>
              }
              path="/ingresoManual"
            />
          </Routes>
        </BrowserRouter>
      </StyleSystemProvider>
    </MsalProvider>
  );
}

export default App;
