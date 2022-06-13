import React from "react";
import PropTypes from "prop-types";
/* Componentes */
import { ListItem, ListItemText } from "@mui/material";

const HistorialLecturasItem = ({ serie, mostrarSeries }) => {
  return (
    <ListItem>
      {serie.esCaja ? (
        <ListItemText
          className="primary"
          primary={serie.valor}
          onClick={() => mostrarSeries(serie)}
        />
      ) : (
        <ListItemText className="secondary" primary={serie.valor} />
      )}
    </ListItem>
  );
};

HistorialLecturasItem.propTypes = {
  serie: PropTypes.object.isRequired,
  mostrarSeries: PropTypes.func.isRequired,
};

export default HistorialLecturasItem;
