import React, { useEffect } from "react";
import PropTypes from "prop-types";

import { inputFocus } from "../../../utils";
import { validarLectura } from "../../../validacionesDeLecturas/validacionesDeLecturas";
import { validarDatosDeLectura } from "../../../validacionesDeLecturas/validacionesDeSeriesYCajas";
import { validacionesIngresoManual } from "../../../validacionesDeLecturas/validacionesIngresoManual";

import FormularioSerieUI from "./FormularioSerieUI";

const FormularioSerie = ({
  isDisabled,
  setIsDisabled,
  setLectura,
  lectura,
  setModalSerie,
  historialLecturas,
  setHistorialLecturas,
  modalSerie,
  todasLasSeries = [],
  unidadesTotales,
  cajas,
  setCajas,
  cajasAbiertas,
  setCajasAbiertas,
  vista,
  setHabilitarBotones,
  ingreso,
}) => {
  const handleSubmit = (e) => {
    if (e.key === "Enter") {
      let input = document.querySelector("#inputSeries");
      let valorLectura = input.value;

      if (valorLectura !== "") {
        validarLectura(
          valorLectura,
          setHabilitarBotones,
          modalSerie,
          setModalSerie,
          setLectura,
          historialLecturas,
          lectura,
          unidadesTotales
        );
        input.value = "";
      }
    }
  };

  useEffect(() => {
    if (lectura.valor !== "") {
      switch (vista) {
        case "vsm":
          if (lectura.esCaja) {
            let seriesDeCaja = cajas.filter((item) => item.agrupadoracontenedor === lectura.valor);

            lectura.series = seriesDeCaja;
          }

          validarDatosDeLectura(
            lectura,
            todasLasSeries,
            historialLecturas,
            setHistorialLecturas,
            setModalSerie,
            modalSerie,
            cajasAbiertas,
            setCajasAbiertas,
            cajas,
            setCajas,
            unidadesTotales,
            setHabilitarBotones
          );
          break;
        case "ingresoManual":
          validacionesIngresoManual(
            lectura,
            historialLecturas,
            setHistorialLecturas,
            setModalSerie,
            modalSerie,
            ingreso
          );
          break;
        case "devoluciones":
          break;

        default:
          break;
      }

      setLectura({ ...lectura, valor: "", esCaja: false });
    }
  }, [lectura]);

  useEffect(() => {
    inputFocus();
  });

  return <FormularioSerieUI handleSubmit={handleSubmit} isDisabled={isDisabled} />;
};

FormularioSerie.propTypes = {
  isDisabled: PropTypes.bool.isRequired,
  setHabilitarBotones: PropTypes.func.isRequired,
  setIsDisabled: PropTypes.func.isRequired,
  setLectura: PropTypes.func.isRequired,
  lectura: PropTypes.object.isRequired,
  setModalSerie: PropTypes.func,
  modalSerie: PropTypes.object,
  historialLecturas: PropTypes.array,
  setHistorialLecturas: PropTypes.func,
  setMensajeError: PropTypes.func,
  todasLasSeries: PropTypes.array,
  unidadesTotales: PropTypes.number,
  cajas: PropTypes.array,
  cajasAbiertas: PropTypes.array,
  setCajasAbiertas: PropTypes.func,
  setCajas: PropTypes.func,
  vista: PropTypes.string,
  ingreso: PropTypes.object,
};

export default FormularioSerie;
