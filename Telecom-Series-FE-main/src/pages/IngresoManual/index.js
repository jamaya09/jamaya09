import React, { useState } from "react";
/* Components */
import { Grid } from "@mui/material";

import LecturaDeSeries from "../../components/LecturaDeSeries";
import ButtonsContainer from "../../components/ButtonsContainer/ButtonsContainer";
import SerieModal from "../../components/SerieModal";
import { seriesService } from "../../services/seriesService";
import { propietarios } from "../../services/localServices";

import FormularioIngreso from "./BoxFormularioIngreso/FormularioIngreso";

const Index = () => {
  const [ingreso, setIngreso] = useState({
    remitoingreso: "",
    gtin: "",
    unidadestotales: "",
    sku: "",
    tipoDeSerie: "",
    series: [],
  });
  const [isDisabled, setIsDisabled] = useState(true);
  const [mostrarLector, setMostrarLector] = useState(false);
  const [habilitarBotones, setHabilitarBotones] = useState(false);
  const [modalSerie, setModalSerie] = useState({
    mostrar: false,
    contenido: "",
    esError: false,
    mensajeError: "",
  });
  const [isReset, setIsReset] = useState(false);

  const cancelForm = () => {
    setIngreso({
      remitoingreso: "",
      gtin: "",
      unidadestotales: "",
      sku: "",
      tipoDeSerie: "",
      series: [],
    });
    setIsReset(true);
    setIsDisabled(true);
    setMostrarLector(false);
    setHabilitarBotones(false);
  };

  const handleClose = () => {
    let data = {
      propietario: propietarios[0].propietario,
      remitoingreso: ingreso.remitoingreso,
      gtin: ingreso.gtin,
      unidadestotales: +ingreso.unidadestotales,
      sku: ingreso.sku,
      series: ingreso.series,
    };

    seriesService
      .enviarRemitoConSeriesValidadas(data)
      .then(() => {
        setModalSerie({
          mostrar: true,
          contenido: "Remito enviado correctamente",
          esError: false,
          mensajeError: "",
        });
        cancelForm();
      })
      .catch((error) => {
        setModalSerie({
          mostrar: true,
          contenido: "Error al enviar el remito",
          esError: true,
          mensajeError: error.message,
        });
      });
  };

  return (
    <Grid container alignItems="center" direction="row" justifyContent="center" spacing={0}>
      <Grid item lg={6}>
        <FormularioIngreso
          ingreso={ingreso}
          isDisabled={isDisabled}
          isReset={isReset}
          setIngreso={setIngreso}
          setIsDisabled={setIsDisabled}
          setIsReset={setIsReset}
          setModalSerie={setModalSerie}
          setMostrarLector={setMostrarLector}
        />
      </Grid>
      <Grid item lg={6}>
        <LecturaDeSeries
          ingreso={ingreso}
          isDisabled={isDisabled}
          mostrarLector={mostrarLector}
          setHabilitarBotones={setHabilitarBotones}
          setIngreso={setIngreso}
          setIsDisabled={setIsDisabled}
          unidadesTotales={+ingreso.unidadestotales}
          vista="ingresoManual"
        />
      </Grid>
      <ButtonsContainer
        cancelForm={cancelForm}
        habilitarBotones={habilitarBotones}
        handleClose={handleClose}
      />
      <SerieModal modalSerie={modalSerie} setModalSerie={setModalSerie} />
    </Grid>
  );
};

export default Index;
