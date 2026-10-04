import React, { useCallback } from "react";
import { connect } from "react-redux";
import { NameSpace } from "../../store/reducers/root";
import type { RootState } from "../../store/reducers/root";
import Battlefield from "../battlefield/battlefield";
import { GameMode } from "../../const";
import { ActionCreator } from "../../store/action";
import type { Action, PlaceShipRequest, ShipOnPlace } from "../../store/action";
import type { Dispatch } from "redux";
import { checkCoordsOnBlock, cloneGameFieldData, GameFieldData } from "../../utils/fields";
import { cloneShipList, ShipList, Ship } from "../../utils/ships";
import { GameModeType } from "../../const";

const COLUMN_LETTERS = ["", "А", "Б", "В", "Г", "Д", "Е", "Ж", "З", "И", "К"];
const ROW_NUMBERS = Array(10).fill(null);
const IS_PLAYER_FIELD = true;

/** Отличает уже выбранный корабль от пустого объекта-заглушки в состоянии. */
const isShipOnPlace = (value: ShipOnPlace): value is Ship =>
  `id` in value && `coords` in value;

interface UserFieldProps {
  playerField: GameFieldData;
  playerShipsData: ShipList;
  currentShipOnPlace: ShipOnPlace;
  updateDataOnMouseOut: (newCurrentShip: Ship, newFields: GameFieldData) => void;
  gameMode: GameModeType;
  updateUserFiled: (newFields: GameFieldData) => void;
  placeCurrentShip: (nextShipData: PlaceShipRequest) => void;
  shipTypeOnPlace: number;
  isAllShipPlaced: boolean;
}

