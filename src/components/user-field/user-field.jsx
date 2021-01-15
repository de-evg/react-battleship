import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { NameSpace } from "../../store/reducers/root";
import Battlefield from "../battlefield/battlefield";
import { GameMode } from "../../const";
import { ActionCreator, ActionType } from "../../store/action";
import { checkCoordsOnBlock } from "../../utils/fields";

const COLUMN_LETTERS = ["", "А", "Б", "В", "Г", "Д", "Е", "Ж", "З", "И", "К"];
const ROW_NUMBERS = Array(10).fill(null);
const IS_PLAYER_FIELD = true;

const UserFiled = ({
  playerField,
  playerShipsData,
  currentShipOnPlace,
  updateDataOnMouseOut,
  gameMode,
  updateUserFiled,
  placeCurrentShip,
  shipTypeOnPlace,
  isAllShipPlaced,
}) => {
  const handleMouseOver = useCallback(
    (evtOver) => {
      if (gameMode === GameMode.ARRAGMENT && !isAllShipPlaced) {
        const newCurrentShipOnPlace = { ...currentShipOnPlace };
        newCurrentShipOnPlace.coords = [];

        const columnNumber = +evtOver.target.id.slice(0, 1);
        const rowNumber = +evtOver.target.id.slice(1);
        const deckLength = +newCurrentShipOnPlace.id.slice(0, 1);

        if (newCurrentShipOnPlace.isVertical) {
          for (let i = 0; i < deckLength; i++) {
            if (deckLength <= 10 - rowNumber) {
              newCurrentShipOnPlace.coords.push(
                columnNumber.toString() + (rowNumber + i)
              );
            } else {
              newCurrentShipOnPlace.coords.push(
                columnNumber.toString() + (rowNumber - i)
              );
            }
          }
        } else {
          for (let i = 0; i < deckLength; i++) {
            if (deckLength <= 10 - columnNumber) {
              newCurrentShipOnPlace.coords.push(
                (columnNumber + i).toString() + rowNumber
              );
            } else {
              newCurrentShipOnPlace.coords.push(
                (columnNumber - i).toString() + rowNumber
              );
            }
          }
        }

        const isCoordsBloked = checkCoordsOnBlock(
          newCurrentShipOnPlace.coords,
          playerField
        );

        if (!isCoordsBloked) {
          const newFieldsData = { ...playerField };
          newCurrentShipOnPlace.coords.forEach((coord) => {
            newFieldsData["column" + coord.slice(0, 1)][
              coord.slice(1)
            ].isShip = true;
          });
          updateDataOnMouseOut(newCurrentShipOnPlace, newFieldsData);
        }
      }
    },
    [
      isAllShipPlaced,
      currentShipOnPlace,
      playerField,
      gameMode,
      updateDataOnMouseOut,
    ]
  );

  const handleMouseOut = useCallback(
    (evtOut) => {
      if (
        gameMode === GameMode.ARRAGMENT &&
        currentShipOnPlace &&
        !isAllShipPlaced &&
        !evtOut.target.classList.contains(".ship")
      ) {
        const newCurrentShipOnPlace = { ...currentShipOnPlace };
        const newFieldsData = { ...playerField };

        if (!checkCoordsOnBlock(newCurrentShipOnPlace.coords, newFieldsData)) {
          newCurrentShipOnPlace.coords.forEach((coord) => {
            newFieldsData["column" + coord.slice(0, 1)][
              coord.slice(1)
            ].isShip = false;
            newFieldsData["column" + coord.slice(0, 1)][
              coord.slice(1)
            ].isBlocked = false;
          });
          newCurrentShipOnPlace.coords = [];
          updateUserFiled(newFieldsData);
          updateDataOnMouseOut(newCurrentShipOnPlace, newFieldsData);
        }
      }
    },
    [
      isAllShipPlaced,
      currentShipOnPlace,
      gameMode,
      playerField,
      updateUserFiled,
      updateDataOnMouseOut,
    ]
  );

  const handleBattlefieldClick = useCallback(
    (evt) => {
      if (
        gameMode === GameMode.ARRAGMENT &&
        evt.target.tagName === "LI" &&
        !isAllShipPlaced &&
        !checkCoordsOnBlock(currentShipOnPlace.coords, playerField)
      ) {
        const shipType = "deck" + currentShipOnPlace.id.slice(0, 1);
        const shipNumber = +currentShipOnPlace.id.slice(-1);

        const newCurrentShipOnPlace = { ...currentShipOnPlace };
        newCurrentShipOnPlace.isPlaced = true;
        const currentShipsData = { ...playerShipsData };
        currentShipsData[shipType][shipNumber] = newCurrentShipOnPlace;

        const newFieldsData = { ...playerField };
        newCurrentShipOnPlace.coords.forEach((coord) => {
          newFieldsData["column" + coord.slice(0, 1)][
            coord.slice(1)
          ].isShip = true;
          newFieldsData["column" + coord.slice(0, 1)][
            coord.slice(1)
          ].isBlocked = true;
          newFieldsData["column" + coord.slice(0, 1)][coord.slice(1)].shipID =
            newCurrentShipOnPlace.id;

          if (+coord.slice(0, 1) > 0) {
            newFieldsData["column" + (+coord.slice(0, 1) - 1)][
              coord.slice(1)
            ].isBlocked = true;
          }
          if (+coord.slice(0, 1) < 9) {
            newFieldsData["column" + (+coord.slice(0, 1) + 1)][
              +coord.slice(1)
            ].isBlocked = true;
          }
          if (+coord.slice(1) > 0) {
            newFieldsData["column" + coord.slice(0, 1)][
              +coord.slice(1) - 1
            ].isBlocked = true;
          }
          if (+coord.slice(1) < 9) {
            newFieldsData["column" + coord.slice(0, 1)][
              +coord.slice(1) + 1
            ].isBlocked = true;
          }

          if (+coord.slice(0, 1) < 9 && +coord.slice(1) < 9) {
            newFieldsData["column" + (+coord.slice(0, 1) + 1)][
              +coord.slice(1) + 1
            ].isBlocked = true;
          }
          if (+coord.slice(0, 1) > 0 && +coord.slice(1) > 0) {
            newFieldsData["column" + (+coord.slice(0, 1) - 1)][
              +coord.slice(1) - 1
            ].isBlocked = true;
          }
          if (+coord.slice(0, 1) < 9 && +coord.slice(1) > 0) {
            newFieldsData["column" + (+coord.slice(0, 1) + 1)][
              +coord.slice(1) - 1
            ].isBlocked = true;
          }
          if (+coord.slice(0, 1) > 0 && +coord.slice(1) < 9) {
            newFieldsData["column" + (+coord.slice(0, 1) - 1)][
              +coord.slice(1) + 1
            ].isBlocked = true;
          }
        });

        const isShipsTypePlaced = !playerShipsData[
          "deck" + shipTypeOnPlace
        ].find((ship) => ship.isPlaced === false);

        const nextShipTypeOnPlace = isShipsTypePlaced
          ? shipTypeOnPlace - 1
          : shipTypeOnPlace;
        const nextShipOnPlaced = nextShipTypeOnPlace
          ? playerShipsData["deck" + nextShipTypeOnPlace].find(
              (shipData) => !shipData.isPlaced
            )
          : nextShipTypeOnPlace;

        const isArrigementOver = !nextShipTypeOnPlace;

        placeCurrentShip({
          shipTypeOnPlace: nextShipTypeOnPlace,
          currentShipOnPlace: nextShipOnPlaced,
          playerField: newFieldsData,
          playerShipsData: currentShipsData,
          isAllShipPlaced: isArrigementOver,
        });
      }
    },
    [
      gameMode,
      isAllShipPlaced,
      placeCurrentShip,
      shipTypeOnPlace,
      currentShipOnPlace,
      playerField,
      playerShipsData,
    ]
  );

  const handleRotate = useCallback(
    (evt) => {
      if (gameMode === GameMode.ARRAGMENT) {
        const newCurrentShipOnPlace = { ...currentShipOnPlace };
        const newFieldsData = { ...playerField };

        newCurrentShipOnPlace.isVertical = !newCurrentShipOnPlace.isVertical;

        if (!checkCoordsOnBlock(newCurrentShipOnPlace.coords, newFieldsData)) {
          newCurrentShipOnPlace.coords.forEach((coord) => {
            newFieldsData["column" + coord.slice(0, 1)][
              coord.slice(1)
            ].isShip = false;
            newFieldsData["column" + coord.slice(0, 1)][
              coord.slice(1)
            ].isBlocked = false;
          });

          newCurrentShipOnPlace.coords = [];
          const columnNumber = +evt.target.id.slice(0, 1);
          const rowNumber = +evt.target.id.slice(1);
          const deckLength = +newCurrentShipOnPlace.id.slice(0, 1);

          if (newCurrentShipOnPlace.isVertical) {
            for (let i = 0; i < deckLength; i++) {
              if (deckLength <= 10 - rowNumber) {
                newCurrentShipOnPlace.coords.push(
                  columnNumber.toString() + (rowNumber + i)
                );
              } else {
                newCurrentShipOnPlace.coords.push(
                  columnNumber.toString() + (rowNumber - i)
                );
              }
            }
          } else {
            for (let i = 0; i < deckLength; i++) {
              if (deckLength <= 10 - columnNumber) {
                newCurrentShipOnPlace.coords.push(
                  (columnNumber + i).toString() + rowNumber
                );
              } else {
                newCurrentShipOnPlace.coords.push(
                  (columnNumber - i).toString() + rowNumber
                );
              }
            }
          }

          const isCoordsBloked = checkCoordsOnBlock(
            newCurrentShipOnPlace.coords,
            newFieldsData
          );

          if (!isCoordsBloked) {
            newCurrentShipOnPlace.coords.forEach((coord) => {
              newFieldsData["column" + coord.slice(0, 1)][
                coord.slice(1)
              ].isShip = true;
            });
          }
        }
        updateDataOnMouseOut(newCurrentShipOnPlace, newFieldsData);
      }
    },
    [gameMode, currentShipOnPlace, playerField, updateDataOnMouseOut]
  );

  return (
    <div className="game-board current-board">
      <div className="game">
        <ul className="game__column-name">
          {COLUMN_LETTERS.map((letter, i) => (
            <li key={i} className={"square"}>
              {letter}
            </li>
          ))}
        </ul>
        <ul className="game__row-name">
          {ROW_NUMBERS.map((item, i) => (
            <li key={i} className={"square"}>
              {i + 1}
            </li>
          ))}
        </ul>
        <Battlefield          
          fieldsData={playerField}                    
          onMouseOverHandler={handleMouseOver}
          onMouseOutHandler={handleMouseOut}
          onWheelRotateHandler={handleRotate}
          onBattlefieldClickHandler={handleBattlefieldClick}
          isPlayerField={IS_PLAYER_FIELD}
          gameMode={gameMode}
        />
      </div>
    </div>
  );
};

