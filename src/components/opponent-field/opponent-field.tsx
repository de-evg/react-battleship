import React, {useEffect} from "react";
import {connect} from "react-redux";
import {NameSpace} from "../../store/reducers/root";
import type {RootState} from "../../store/reducers/root";
import Battlefield from "../battlefield/battlefield";
import {GameMode} from "../../const";
import {ActionCreator} from "../../store/action";
import type {Action} from "../../store/action";
import type {Dispatch} from "redux";
import { GameFieldData } from "../../utils/fields";
import { ShipList } from "../../utils/ships";
import { GameModeType } from "../../const";

const COLUMN_LETTERS = ["", "А", "Б", "В", "Г", "Д", "Е", "Ж", "З", "И", "К"];
const ROW_NUMBERS = Array(10).fill(null);
const IS_PLAYER_FIELD = false;

interface OpponentFieldProps {
  gameMode: GameModeType;
  opponentField: GameFieldData;
  opponentShipsData: ShipList | {};
  generateRandomShips: () => void;
  placeShips: (fieldsData: GameFieldData, shipsData: ShipList) => void;
  opponentShipsPlaced: boolean;
  onBattlefieldClickHandler: (e: React.MouseEvent) => void;
}

const OpponentField: React.FC<OpponentFieldProps> = ({gameMode, opponentField, opponentShipsData, generateRandomShips, placeShips, opponentShipsPlaced, onBattlefieldClickHandler}) => {
  useEffect(() => {
    if (gameMode === GameMode.ARRAGMENT && !Object.keys(opponentShipsData).length) {
      generateRandomShips();      
    }
    if (Object.keys(opponentShipsData).length && !opponentShipsPlaced) {
      placeShips(opponentField, opponentShipsData as ShipList);
    }
  }, [gameMode, generateRandomShips, opponentField, opponentShipsData, placeShips, opponentShipsPlaced]);

  return (
    <div className="game-board">
      <div className="game" >
        <ul className="game__column-name">
          {
            COLUMN_LETTERS.map((letter, i) => <li key={i} className={"square"}>{letter}</li>)
          }
        </ul>
        <ul className="game__row-name">
          {
            ROW_NUMBERS.map((item, i) => <li key={i} className={"square"}>{i + 1}</li>)
          }
        </ul>
        <Battlefield          
          fieldsData={opponentField}
          onMouseOverHandler={() => {}}
          onMouseOutHandler={() => {}}
          onWheelRotateHandler={() => {}}          
          onBattlefieldClickHandler={onBattlefieldClickHandler}
          isPlayerField={IS_PLAYER_FIELD}
          gameMode={gameMode}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({  
  opponentShipsData: state[NameSpace.OPPONENT_SHIPS].opponentShipsData,
  opponentField: state[NameSpace.OPPONENT_FIELD].opponentField,
  gameMode: state[NameSpace.GAME_MODE].gameMode,
  opponentShipsPlaced: state[NameSpace.OPPONENT_FIELD].opponentShipsPlaced
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  generateRandomShips() {
    dispatch(ActionCreator.generateComputerShips());
    
  },
  placeShips(fieldsData: GameFieldData, shipsData: ShipList) {
    dispatch(ActionCreator.placeComputerShips({fieldsData, shipsData}));
    dispatch(ActionCreator.opponentShipPlaced());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(OpponentField);
