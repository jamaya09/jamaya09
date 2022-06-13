import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";

import LecturaDeSeries from "../../components/LecturaDeSeries";
import SerieModal from "../../components/SerieModal";
import ButtonsContainer from "../../components/ButtonsContainer/ButtonsContainer";
import { seriesService } from "../../services/seriesService";

import FormularioRemito from "./FormularioRemito/FormularioRemito";
import InfoRemito from "./InfoRemito/InfoRemito";

function VSM() {
  const [remito, setRemito] = useState("");
  const [gtin, setGtin] = useState("");
  const [todasLasSeries, setTodasLasSeries] = useState(null);
  const [cajas, setCajas] = useState([]);
  const [unidades, setUnidades] = useState([]);
  const [cajasAbiertas, setCajasAbiertas] = useState([]);
  const [sku, setSku] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [habilitarBotones, setHabilitarBotones] = useState(false);
  const [unidadesTotales, setUnidadesTotales] = useState(0);
  const [mostrarLector, setMostrarLector] = useState(false);
  const [modalSerie, setModalSerie] = useState({
    mostrar: false,
    contenido: "",
    esError: false,
    mensajeError: "",
  });
  const [isReset, setIsReset] = useState(false);

  const cancelForm = () => {
    setTodasLasSeries(null);
    setSku(null);
    setCajas([]);
    setUnidades([]);
    setCajasAbiertas([]);
    setUnidadesTotales(0);
    setMostrarLector(false);
    setIsReset(true);
    setIsDisabled(true);
  };

  const handleClose = () => {
    seriesService
      .actualizarSeries({
        remito: remito,
        sku: sku,
        gtin: gtin,
      })
      .then((res) => {
        if (res.ok) {
          setModalSerie({
            ...modalSerie,
            mostrar: true,
            contenido: `Remito: ${remito} Gtin: ${gtin}`,
          });
          cancelForm();
        } else {
          setModalSerie({
            ...modalSerie,
            mostrar: true,
            contenido: res.error,
          });
        }
      });
  };

  /* Filtrado de los datos de la llamada a la API. */
  useEffect(() => {
    if (todasLasSeries) {
      let cajasEnRemito = todasLasSeries.filter((item) => item.agrupadoracontenedor);
      let unidadesEnRemito = todasLasSeries.filter((item) => !item.agrupadoracontenedor);
      let cajasAbiertasEnRemito = todasLasSeries.filter((item) => item.cajaAbierta); //Verifica campo caja abierta

      setCajas(cajasEnRemito);
      setUnidades(unidadesEnRemito);
      setCajasAbiertas(cajasAbiertasEnRemito);
    }
  }, [todasLasSeries]);

  /* Poniendo el valor de unidadesTotales al valor de unidadestotales en el primer elemento del arreglo
  todasLasSeries. */
  useEffect(() => {
    if (todasLasSeries) {
      setUnidadesTotales(todasLasSeries[0]?.unidadestotales);
    }
  }, [todasLasSeries]);

  /* Establecer el valor de sku en el valor de sku en el primer elemento de la matriz todasLasSeries. */
  useEffect(() => {
    if (todasLasSeries) {
      setSku(todasLasSeries[0].sku);
      setMostrarLector(true);
    }
  }, [todasLasSeries]);

  return (
    <Grid container alignItems="center" direction="row" justifyContent="center" spacing={0}>
      <Grid item lg={6}>
        <Grid item>
          <FormularioRemito
            isReset={isReset}
            mostrarLector={mostrarLector}
            setGtin={setGtin}
            setIsDisable={setIsDisabled}
            setIsReset={setIsReset}
            setModalSerie={setModalSerie}
            setRemito={setRemito}
            setTodasLasSeries={setTodasLasSeries}
          />
        </Grid>
        <Grid item>
          <InfoRemito sku={sku} todasLasSeries={todasLasSeries} unidadesTotales={unidadesTotales} />
        </Grid>
      </Grid>

      <Grid item lg={6}>
        <LecturaDeSeries
          cajas={cajas}
          cajasAbiertas={cajasAbiertas}
          isDisabled={isDisabled}
          mostrarLector={mostrarLector}
          setCajas={setCajas}
          setCajasAbiertas={setCajasAbiertas}
          setHabilitarBotones={setHabilitarBotones}
          setIsDisabled={setIsDisabled}
          todasLasSeries={todasLasSeries}
          unidades={unidades}
          unidadesTotales={unidadesTotales}
          vista="vsm"
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
}

export default VSM;
