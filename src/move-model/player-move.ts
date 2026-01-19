import { GameFieldData } from "../utils/fields";
import { ShipList } from "../utils/ships";

interface PlayerMoveResult {
  opponentShipsData: ShipList;
  opponentField: GameFieldData;
  singleplayerGame: any;
}

export const generatePlayerMove = (
  target: { id: string },
  opponentFieldData: GameFieldData,
  shipsData: ShipList,
  gameData: any
): PlayerMoveResult | undefined => {
  const newOpponentFieldData = { ...opponentFieldData };
  const newGameData = { ...gameData };
  const newShipsData = { ...shipsData };
  if (
    !newOpponentFieldData["column" + target.id.slice(0, 1)][parseInt(target.id.slice(-1))]
      .isHit ||
    !newOpponentFieldData["column" + target.id.slice(0, 1)][parseInt(target.id.slice(-1))]
      .isMiss
  ) {
    const columnNumber = target.id.slice(0, 1);
    const rowNumber = parseInt(target.id.slice(1));

    const checkFieldOnShip = (): boolean => {
      const isShip =
        newOpponentFieldData["column" + columnNumber][rowNumber].isShip;
      return isShip;
    };

    const onHit = (): void => {
      const shipType = newOpponentFieldData["column" + columnNumber][
        rowNumber
      ].shipID!.slice(0, 1);
      const shipNumber = newOpponentFieldData["column" + columnNumber][
        rowNumber
      ].shipID!.slice(-1);
      const shipOnFire = newShipsData["deck" + shipType as keyof ShipList][parseInt(shipNumber)];

      const updateShipsOnHit = (): void => {
        if (shipOnFire.hits.length > 0) {
          shipOnFire.hits.splice(0, 1);
          shipOnFire.isDestroyed = shipOnFire.hits.length === 0 ? true : false;
        } else {
          shipOnFire.isDestroyed = true;
        }
        newShipsData["deck" + shipType as keyof ShipList][parseInt(shipNumber)] = shipOnFire;
      };

      const updateFieldOnHit = (): void => {
        newOpponentFieldData["column" + columnNumber][rowNumber].isHit = true;
        if (shipOnFire.isDestroyed) {
          shipOnFire.coords.forEach((coord) => {
            let columnNumber = +coord.slice(0, 1);
            let rowNumber = +coord.slice(-1);
            newOpponentFieldData["column" + columnNumber][
              rowNumber
            ].isDestroyed = true;

            if (
              columnNumber > 0 &&
              !newOpponentFieldData["column" + (columnNumber - 1)][rowNumber]
                .isShip
            ) {
              newOpponentFieldData["column" + (columnNumber - 1)][
                rowNumber
              ].isMiss = true;
            }
            if (
              columnNumber < 9 &&
              !newOpponentFieldData["column" + (columnNumber + 1)][rowNumber]
                .isShip
            ) {
              newOpponentFieldData["column" + (columnNumber + 1)][
                rowNumber
              ].isMiss = true;
            }
            if (
              rowNumber > 0 &&
              !newOpponentFieldData["column" + columnNumber][rowNumber - 1]
                .isShip
            ) {
              newOpponentFieldData["column" + columnNumber][
                rowNumber - 1
              ].isMiss = true;
            }
            if (
              rowNumber < 9 &&
              !newOpponentFieldData["column" + columnNumber][rowNumber + 1]
                .isShip
            ) {
              newOpponentFieldData["column" + columnNumber][
                rowNumber + 1
              ].isMiss = true;
            }

            if (columnNumber < 9 && rowNumber < 9 && !newOpponentFieldData["column" + (columnNumber + 1)][
              rowNumber + 1
            ].isShip) {
              newOpponentFieldData["column" + (+columnNumber + 1)][
                +rowNumber + 1
              ].isMiss = true;
            }
            if (columnNumber > 0 && rowNumber > 0 && !newOpponentFieldData["column" + (columnNumber - 1)][
              rowNumber - 1
            ].isShip) {
              newOpponentFieldData["column" + (+columnNumber - 1)][
                +rowNumber - 1
              ].isMiss = true;
            }
            if (columnNumber < 9 && rowNumber > 0 && !newOpponentFieldData["column" + (columnNumber + 1)][
              rowNumber - 1
            ].isShip) {
              newOpponentFieldData["column" + (+columnNumber + 1)][
                +rowNumber - 1
              ].isMiss = true;
            }
            if (columnNumber > 0 && rowNumber < 9 && !newOpponentFieldData["column" + (columnNumber - 1)][
              +rowNumber + 1
            ].isShip) {
              newOpponentFieldData["column" + (+columnNumber - 1)][
                +rowNumber + 1
              ].isMiss = true;
            }
          });
        }
      };
      updateShipsOnHit();
      updateFieldOnHit();
    };

    const onMiss = (): void => {
      newOpponentFieldData["column" + columnNumber][rowNumber].isMiss = true;
      newGameData.isReplayMove = false;
      newGameData.isPlayerMove = false;
    };

    checkFieldOnShip() ? onHit() : onMiss();

    return {
      opponentShipsData: newShipsData,
      opponentField: newOpponentFieldData,
      singleplayerGame: newGameData,
    };
  }
};
