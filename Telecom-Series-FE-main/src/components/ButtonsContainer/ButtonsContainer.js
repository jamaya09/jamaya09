import React from "react";
import PropTypes from "prop-types";
/* Componentes */
import { Button, Grid } from "@mui/material";

const ButtonsContainer = ({ habilitarBotones, cancelForm, handleClose }) => {
  return (
    <Grid container alignItems="center" direction={"row"} justifyContent="center" spacing={2}>
      <Grid item>
        <Button color="error" type="button" variant="outlined" onClick={() => cancelForm()}>
          CANCELAR
        </Button>
      </Grid>
      <Grid item>
        <Button
          color="success"
          disabled={!habilitarBotones}
          type="button"
          variant="outlined"
          onClick={() => handleClose()}
        >
          CERRAR
        </Button>
      </Grid>
    </Grid>
  );
};

ButtonsContainer.propTypes = {
  habilitarBotones: PropTypes.bool.isRequired,
  cancelForm: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default ButtonsContainer;
