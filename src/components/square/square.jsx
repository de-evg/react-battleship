import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const Square = ({ fieldData: { id, isShip, isHit, isMiss } }) => {
  const DEFAULT_CLASS = "square battlefield__square";
  let squareClasses = `${DEFAULT_CLASS}`;
  squareClasses = isShip ? `${DEFAULT_CLASS} ship` : squareClasses;
  squareClasses = isHit ? `${DEFAULT_CLASS} ship hit` : squareClasses;
  squareClasses = isMiss ? `${DEFAULT_CLASS} miss` : squareClasses;
  
  return (
    <>
      <li
        key={`squire-${id}`}
        className={squareClasses}
        id={id}
        title={id}
      ></li>
    </>
  );
};

Square.propTypes = {
  fieldData: PropTypes.object.isRequired,
};

export default Square;
