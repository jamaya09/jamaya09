import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import PropTypes from "prop-types";

import SerieModal from "../SerieModal";

import styles from "./historial.module.css";
import FormularioSerie from "./FormularioSerie/FormularioSerie";
import HistorialLecturas from "./HistorialLecturas/HistorialLecturas";

const LecturaDeSeries = ({
  isDisabled = false,
  setIsDisabled = null,
  todasLasSeries,
  cajas,
  unidades,
  unidadesTotales,
  cajasAbiertas,
  setCajasAbiertas,
  setCajas,
  mostrarLector,
  vista,
  setHabilitarBotones,
  setIngreso,
  ingreso,
}) => {
  const [historialLecturas, setHistorialLecturas] = useState({
    historial: [],
    seriesLeidas: [],
  });
  const [lectura, setLectura] = useState({
    valor: "",
    esCaja: false,
    series: [],
  });
  const [modalSerie, setModalSerie] = useState({
    mostrar: false,
    contenido: "",
    esError: false,
    mensajeError: "",
  });

  useEffect(() => {
    if (
      (historialLecturas.seriesLeidas.length >= unidadesTotales && unidadesTotales != 0) ||
      (historialLecturas.historial.length >= unidadesTotales && unidadesTotales != 0)
    ) {
      setModalSerie({
        ...modalSerie,
        mostrar: true,
        contenido: "",
        esError: true,
        mensajeError: "Lecturas completas",
      });
      setIsDisabled(true);
      setHabilitarBotones(true);
    }
    if (vista === "ingresoManual") {
      if (ingreso.series !== undefined && historialLecturas.historial[0]) {
        setIngreso({
          ...ingreso,
          series: [...ingreso.series, historialLecturas.historial[0].valor],
        });
      }
    }
  }, [historialLecturas]);

  useEffect(() => {
    if (!mostrarLector) {
      setHistorialLecturas({
        historial: [],
        seriesLeidas: [],
      });
      setLectura({
        valor: "",
        esCaja: false,
        series: [],
      });
    }
  }, [mostrarLector]);

  return (
    <div className={styles.lecturas__container}>
      <Grid container alignItems="center" justifyContent="space-evenly">
        <FormularioSerie
          cajas={cajas}
          cajasAbiertas={cajasAbiertas}
          historialLecturas={historialLecturas}
          ingreso={ingreso}
          isDisabled={isDisabled}
          lectura={lectura}
          modalSerie={modalSerie}
          setCajas={setCajas}
          setCajasAbiertas={setCajasAbiertas}
          setHabilitarBotones={setHabilitarBotones}
          setHistorialLecturas={setHistorialLecturas}
          setIsDisabled={setIsDisabled}
          setLectura={setLectura}
          setModalSerie={setModalSerie}
          todasLasSeries={todasLasSeries}
          unidadesTotales={unidadesTotales}
          vista={vista}
        />
        {(historialLecturas.seriesLeidas.length > 0 || unidadesTotales > 0) && (
          <Typography align="center" variant="h1">
            {vista === "vsm"
              ? historialLecturas.seriesLeidas.length
              : historialLecturas.historial.length}{" "}
            / {unidadesTotales}
          </Typography>
        )}
      </Grid>
      <Grid item className={styles.historial__container}>
        <HistorialLecturas
          historialLecturas={historialLecturas.historial}
          modalSerie={modalSerie}
          setModalSerie={setModalSerie}
        />
      </Grid>
      <SerieModal modalSerie={modalSerie} setModalSerie={setModalSerie} />
    </div>
  );
};

LecturaDeSeries.propTypes = {
  isDisabled: PropTypes.bool,
  setHabilitarBotones: PropTypes.func,
  todasLasSeries: PropTypes.array,
  cajas: PropTypes.array,
  unidades: PropTypes.array,
  unidadesTotales: PropTypes.number,
  setIsDisabled: PropTypes.func,
  cajasAbiertas: PropTypes.array,
  setCajasAbiertas: PropTypes.func,
  setCajas: PropTypes.func,
  mostrarLector: PropTypes.bool,
  vista: PropTypes.string,
  setIngreso: PropTypes.func,
  ingreso: PropTypes.object,
};

export default LecturaDeSeries;
