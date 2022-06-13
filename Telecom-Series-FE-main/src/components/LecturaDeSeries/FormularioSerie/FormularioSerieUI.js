import React from "react";
import PropTypes from "prop-types";
import { Grid, TextField } from "@mui/material";

const FormularioSerieUI = ({ isDisabled, handleSubmit }) => {
  return (
    <Grid alignItems="center" direction="row" justifyContent="center">
      <Grid item xs={12}>
        <TextField
          className="form-control"
          disabled={isDisabled}
          id="inputSeries"
          label="LECTURA"
          type="text"
          variant="outlined"
          onKeyUp={handleSubmit}
        />
      </Grid>
    </Grid>
  );
};

FormularioSerieUI.propTypes = {
  isDisabled: PropTypes.bool.isRequired,
  valorLectura: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default FormularioSerieUI;
