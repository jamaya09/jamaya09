import React from "react";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";

/* Components */
import { UnidadesTotales } from "../Components/UnidadesTotales";

const InfoRemito = ({ todasLasSeries, unidadesTotales, sku }) => {
  return (
    <Grid container alignItems="center" direction="row" justifyContent="space-evenly">
      <Grid item>
        {todasLasSeries && unidadesTotales && (
          <UnidadesTotales
            className="untotales-text"
            title="Unidades totales: "
            value={unidadesTotales}
          />
        )}
      </Grid>
      <Grid item>{todasLasSeries && <h4 className="sku-text">SKU: {sku}</h4>}</Grid>
    </Grid>
  );
};

InfoRemito.propTypes = {
  todasLasSeries: PropTypes.array,
  unidadesTotales: PropTypes.number,
  sku: PropTypes.string,
};

export default InfoRemito;
