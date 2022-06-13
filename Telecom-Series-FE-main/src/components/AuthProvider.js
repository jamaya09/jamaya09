import React from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useIsAuthenticated } from "@azure/msal-react";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useIsAuthenticated();

  return <React.Fragment>{isAuthenticated ? children : <Navigate to="/" />}</React.Fragment>;
};

const PublicRoute = ({ children }) => {
  const isAuthenticated = useIsAuthenticated();

  return (
    <React.Fragment>{isAuthenticated ? <Navigate to="/validaciones" /> : children}</React.Fragment>
  );
};

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool,
  children: PropTypes.node,
};

PublicRoute.propTypes = {
  isAuthenticated: PropTypes.bool,
  children: PropTypes.node,
};

const AuthProvider = { PrivateRoute, PublicRoute };

export default AuthProvider;
