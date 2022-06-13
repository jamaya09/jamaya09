import React, { useEffect, useState } from "react";

import { seriesService } from "../../services/seriesService";

function Consultas() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const llamadoGet = async () => await seriesService.obtenerSeries();

    llamadoGet().then((res) => setData(res.data));
  }, []);

  return (
    <div className="consultas container">
      <table className="consultas-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>REMITO</th>
            <th>SERIE</th>
            <th>CAJA</th>
            <th>ESTADO</th>
          </tr>
        </thead>
        <tbody>
          {data.map((serie) => (
            <tr key={serie.id}>
              <td>{serie.id}</td>
              <td>{serie.remitoIngreso}</td>
              <td>{serie.serie}</td>
              <td>{serie.caja}</td>
              <td>{serie.serieStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Consultas;
