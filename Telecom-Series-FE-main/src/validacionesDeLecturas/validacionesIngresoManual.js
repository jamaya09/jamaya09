import { seriesService } from "../services/seriesService";

/**
 * Devuelve verdadero si el valor de la lectura ya está en el historial.
 * @param lectura - {
 * @param historial - [{valor: 1}, {valor: 2}, {valor: 3}]
 * @returns un valor booleano.
 */
const lecturaRepetida = (lectura, historial) => {
  let seriesEnHistorial = historial.map((lectura) => lectura.valor);

  return seriesEnHistorial.includes(lectura);
};

const validarSiSerieExiste = async (serie) => {
  return await seriesService
    .consultarSerie(serie)
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
};

const validarPorTipoDeSerie = (serie, tipoDeSerie) => {
  let prefijoSerie = serie.trim()[0];

  return serie.length === tipoDeSerie.digitos && prefijoSerie === tipoDeSerie.prefijo;
};

export const validacionesIngresoManual = async (
  lectura,
  historialLecturas,
  setHistorialLecturas,
  setModalSerie,
  modalSerie,
  ingreso
) => {
  switch (true) {
    case lectura.esCaja:
      setModalSerie({
        ...modalSerie,
        mostrar: true,
        contenido: "",
        esError: true,
        mensajeError: "Lectura inválida",
      });
      break;
    case !validarPorTipoDeSerie(lectura.valor, ingreso.tipoDeSerie):
      setModalSerie({
        ...modalSerie,
        mostrar: true,
        contenido: "",
        esError: true,
        mensajeError: "Formato de serie inválido",
      });
      break;
    case await validarSiSerieExiste(lectura.valor):
      setModalSerie({
        ...modalSerie,
        mostrar: true,
        contenido: "",
        esError: true,
        mensajeError: "La serie corresponde a otro remito",
      });
      break;
    case lecturaRepetida(lectura.valor, historialLecturas.historial):
      setModalSerie({
        ...modalSerie,
        mostrar: true,
        contenido: "",
        esError: true,
        mensajeError: "Lectura ya ingresada",
      });
      break;

    default:
      setModalSerie({
        ...modalSerie,
        mostrar: true,
        contenido: lectura.valor,
        esError: false,
        mensajeError: "",
        esCaja: lectura.esCaja,
      });
      setHistorialLecturas({
        ...historialLecturas,
        historial: [lectura, ...historialLecturas.historial],
      });
      break;
  }
};
