/**********************************/
/* VALIDACIONES DE SERIES / CAJAS */
/**********************************/

/**
 * Devuelve verdadero si el valor de la propiedad "valor" del objeto "lectura" está incluido en el
 * arreglo "series" o en el arreglo "cajas".
 * @param lectura - {
 * @param todasLasSeries - [{serie: "1", agrupadoracontenedor: "1"}, {serie: "2", agrupadoracontenedor:
 * "2"}]
 * @returns Una función que toma dos parámetros, lectura y todasLasSeries.
 */
const lecturaCorrespondeARemito = (lectura, todasLasSeries) => {
  let series = todasLasSeries?.map((item) => item.serie);
  let cajas = todasLasSeries.map((item) => item.agrupadoracontenedor);

  return series?.includes(lectura.valor) || cajas?.includes(lectura.valor);
};

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

/**
 * Devuelve verdadero si el valor de la lectura actual está incluido en la matriz de cajas abiertas.
 * @param lectura - {
 * @param cajasAbiertas - [{agrupadoracontenedor: "1", contenedor: "1", esCaja: true, valor: "1"}]
 * @returns un valor booleano.
 */
const cajaAbierta = (lectura, cajasAbiertas) => {
  if (lectura.esCaja) {
    let agrupadoras = cajasAbiertas.map((item) => item.agrupadoracontenedor);

    return agrupadoras.includes(lectura.valor);
  }
};

/**
 * Devuelve verdadero si la serie de la lectura está incluida en la serie de las casillas.
 * @param lectura - {
 * @param cajas - [{serie: "123456789", leido: false}, {serie: "987654321", leido: false}]
 * @returns un valor booleano.
 */
const unidadCorrespondeACajaNoLeida = (lectura, cajas) => {
  let seriesEnCajas = cajas.map((item) => item.serie);

  return seriesEnCajas.includes(lectura);
};

/**
 * Toma un montón de cosas, y luego hace un montón de cosas con esas cosas, y luego devuelve un montón
 * de cosas.
 * @param lectura - {
 * @param cajas - una matriz de objetos que representan las cajas que están cerradas
 * @param setCajas - esta es una función que establece el estado de la variable cajas.
 * @param cajasAbiertas - una serie de objetos que se han abierto
 * @param setCajasAbiertas - función setState para cajas Abiertas
 * @param setHistorialLecturas - esta es una función que establece el estado del componente.
 * @param historialLecturas - {
 */
const establecerCajaAbiertaSinLeer = (
  lectura,
  cajas,
  setCajas,
  cajasAbiertas,
  setCajasAbiertas,
  setHistorialLecturas,
  historialLecturas
) => {
  /* Encuentra serie leida */
  let serie = cajas.find(
    (item) => item.serie === lectura.valor || item.agrupadoracontenedor === lectura.valor
  );
  let historialSinCajaQueFueAbierta = historialLecturas.historial.filter(
    (item) => item.valor !== serie.agrupadoracontenedor
  );
  let seriesLeidasSinSeriesDeLaCajaAbierta = historialLecturas.seriesLeidas.filter(
    (item) => item.agrupadoracontenedor !== serie.agrupadoracontenedor
  );

  /* Filtra por series de las cajas abiertas */
  /* POST para setear en la DB que esa caja está abierta */
  let seriesDeCajaAbierta = cajas
    .filter((item) => item.agrupadoracontenedor === serie.agrupadoracontenedor)
    .map((item) => {
      return {
        ...item,
        cajaAbierta: true,
      };
    });

  let cajasCerradas = cajas.filter(
    (item) => item.agrupadoracontenedor != serie.agrupadoracontenedor
  );

  setCajasAbiertas([...cajasAbiertas, ...seriesDeCajaAbierta]);
  setCajas(cajasCerradas);

  setHistorialLecturas({
    ...historialLecturas,
    historial: [...historialSinCajaQueFueAbierta, lectura],
    seriesLeidas: [...seriesLeidasSinSeriesDeLaCajaAbierta, serie],
  });
};

/**
 * Toma una lectura, una historia de lecturas, un setter para la historia de lecturas, y toda la serie,
 * y luego escribe la lectura en la historia de lecturas.
 * @param lectura - {
 * @param historialLecturas - {
 * @param setHistorialLecturas - esta es una función que establece el estado del componente.
 * @param todasLasSeries - una matriz de objetos que contiene las series que están disponibles para ser
 * leídas.
 */
const escribirHistorial = (lectura, historialLecturas, setHistorialLecturas, todasLasSeries) => {
  let serieLeida = !lectura.esCaja && todasLasSeries.find((item) => item.serie === lectura.valor);
  let seriesCorrespondientesALaCaja = lectura.esCaja && lectura.series;

  if (lectura.esCaja) {
    setHistorialLecturas({
      ...historialLecturas,
      historial: [lectura, ...historialLecturas.historial],
      seriesLeidas: [...seriesCorrespondientesALaCaja, ...historialLecturas.seriesLeidas],
    });
  } else {
    setHistorialLecturas({
      ...historialLecturas,
      historial: [lectura, ...historialLecturas.historial],
      seriesLeidas: [serieLeida, ...historialLecturas.seriesLeidas],
    });
  }
};

/**
 * Si la lectura no está en la lista de todas las series, si la lectura se repite, si la casilla está
 * abierta, si la unidad corresponde a una casilla no leída, entonces muestra un mensaje de error, de
 * lo contrario muestra la lectura y la escribe en el historial.
 * @param lectura - {
 * @param todasLasSeries - una matriz de objetos con la siguiente estructura:
 * @param historialLecturas - {
 * @param setHistorialLecturas - función establecer estado
 * @param setModalSerie - es una función que establece el estado del objeto modalSerie
 * @param modalSerie - {
 * @param cajasAbiertas - [{
 * @param setCajasAbiertas - función setState para cajas Abiertas
 * @param cajas - [{id: 1, serie: [1,2,3,4,5,6,7,8,9,10]}]
 * @param setCajas - función setState para cajas
 */
export const validarDatosDeLectura = (
  lectura,
  todasLasSeries,
  historialLecturas,
  setHistorialLecturas,
  setModalSerie,
  modalSerie,
  cajasAbiertas,
  setCajasAbiertas,
  cajas,
  setCajas
) => {
  switch (true) {
    case !lecturaCorrespondeARemito(lectura, todasLasSeries):
      setModalSerie({
        ...modalSerie,
        mostrar: true,
        contenido: "",
        esError: true,
        mensajeError: "La lectura no corresponde al remito",
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
    /* Es caja abierta */
    case cajaAbierta(lectura, cajasAbiertas, historialLecturas):
      setModalSerie({
        ...modalSerie,
        mostrar: true,
        contenido: "",
        esError: true,
        mensajeError: "La caja fue abierta, leer series individuales",
      });
      break;
    /* Si es una series de caja no leida */
    case unidadCorrespondeACajaNoLeida(lectura.valor, cajas, cajasAbiertas):
      setModalSerie({
        ...modalSerie,
        mostrar: true,
        contenido: "",
        esError: true,
        mensajeError: "Abriste una caja, leer series individuales",
      });
      establecerCajaAbiertaSinLeer(
        lectura,
        cajas,
        setCajas,
        cajasAbiertas,
        setCajasAbiertas,
        setHistorialLecturas,
        historialLecturas
      );

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
      escribirHistorial(lectura, historialLecturas, setHistorialLecturas, todasLasSeries);
      break;
  }
};

/**************************************/
/* FIN VALIDACIONES DE SERIES / CAJAS */
/**************************************/
