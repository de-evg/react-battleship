export const generatePlayerMove = (
  target,
  opponentFieldData,
  shipsData,
  gameData
) => {
  const newOpponentFieldData = { ...opponentFieldData };
  const newGameData = { ...gameData };
  const newShipsData = { ...shipsData };
  if (
    !newOpponentFieldData["column" + target.id.slice(0, 1)][target.id.slice(-1)]
      .isHit ||
    !newOpponentFieldData["column" + target.id.slice(0, 1)][target.id.slice(-1)]
      .isMiss
  ) {
    const columnNumber = target.id.slice(0, 1);
    const rowNumber = target.id.slice(1);

    const checkFieldOnShip = () => {
      const isShip =
        newOpponentFieldData["column" + columnNumber][rowNumber].isShip;
      return isShip;
    };

    const onHit = () => {
      const shipType = newOpponentFieldData["column" + columnNumber][
        rowNumber
      ].shipID.slice(0, 1);
      const shipNumber = newOpponentFieldData["column" + columnNumber][
        rowNumber
      ].shipID.slice(-1);
      const shipOnFire = newShipsData["deck" + shipType][shipNumber];

      const updateShipsOnHit = () => {
        if (shipOnFire.hits.length > 0) {
          shipOnFire.hits.splice(0, 1);
          shipOnFire.isDestroyed = shipOnFire.hits.length === 0 ? true : false;
        } else {
          shipOnFire.isDestroyed = true;
        }
        newShipsData["deck" + shipType][shipNumber] = shipOnFire;
      };

      const updateFieldOnHit = () => {
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

    const onMiss = () => {
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
