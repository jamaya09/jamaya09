import apiSeries from "./config";

export const seriesService = {
  actualizarSeries: async (data) =>
    await apiSeries
      .put("/serie/actualizar", data, {
        headers: {
          "x-current-user": localStorage.getItem("_current_user"),
        },
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err;
      }),
  obtenerSeries: async () =>
    await apiSeries.get("/serie", {
      headers: {
        "x-current-user": localStorage.getItem("_current_user"),
      },
    }),
  obtenerUnidadesTotales: async (remito, gtin) =>
    await apiSeries.get(`/remito/buscar?remito=${remito}&gtin=${gtin}`, {
      headers: {
        "x-current-user": localStorage.getItem("_current_user"),
      },
    }),
  consultaRemitoGtin: async (remito, gtin) =>
    await apiSeries.get(`/remito/validar?remito=${remito}&gtin=${gtin}`, {
      headers: {
        "x-current-user": localStorage.getItem("_current_user"),
      },
    }),
  enviarRemitoConSeriesValidadas: async (data) =>
    await apiSeries.post("/remito", data, {
      headers: {
        "x-current-user": localStorage.getItem("_current_user"),
      },
    }),
  consultarSerie: async (serie) =>
    await apiSeries.get(`/serie/validar?serie=${serie}`, {
      headers: {
        "x-current-user": localStorage.getItem("_current_user"),
      },
    }),
};
