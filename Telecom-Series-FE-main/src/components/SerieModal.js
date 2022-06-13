import React from "react";
import PropTypes from "prop-types";
import { Box, Modal, Button } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function SerieModal({ modalSerie, setModalSerie }) {
  if (modalSerie.mostrar && !modalSerie.verSeries) {
    setTimeout(() => {
      setModalSerie({ ...modalSerie, mostrar: false });
    }, 1000);
  }

  return (
    <Modal
      aria-describedby="parent-modal-description"
      aria-labelledby="parent-modal-title"
      open={modalSerie.mostrar}
      onClose={() => setModalSerie({ ...modalSerie, mostrar: false, verSeries: false })}
    >
      <Box sx={style}>
        <h1>
          {modalSerie.contenido}
          {modalSerie?.esError && modalSerie?.mensajeError}
        </h1>
        {modalSerie.verSeries && modalSerie.series.map((serie) => <p key={serie}>{serie.serie}</p>)}
      </Box>
    </Modal>
  );
}

SerieModal.propTypes = {
  modalSerie: PropTypes.object.isRequired,
  setModalSerie: PropTypes.func.isRequired,
};

export default SerieModal;
