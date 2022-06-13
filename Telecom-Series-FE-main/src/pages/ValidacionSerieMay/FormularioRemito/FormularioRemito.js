import React, { useEffect } from "react";
import { useFormik } from "formik";
import PropTypes from "prop-types";

import { seriesService } from "../../../services/seriesService";

import Formularioremitoui from "./FormularioRemitoUI";

const validate = (values) => {
  const errors = {};

  if (!values.remito) {
    errors.remito = "Requerido";
  } else if (values.remito.length > 15) {
    errors.remito = "Deben ser 15 dígitos";
  }

  if (!values.gtin) {
    errors.gtin = "Requerido";
  } else if (values.gtin.length > 14) {
    errors.gtin = "Deben ser 14 dígitos";
  }

  return errors;
};

const FormularioRemito = ({
  setIsDisable,
  setTodasLasSeries,
  setModalSerie,
  setRemito,
  setGtin,
  isReset,
  setIsReset,
}) => {
  const formik = useFormik({
    initialValues: {
      remito: "",
      gtin: "",
    },
    validate,
    onSubmit: (values) => {
      const llamadoGet = async () => {
        const response = await seriesService.obtenerUnidadesTotales(values.remito, values.gtin);

        return response;
      };

      llamadoGet().then((res) => {
        if (res.data[0].estadoserie.toLowerCase() !== "recepcionada") {
          setModalSerie({
            mostrar: true,
            contenido: "",
            esError: true,
            mensajeError: "Las series fueron procesadas",
          });

          return;
        }

        /* si la serie es recepcionada */
        setTodasLasSeries(res.data);
        /* si no, mostrar modal con error */
        setIsDisable(false);
      });
      setRemito(values.remito);
      setGtin(values.gtin);
    },
  });

  useEffect(() => {
    if (isReset) {
      formik.resetForm();
      setIsReset(false);
    }
  }, [isReset]);

  return <Formularioremitoui formik={formik} />;
};

FormularioRemito.propTypes = {
  setIsDisable: PropTypes.func.isRequired,
  setTodasLasSeries: PropTypes.func.isRequired,
  setRemito: PropTypes.func.isRequired,
  setGtin: PropTypes.func.isRequired,
  isReset: PropTypes.bool.isRequired,
  setIsReset: PropTypes.func.isRequired,
  setModalSerie: PropTypes.func.isRequired,
};

export default FormularioRemito;
