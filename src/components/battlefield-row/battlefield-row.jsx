import React from "react";
import PropTypes from "prop-types";
import Square from "../square/square";

const BattlefieldRow = ({columnData}) => {
  return (
    <ul>
      {
        columnData.map((fieldData, i) => <Square
          fieldData={fieldData}
          key={i}
          playerType={`user`}
          lastShot={``}
          gameMode={``} />)
      }
    </ul>
  );
};

BattlefieldRow.propTypes = {
  columnData: PropTypes.array.isRequired
};

export default BattlefieldRow;
