import React, {useCallback} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {NameSpace} from "../../store/reducers/root";
import Battlefield from "../battlefield/battlefield";
import {GameMode} from "../../const";
import {ActionCreator} from "../../store/action";
import {checkCoordsOnBlock} from "../../utils/fields";

const COLUMN_LETTERS = ["", "А", "Б", "В", "Г", "Д", "Е", "Ж", "З", "И", "К"];
const ROW_NUMBERS = Array(10).fill(null);
const PLAYER_TYPE = `player`;

const UserFiled = ({fieldsData, shipsData, currentShipOnPlace, updateUserField, gameMode}) => {
  const lastShot = ``;

  const handleBtnPress = () => { };
  const handleMouseOver = useCallback((evtOver) => {
    if (gameMode === GameMode.ARRAGMENT) {      
      currentShipOnPlace.coords = [];

      const columnNumber = +evtOver.target.id.slice(0, 1);
      const rowNumber = +evtOver.target.id.slice(1);
      const deckLength = +currentShipOnPlace.id.slice(0, 1);

      if (currentShipOnPlace.isVertical) {
        for (let i = 0; i < deckLength; i++) {
          if (deckLength <= 10 - rowNumber) {
            currentShipOnPlace.coords.push(columnNumber.toString() + (rowNumber + i));
          } else {
            currentShipOnPlace.coords.push(columnNumber.toString() + (rowNumber - i));
          }
        }
      } else {
        for (let i = 0; i < deckLength; i++) {
          if (deckLength <= 10 - columnNumber) {
            currentShipOnPlace.coords.push((columnNumber + i).toString() + rowNumber);
          } else {
            currentShipOnPlace.coords.push((columnNumber - i).toString() + rowNumber);
          }
        }
      }

      const isCoordsBloked = checkCoordsOnBlock(currentShipOnPlace.coords, fieldsData);
      if (!isCoordsBloked) {
        currentShipOnPlace.coords.forEach((coord) => {
          fieldsData["column" + coord.slice(0, 1)][coord.slice(1)].isShip = true;
        });
        
        updateUserField(fieldsData);
      }
    }
  }, [currentShipOnPlace, fieldsData, gameMode, updateUserField]);
  const handleMouseOut = () => {};
  const handleRotate = () => {};
  const handleBattlefieldClick = () => {};
  return (
    <div className="game-board current-board">
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
          playerType={PLAYER_TYPE}        
          
          lastShot={lastShot}

          handleBtnPress={handleBtnPress}
          onMouseOverHandler={handleMouseOver}
          handleMouseOut={handleMouseOut}
          handleWheelRotate={handleRotate}
          handleBattlefieldClick={handleBattlefieldClick}
        />
      </div>
    </div>
  );
};

UserFiled.propTypes = {
  fieldsData: PropTypes.object.isRequired,
  shipsData: PropTypes.object.isRequired,
  updateUserField: PropTypes.func.isRequired,
  currentShipOnPlace: PropTypes.object.isRequired,
  gameMode: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
  fieldsData: state[NameSpace.PLAYER_FIELD].playerField,
  shipsData: state[NameSpace.PLAYER_SHIPS].playerShips,
  currentShipOnPlace: state[NameSpace.PLAYER_SHIPS].currentShipOnPlace,
  gameMode: state[NameSpace.GAME_MODE].gameMode
});

const mapDispatchToProps = (dispath) => ({
  updateUserField(newField) {
    dispath(ActionCreator.updateUserField(newField))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(UserFiled);
