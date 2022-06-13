import React from "react";
import PropTypes from "prop-types";

export const UnidadesTotales = ({ title, value, className }) => {
  return (
    <h4 className={className}>
      {title} {value}
    </h4>
  );
};

UnidadesTotales.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  className: PropTypes.string,
};
