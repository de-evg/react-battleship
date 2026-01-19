import React from "react";
import Square from "../square/square";
import { FieldCell } from "../../utils/fields";
import { GameModeType } from "../../const";

interface BattlefieldRowProps {
  columnData: FieldCell[];
  isPlayerField: boolean;
  gameMode: GameModeType;
}

const BattlefieldRow: React.FC<BattlefieldRowProps> = ({columnData, isPlayerField, gameMode}) => {
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

export default BattlefieldRow;
