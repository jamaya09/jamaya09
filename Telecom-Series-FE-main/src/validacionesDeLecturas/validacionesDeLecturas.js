/***************************/
/* VALIDACIONES DE LECTURA */
/***************************/

import { propietarios } from "../services/localServices";

/**
 * Toma una cadena y una matriz de objetos, y devuelve un objeto con un valor booleano y una matriz de
 * objetos
 * @param serieLeida - "123456789012345"
 * @param series - [{agrupadoracontenedor: "123456789", serie: "123456789123456789"},
 * {agrupadoracontenedor: "123456789", serie: "123456789123456789"}, {agrup
 * @returns Un objeto con dos propiedades: esCaja y serie.
 */
export const verificarSiEsCajaOSerie = (serieLeida, series) => {
  let unidad = 15;
  let caja = 10;

  switch (serieLeida.length) {
    case unidad:
      return false;
    case caja:
      let filtro = series.filter(
        (serie) => serie.agrupadoracontenedor === serieLeida.agrupadoracontenedor
      );
      let respuesta = {
        esCaja: filtro.length > 1,
        series: filtro,
      };

      return respuesta;
    default:
      return new Error("No es un formato válido");
  }
};

/**
 * Devuelve verdadero si la longitud de la cadena es 13 o 15, de lo contrario, devuelve falso.
 * @param lectura - la cadena que se está validando
 * @param [formatoSerie=15] - 15
 * @param [formatoCaja=13] - 13
 */
const validarFormatoLectura = (lectura, formatoSerie = 13, formatoCaja = 13) => {
  let tiposDeSeries = propietarios[0].tiposDeSeries;
  let formatoImei = tiposDeSeries.imei.digitos;
  let formatoSim = tiposDeSeries.sim.digitos;
  let formatoAccesorios = tiposDeSeries.accesorios.digitos;

  return (
    lectura.length === formatoCaja ||
    lectura.length === formatoSerie ||
    lectura.length === formatoImei ||
    lectura.length === formatoSim ||
    lectura.length === formatoAccesorios
  );
};
/**
 * Dada una cadena, devuelve verdadero si la cadena tiene 13 caracteres, de lo contrario, devuelve
 * falso.
 * @param lectura - La cadena que desea comprobar.
 * @param [formatoCaja=13] - El número de caracteres en la cadena.
 */
const lecturaEsCaja = (lectura, formatoCaja = 13) => lectura.length == formatoCaja;

/**
 * Si el número de lecturas es mayor o igual que el número total de lecturas, devuelve verdadero, de lo
 * contrario, devuelve falso.
 * @param lecturas - el número de lecturas que se han completado
 * @param totalLecturas - el número total de lecturas
 * @returns Una función que toma dos argumentos, lecturas y totalLecturas, y devuelve un valor
 * booleano.
 */
const lecturasCompletadas = (lecturas, totalLecturas) => {
  return lecturas >= totalLecturas;
};

/**
 * Si la longitud de la cadena es mayor que 0, devuelve verdadero; de lo contrario, devuelve falso.
 * @param lectura - La lectura que vamos a comprobar.
 */
const lecturaVacia = (lectura) => lectura.length > 0;

export const validarLectura = (
  valorLectura,
  setHabilitarBotones,
  modalSerie,
  setModalSerie,
  setLectura,
  historialLecturas,
  lectura,
  unidadesTotales
) => {
  switch (true) {
    case !lecturaVacia(valorLectura):
      setModalSerie({
        ...modalSerie,
        mostrar: true,
        contenido: "",
        esError: true,
        mensajeError: "Ingrese un valor",
      });
      break;
    case lecturasCompletadas(historialLecturas.seriesLeidas.length, unidadesTotales):
      setModalSerie({
        ...modalSerie,
        mostrar: true,
        contenido: "",
        esError: true,
        mensajeError: "Lecturas completas",
      });
      setHabilitarBotones(true);
      break;
    case !validarFormatoLectura(valorLectura):
      setModalSerie({
        ...modalSerie,
        mostrar: true,
        contenido: "",
        esError: true,
        mensajeError: "Formato inválido",
      });
      break;
    default:
      setLectura({
        ...lectura,
        valor: valorLectura,
        esCaja: lecturaEsCaja(valorLectura),
      });
      break;
  }
};

/*******************************/
/* FIN VALIDACIONES DE LECTURA */
/*******************************/
