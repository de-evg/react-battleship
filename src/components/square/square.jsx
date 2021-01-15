import React from "react";
import PropTypes from "prop-types";
import {GameMode} from "../../const";

const Square = ({ fieldData: { id, isShip, isHit, isMiss}, isPlayerField, gameMode }) => {
  const DEFAULT_CLASS = "square battlefield__square";
  let squareClasses = `${DEFAULT_CLASS}`;
  squareClasses = isShip && isPlayerField || isShip && gameMode === GameMode.GAME_OVER ? `${DEFAULT_CLASS} ship` : squareClasses;
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
  isPlayerField: PropTypes.bool.isRequired,
  gameMode: PropTypes.string.isRequired
};



export default Square;
