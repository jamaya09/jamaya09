import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/pro-light-svg-icons";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import PropTypes from "prop-types";

import styles from "./UsernameCard.module.css";

const UsernameCard = ({ username }) => {
  return (
    <Box display={{ xs: "none", sm: "block" }} marginX={2}>
      <Button
        className={styles.button}
        color="primary"
        endIcon={<FontAwesomeIcon icon={faUserCircle} size="2x" />}
        variant="text"
      >
        Hola, {username}!
      </Button>
    </Box>
  );
};

UsernameCard.propTypes = {
  username: PropTypes.string,
};

export default UsernameCard;
