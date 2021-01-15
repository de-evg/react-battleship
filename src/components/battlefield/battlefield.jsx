import React from "react";
import PropTypes from "prop-types";
import BattlefieldRow from "../battlefield-row/battlefield-row";

const Battlefied = ({ fieldsData, onMouseOverHandler, onMouseOutHandler, onWheelRotateHandler, onBattlefieldClickHandler, isPlayerField, gameMode }) => {
  return (
    <div
      className="game__battlefield battlefield"
      onMouseOver={onMouseOverHandler}
      onMouseOut={onMouseOutHandler}
      onWheel={onWheelRotateHandler}
      onClick={onBattlefieldClickHandler}
    >
      {Object.keys(fieldsData).map((columnName, i) => (
        <BattlefieldRow
          key={i}
          columnData={fieldsData[columnName]}
          isPlayerField={isPlayerField}
          gameMode={gameMode}
        />
      ))}
    </div>
  );
};

Battlefied.propTypes = {
  fieldsData: PropTypes.object.isRequired,
  onMouseOverHandler: PropTypes.func.isRequired,
  onMouseOutHandler: PropTypes.func.isRequired,
  onWheelRotateHandler: PropTypes.func.isRequired,
  onBattlefieldClickHandler: PropTypes.func.isRequired,
  isPlayerField: PropTypes.bool.isRequired,
  gameMode: PropTypes.string.isRequired
};

export default Battlefied;
