import React from "react";
import PropTypes from "prop-types";
import BattlefieldRow from "../battlefield-row/battlefield-row";

const Battlefied = ({fieldsData}) => {
  const gameMode = ``;

  return (
    <div className="game__battlefield battlefield">
      {
        Object.keys(fieldsData).map((columnName, i) => <BattlefieldRow
          key={i}
          columnData={fieldsData[columnName]}
          playerType={`player`}
          gameMode={gameMode} />)
      }
    </div>
  );
};

Battlefied.propTypes = {
  fieldsData: PropTypes.object.isRequired
};

export default Battlefied;