const UserField: React.FC<UserFieldProps> = ({
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
    (evtOver: React.MouseEvent) => {
      if (gameMode === GameMode.ARRAGMENT && !isAllShipPlaced && isShipOnPlace(currentShipOnPlace)) {
        const newCurrentShipOnPlace = { ...currentShipOnPlace };
        newCurrentShipOnPlace.coords = [];

        const columnNumber = +(evtOver.target as HTMLElement).id.slice(0, 1);
        const rowNumber = +(evtOver.target as HTMLElement).id.slice(1);
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
          const newFieldsData = cloneGameFieldData(playerField);
          newCurrentShipOnPlace.coords.forEach((coord) => {
            newFieldsData["column" + coord.slice(0, 1)][
              parseInt(coord.slice(1))
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
    (evtOut: React.MouseEvent) => {
      if (
        gameMode === GameMode.ARRAGMENT &&
        isShipOnPlace(currentShipOnPlace) &&
        !isAllShipPlaced &&
        !(evtOut.target as HTMLElement).classList.contains(".ship")
      ) {
        const newCurrentShipOnPlace = { ...currentShipOnPlace };
        const newFieldsData = cloneGameFieldData(playerField);

        if (!checkCoordsOnBlock(newCurrentShipOnPlace.coords, newFieldsData)) {
          newCurrentShipOnPlace.coords.forEach((coord) => {
            newFieldsData["column" + coord.slice(0, 1)][
              parseInt(coord.slice(1))
            ].isShip = false;
            newFieldsData["column" + coord.slice(0, 1)][
              parseInt(coord.slice(1))
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
    (evt: React.MouseEvent) => {
      if (
        gameMode === GameMode.ARRAGMENT &&
        (evt.target as HTMLElement).tagName === "LI" &&
        !isAllShipPlaced &&
        isShipOnPlace(currentShipOnPlace) &&
        !checkCoordsOnBlock(currentShipOnPlace.coords, playerField)
      ) {
        const shipType = "deck" + currentShipOnPlace.id.slice(0, 1);
        const shipNumber = +currentShipOnPlace.id.slice(-1);

        const newCurrentShipOnPlace = { ...currentShipOnPlace };
        newCurrentShipOnPlace.isPlaced = true;
        const currentShipsData = cloneShipList(playerShipsData);
        currentShipsData[shipType as keyof ShipList][shipNumber] = newCurrentShipOnPlace;

        const newFieldsData = cloneGameFieldData(playerField);
        newCurrentShipOnPlace.coords.forEach((coord) => {
          newFieldsData["column" + coord.slice(0, 1)][
            parseInt(coord.slice(1))
          ].isShip = true;
          newFieldsData["column" + coord.slice(0, 1)][
            parseInt(coord.slice(1))
          ].isBlocked = true;
          newFieldsData["column" + coord.slice(0, 1)][parseInt(coord.slice(1))].shipID =
            newCurrentShipOnPlace.id;

          if (+coord.slice(0, 1) > 0) {
            newFieldsData["column" + (+coord.slice(0, 1) - 1)][
              parseInt(coord.slice(1))
            ].isBlocked = true;
          }
          if (+coord.slice(0, 1) < 9) {
            newFieldsData["column" + (+coord.slice(0, 1) + 1)][
              parseInt(coord.slice(1))
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
          "deck" + shipTypeOnPlace as keyof ShipList
        ].find((ship) => ship.isPlaced === false);

        const nextShipTypeOnPlace = isShipsTypePlaced
          ? shipTypeOnPlace - 1
          : shipTypeOnPlace;
        const nextShipOnPlaced = nextShipTypeOnPlace
          ? playerShipsData["deck" + nextShipTypeOnPlace as keyof ShipList].find(
              (shipData) => !shipData.isPlaced
            )
          : null;

        const isArrigementOver = !nextShipTypeOnPlace;

        placeCurrentShip({
          shipTypeOnPlace: nextShipTypeOnPlace,
          currentShipOnPlace: nextShipOnPlaced ?? {},
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
    (evt: React.WheelEvent) => {
      if (gameMode === GameMode.ARRAGMENT && isShipOnPlace(currentShipOnPlace)) {
        const newCurrentShipOnPlace = { ...currentShipOnPlace };
        const newFieldsData = cloneGameFieldData(playerField);

        newCurrentShipOnPlace.isVertical = !newCurrentShipOnPlace.isVertical;

        if (!checkCoordsOnBlock(newCurrentShipOnPlace.coords, newFieldsData)) {
          newCurrentShipOnPlace.coords.forEach((coord) => {
            newFieldsData["column" + coord.slice(0, 1)][
              parseInt(coord.slice(1))
            ].isShip = false;
            newFieldsData["column" + coord.slice(0, 1)][
              parseInt(coord.slice(1))
            ].isBlocked = false;
          });

          newCurrentShipOnPlace.coords = [];
          const columnNumber = +(evt.target as HTMLElement).id.slice(0, 1);
          const rowNumber = +(evt.target as HTMLElement).id.slice(1);
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
                newCurrentShipOnPlace.coords.push((columnNumber + i).toString() + rowNumber);
              } else {
                newCurrentShipOnPlace.coords.push((columnNumber - i).toString() + rowNumber);
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
                parseInt(coord.slice(1))
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

const mapStateToProps = (state: RootState) => ({
  playerShipsData: state[NameSpace.PLAYER_SHIPS].playerShipsData,
  playerField: state[NameSpace.PLAYER_FIELD].playerField,
  currentShipOnPlace: state[NameSpace.PLAYER_SHIPS].currentShipOnPlace,
  gameMode: state[NameSpace.GAME_MODE].gameMode,
  shipTypeOnPlace: state[NameSpace.PLAYER_SHIPS].shipTypeOnPlace,
  isAllShipPlaced: state[NameSpace.PLAYER_SHIPS].isAllShipPlaced,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  updateDataOnMouseOut(newCurrentShip: Ship, newFields: GameFieldData) {
    dispatch(ActionCreator.updateShipOnPlace(newCurrentShip));
    dispatch(ActionCreator.updateUserField(newFields));
  },
  updateUserFiled(newFields: GameFieldData) {
    dispatch(ActionCreator.updateUserField(newFields));
  },
  placeCurrentShip(nextShipData: PlaceShipRequest) {
    dispatch(
      ActionCreator.placeShip({
        shipTypeOnPlace: nextShipData.shipTypeOnPlace,
        playerShipsData: nextShipData.playerShipsData,
        isAllShipPlaced: nextShipData.isAllShipPlaced,
      })
    );
    dispatch(ActionCreator.updateUserField(nextShipData.playerField));
    dispatch(ActionCreator.updateShipOnPlace(nextShipData.currentShipOnPlace));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(UserField);
