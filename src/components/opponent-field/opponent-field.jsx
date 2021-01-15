import React, {useEffect} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {NameSpace} from "../../store/reducers/root";
import Battlefield from "../battlefield/battlefield";
import {GameMode} from "../../const";
import {ActionCreator} from "../../store/action";

const COLUMN_LETTERS = ["", "А", "Б", "В", "Г", "Д", "Е", "Ж", "З", "И", "К"];
const ROW_NUMBERS = Array(10).fill(null);

const OpponentField = ({gameMode, opponentField, opponentShipsData, generateRandomShips, placeShips, opponentShipsPlaced, onBattlefieldClickHandler}) => {
  useEffect(() => {
    if (gameMode === GameMode.ARRAGMENT && !Object.keys(opponentShipsData).length) {
      generateRandomShips();      
    }
    if (Object.keys(opponentShipsData).length && !opponentShipsPlaced) {
      placeShips(opponentField, opponentShipsData);
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
        />
      </div>
    </div>
  );
};

OpponentField.propTypes = {
  opponentField: PropTypes.object.isRequired,
  gameMode: PropTypes.string.isRequired,
  generateRandomShips: PropTypes.func.isRequired,
  opponentShipsData: PropTypes.object.isRequired,
  placeShips: PropTypes.func.isRequired,
  opponentShipsPlaced: PropTypes.bool.isRequired,
  onBattlefieldClickHandler: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({  
  opponentShipsData: state[NameSpace.OPPONENT_SHIPS].opponentShipsData,
  opponentField: state[NameSpace.OPPONENT_FIELD].opponentField,
  gameMode: state[NameSpace.GAME_MODE].gameMode,
  opponentShipsPlaced: state[NameSpace.OPPONENT_FIELD].opponentShipsPlaced
});

const mapDispatchToProps = (dispatch) => ({
  generateRandomShips() {
    dispatch(ActionCreator.generateComputerShips());
    
  },
  placeShips(fieldsData, shipsData) {
    dispatch(ActionCreator.placeComputerShips({fieldsData, shipsData}));
    dispatch(ActionCreator.opponentShipPlaced());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(OpponentField);
