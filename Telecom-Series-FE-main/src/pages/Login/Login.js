import { MainCard } from "@architecture-it/stylesystem";
import React from "react";
import { useMsal } from "@azure/msal-react";

import { loginRequest } from "../../authConfig";

import styles from "./login.module.css";

const Login = () => {
  const { instance: msalInstance } = useMsal();

  const handleLogin = () => {
    msalInstance.loginPopup(loginRequest).then((_) => {
      let username = msalInstance.getAllAccounts()[0].idTokenClaims["signInNames.emailAddress"];

      localStorage.setItem("_current_user", username);
    });
  };

  return (
    <section className={styles.loginContainer}>
      <MainCard
        buttonText="INGRESAR"
        imageProps={{
          alt: "Ingresar",
          src: "https://componentesui.blob.core.windows.net/recursos/ilustraciones-gla/envios-personales.svg",
        }}
        principalText="Te damos la bienvenida a nuestra APP"
        secondaryText="Para continuar primero debes loguearte"
        type="left"
        onClick={() => handleLogin()}
      />
    </section>
  );
};

export default Login;
