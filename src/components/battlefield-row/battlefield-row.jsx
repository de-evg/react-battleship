import React from "react";
import PropTypes from "prop-types";
import Square from "../square/square";

const BattlefieldRow = ({columnData, isPlayerField, gameMode}) => {
  return (
    <ul>
      {
        columnData.map((fieldData, i) => <Square
          fieldData={fieldData}
          key={i}          
          isPlayerField={isPlayerField}
          gameMode={gameMode}
           />)
      }
    </ul>
  );
};

BattlefieldRow.propTypes = {
  columnData: PropTypes.array.isRequired,
  isPlayerField: PropTypes.bool.isRequired,
  gameMode: PropTypes.string.isRequired
};

export default BattlefieldRow;
