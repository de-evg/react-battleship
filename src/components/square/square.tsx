import React from "react";
import { GameModeType, GameMode } from "../../const";
import { FieldCell } from "../../utils/fields";

interface SquareProps {
  fieldData: FieldCell;
  isPlayerField: boolean;
  gameMode: GameModeType;
}

const Square: React.FC<SquareProps> = ({ fieldData: { id, isShip, isHit, isMiss}, isPlayerField, gameMode }) => {
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

export default Square;
