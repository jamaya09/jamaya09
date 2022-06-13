/* eslint-disable react/prop-types */
import { Grid, Button, TextField } from "@mui/material";
import React from "react";

const Formularioremitoui = ({ formik }) => {
  return (
    <form className="vsm-form pt-5" id="formulario-remito" onSubmit={formik.handleSubmit}>
      <Grid container alignItems="center" direction="row" justifyContent="center" spacing={0}>
        <Grid item>
          <TextField
            className="form-control"
            id="remito"
            label="REMITO"
            name="remito"
            type="text"
            value={formik.values.remito}
            variant="outlined"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.touched.remito && formik.errors.remito ? <div>{formik.errors.remito}</div> : null}
        </Grid>
        <Grid item>
          <TextField
            className="form-control"
            id="gtin"
            label="GTIN"
            name="gtin"
            type="text"
            value={formik.values.gtin}
            variant="outlined"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.touched.gtin && formik.errors.gtin ? <div>{formik.errors.gtin}</div> : null}
        </Grid>
      </Grid>
      <Grid container align="center" justifyContent="center">
        <Grid item>
          <Button color="secondary" variant="contained" onClick={() => formik.resetForm()}>
            RESET
          </Button>
        </Grid>
        <Grid item>
          <Button color="primary" type="submit" variant="contained">
            BUSCAR
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default Formularioremitoui;
