import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useFormik } from "formik";

import { seriesService } from "../../../services/seriesService";

import FormularioIngresoUI from "./FormularioIngresoUI";

const validate = (values) => {
  const errors = {};

  if (!values.remitoingreso) {
    errors.remitoingreso = "Requerido";
  } else if (values.remitoingreso.length < 13) {
    errors.remitoingreso = "Deben ser 13 dígitos";
  }

  if (!values.gtin) {
    errors.gtin = "Requerido";
  } else if (values.gtin.length < 14) {
    errors.gtin = "Deben ser 14 dígitos";
  }

  if (!values.unidadestotales) {
    errors.unidadestotales = "Requerido";
  }

  if (!values.sku) {
    errors.sku = "Requerido";
  } else if (values.sku.length > 10) {
    errors.sku = "Deben ser 10 dígitos";
  }

  if (!values.tipoDeSerie) {
    errors.tipoDeSerie = "Requerido";
  }

  return errors;
};

const FormularioIngreso = ({
  isDisabled,
  setIsDisabled,
  ingreso,
  setIngreso,
  setMostrarLector,
  setModalSerie,
  isReset,
  setIsReset,
}) => {
  const formik = useFormik({
    initialValues: {
      remitoingreso: "",
      gtin: "",
      unidadestotales: "",
      sku: "",
      tipoDeSerie: "",
    },
    validate,
    onSubmit: (values) => {
      seriesService
        .consultaRemitoGtin(values.remitoingreso, values.gtin)
        .then((result) => {
          if (result.data.existeRegistro) {
            setModalSerie({
              mostrar: true,
              contenido: "El remito ya fue ingresado",
              esError: false,
              mensajeError: "",
            });
          }
        })
        .catch((error) => {
          if (error.message === "Request failed with status code 404") {
            setIngreso({
              ...ingreso,
              remitoingreso: values.remitoingreso,
              gtin: values.gtin,
              unidadestotales: values.unidadestotales,
              sku: values.sku,
              tipoDeSerie: values.tipoDeSerie,
            });
            setIsDisabled(false);
            setMostrarLector(true);
          } else {
            setModalSerie({
              mostrar: true,
              contenido: "",
              esError: true,
              mensajeError: error.message,
            });
          }
        });
    },
  });

  useEffect(() => {
    if (isReset) {
      formik.resetForm();
      setIsReset(false);
    }
  }, [isReset]);

  return <FormularioIngresoUI formik={formik} isDisabled={isDisabled} />;
};

FormularioIngreso.propTypes = {
  ingreso: PropTypes.object,
  setIngreso: PropTypes.func,
  setMostrarLector: PropTypes.func,
  setIsDisabled: PropTypes.func,
  isDisabled: PropTypes.bool,
  setModalSerie: PropTypes.func,
  isReset: PropTypes.bool,
  setIsReset: PropTypes.func,
};

export default FormularioIngreso;
