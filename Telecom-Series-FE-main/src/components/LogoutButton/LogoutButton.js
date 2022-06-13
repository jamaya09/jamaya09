import React from "react";
import { Box } from "@mui/system";
import { Typography, Button } from "@mui/material";
import { useMsal } from "@azure/msal-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut } from "@fortawesome/pro-light-svg-icons";

const LogoutButton = () => {
  const { instance: msalInstance } = useMsal();

  const handleLogout = () => {
    msalInstance.logoutPopup().then((_) => {
      window.location.origin;
    });
  };

  return (
    <Button onClick={handleLogout}>
      <Box alignItems={"center"} display="flex" gap="var(--spacing-1)">
        <FontAwesomeIcon color="var(--primary)" icon={faSignOut} size="1x" />
        <Typography variant="caption">Cerrar Sesión</Typography>
      </Box>
    </Button>
  );
};

export default LogoutButton;
