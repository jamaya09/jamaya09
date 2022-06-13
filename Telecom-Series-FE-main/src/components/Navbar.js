import React, { useEffect, useState } from "react";
import { Header } from "@architecture-it/stylesystem/";
import { Box } from "@mui/system";
import { Typography, Breadcrumbs } from "@mui/material";
import { Link } from "react-router-dom";
import { useIsAuthenticated } from "@azure/msal-react";
import { useMsal } from "@azure/msal-react";

import LogoutButton from "./LogoutButton/LogoutButton";
import UsernameCard from "./UsernameCard/UsernameCard";

const Nav = () => {
  const isAuthenticated = useIsAuthenticated();
  const { instance: msalInstance } = useMsal();

  const [username, setUsername] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      setUsername(localStorage.getItem("_current_user").split("@")[0]);
    }
  }, [username, isAuthenticated, msalInstance]);

  if (!isAuthenticated) {
    return <Header />;
  }

  return (
    <Header>
      <div
        style={{
          flexGrow: 1,
          width: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingInline: "var(--spacing-2)",
        }}
      >
        <Box display={{ xs: "none", sm: "block" }} marginX={2}>
          <Breadcrumbs separator=" ">
            <Link to="/">
              <Typography noWrap variant="caption">
                Validación
              </Typography>
            </Link>
            <Link to="/ingresoManual">
              <Typography noWrap variant="caption">
                Ingreso Manual
              </Typography>
            </Link>
            <Link to="/devolucion">
              <Typography noWrap variant="caption">
                Devolucion
              </Typography>
            </Link>
          </Breadcrumbs>
        </Box>
      </div>
      <div
        style={{
          flexGrow: 1,
          width: "15%",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          paddingInline: "var(--spacing-2)",
        }}
      >
        <UsernameCard username={username} />
        <LogoutButton />
      </div>
    </Header>
  );
};

export default Nav;
