import React from "react";
import PropTypes from "prop-types";
/* Componentes */
import { List } from "@mui/material";

import HistorialLecturasItem from "./HistorialLecturasItem";

const HistorialLecturas = ({ historialLecturas, setModalSerie, modalSerie }) => {
  const mostrarSeries = (lectura) => {
    setModalSerie({
      ...modalSerie,
      series: lectura.series,
      mostrar: true,
      esCaja: true,
      verSeries: true,
    });
  };

  return (
    <List>
      {historialLecturas?.map((serie, index) => (
        <HistorialLecturasItem
          key={index}
          index={index}
          mostrarSeries={mostrarSeries}
          serie={serie}
        />
      ))}
    </List>
  );
};

HistorialLecturas.propTypes = {
  historialLecturas: PropTypes.array.isRequired,
  setModalSerie: PropTypes.func,
  modalSerie: PropTypes.object,
};

export default HistorialLecturas;
