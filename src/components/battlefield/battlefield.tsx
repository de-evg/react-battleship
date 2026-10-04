import React from "react";
import BattlefieldRow from "../battlefield-row/battlefield-row";
import { GameFieldData } from "../../utils/fields";
import { GameModeType } from "../../const";

interface BattlefieldProps {
  fieldsData: GameFieldData;
  onMouseOverHandler?: (e: React.MouseEvent) => void;
  onMouseOutHandler?: (e: React.MouseEvent) => void;
  onWheelRotateHandler?: (e: React.WheelEvent) => void;
  onBattlefieldClickHandler: (e: React.MouseEvent) => void;
  isPlayerField: boolean;
  gameMode: GameModeType;
}

const Battlefield: React.FC<BattlefieldProps> = ({ fieldsData, onMouseOverHandler, onMouseOutHandler, onWheelRotateHandler, onBattlefieldClickHandler, isPlayerField, gameMode }) => {
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

export default Battlefield;