UserFiled.propTypes = {
  playerField: PropTypes.object.isRequired,
  playerShipsData: PropTypes.object.isRequired,
  currentShipOnPlace: PropTypes.object.isRequired,
  gameMode: PropTypes.string.isRequired,
  updateDataOnMouseOut: PropTypes.func.isRequired,
  updateUserFiled: PropTypes.func.isRequired,
  shipTypeOnPlace: PropTypes.number.isRequired,
  placeCurrentShip: PropTypes.func.isRequired,
  isAllShipPlaced: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  playerShipsData: state[NameSpace.PLAYER_SHIPS].playerShipsData,
  playerField: state[NameSpace.PLAYER_FIELD].playerField,
  currentShipOnPlace: state[NameSpace.PLAYER_SHIPS].currentShipOnPlace,
  gameMode: state[NameSpace.GAME_MODE].gameMode,
  shipTypeOnPlace: state[NameSpace.PLAYER_SHIPS].shipTypeOnPlace,
  isAllShipPlaced: state[NameSpace.PLAYER_SHIPS].isAllShipPlaced,
});

const mapDispatchToProps = (dispath) => ({
  updateDataOnMouseOut(newCurrentShip, newFields) {
    dispath(ActionCreator.updateShipOnPlace(newCurrentShip));
    dispath(ActionCreator.updateUserField(newFields));
  },
  updateUserFiled(newFields) {
    dispath(ActionCreator.updateUserField(newFields));
  },
  placeCurrentShip(nextShipData) {
    dispath(
      ActionCreator.placeShip({
        shipTypeOnPlace: nextShipData.shipTypeOnPlace,
        playerShipsData: nextShipData.playerShipsData,
        isAllShipPlaced: nextShipData.isAllShipPlaced,
      })
    );
    dispath(ActionCreator.updateUserField(nextShipData.playerField));
    dispath(ActionCreator.updateShipOnPlace(nextShipData.currentShipOnPlace));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(UserFiled);
