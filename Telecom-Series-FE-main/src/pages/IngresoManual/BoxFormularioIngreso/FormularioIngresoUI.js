import React from "react";
import PropTypes from "prop-types";
import { Grid, MenuItem, TextField, Select, FormControl, InputLabel, Button } from "@mui/material";

import { propietarios } from "../../../services/localServices";

const FormularioIngresoUI = ({ formik, isDisabled }) => {
  let tiposDeSeries = Object.keys(propietarios[0].tiposDeSeries);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid
        container
        alignItems="center"
        direction="row"
        justifyContent="center"
        marginBottom={5}
        padding={5}
      >
        <Grid item md={5} sm={6}>
          <TextField
            fullWidth
            disabled={!isDisabled}
            label="Remito"
            name="remitoingreso"
            value={formik.values.remitoingreso}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.touched.remitoingreso && formik.errors.remitoingreso ? (
            <div>{formik.errors.remitoingreso}</div>
          ) : null}
        </Grid>
        <Grid item md={5} sm={6}>
          <TextField
            fullWidth
            disabled={!isDisabled}
            label="Gtin"
            name="gtin"
            value={formik.values.gtin}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.touched.gtin && formik.errors.gtin ? <div>{formik.errors.gtin}</div> : null}
        </Grid>
        <Grid item md={5} sm={6}>
          <TextField
            fullWidth
            disabled={!isDisabled}
            label="Unidades totales"
            name="unidadestotales"
            value={formik.values.unidadestotales}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.touched.unidadestotales && formik.errors.unidadestotales ? (
            <div>{formik.errors.unidadestotales}</div>
          ) : null}
        </Grid>
        <Grid item md={5} sm={6}>
          <TextField
            fullWidth
            disabled={!isDisabled}
            label="SKU"
            name="sku"
            value={formik.values.sku}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.touched.sku && formik.errors.sku ? <div>{formik.errors.sku}</div> : null}
        </Grid>
        <Grid item md={5} sm={6} xs={10}>
          <FormControl fullWidth>
            <InputLabel id="tiposDeSeries">Tipos de series</InputLabel>
            <Select
              fullWidth
              disabled={!isDisabled}
              id="tiposDeSeries"
              label="Tipos de series"
              labelId="tiposDeSeries"
              name="tipoDeSerie"
              value={formik.values.tipoDeSerie}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            >
              {tiposDeSeries.map((tipoDeSerie) => (
                <MenuItem key={tipoDeSerie} value={propietarios[0].tiposDeSeries[tipoDeSerie]}>
                  {tipoDeSerie}
                </MenuItem>
              ))}
            </Select>
            {formik.touched.tipoDeSerie && formik.errors.tipoDeSerie ? (
              <div>{formik.errors.tipoDeSerie}</div>
            ) : null}
          </FormControl>
        </Grid>
        <Grid container item justifyContent={"center"} md={5} sm={12}>
          <Button size="large" type="submit" variant="contained">
            CONFIRMAR
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

FormularioIngresoUI.propTypes = {
  formik: PropTypes.object,
  isDisabled: PropTypes.bool,
};

export default FormularioIngresoUI;
