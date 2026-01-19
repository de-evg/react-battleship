import {ShotStatus} from "../const";
import { generateRandomNumber } from "../utils/common";
import { GameFieldData } from "../utils/fields";
import { ShipList } from "../utils/ships";
import { SingleplayerGameState } from "../store/reducers/singleplayer-game/singleplayer-game";

interface ComputerMoveResult {
  playerField: GameFieldData;
  playerShipsData: ShipList;
  singleplayerGame: SingleplayerGameState;
}

export const generateComputerMove = (
  playerField: GameFieldData,
  playerShipsData: ShipList,
  singleplayerGameData: SingleplayerGameState
): ComputerMoveResult => {
  const nextAimList = [ ...singleplayerGameData.aimList ];
  const generateRandomAimIndex = (): number =>
    generateRandomNumber(0, nextAimList.length);

  const nextPlayerField = { ...playerField };
  const shipsData = { ...playerShipsData };
  const gameData = { ...singleplayerGameData };

  const changeDirection = (gameData: SingleplayerGameState): void => {
    gameData.isDirectionToUpper = !gameData.isDirectionToUpper;
    gameData.isDirectionChanged = !gameData.isDirectionChanged;
  };

  const changeOrientation = (gameData: SingleplayerGameState): void => {
    gameData.isVertical = !gameData.isVertical;
    gameData.isOrietationChanged = !gameData.isOrietationChanged;
  };

  const shot = (aimIndex: number): void => {
    const aimNumber = nextAimList.splice(aimIndex, 1);
    gameData.aimList = nextAimList;
    gameData.computerLastShot = aimNumber[0];

    const column = aimNumber[0].slice(0, 1);
    const row = parseInt(aimNumber[0].slice(1));

    const onHit = (): void => {
      const shipType = nextPlayerField["column" + column][row].shipID!.slice(
        0,
        1
      );
      const shipNumber = nextPlayerField["column" + column][row].shipID!.slice(
        -1
      );
      const shipOnFire = shipsData["deck" + shipType as keyof ShipList][parseInt(shipNumber)];

      const updateShipsData = (): void => {
        if (shipOnFire.hits.length) {
          shipOnFire.hits.splice(0, 1);
        }
        shipOnFire.isDestroyed = shipOnFire.hits.length === 0 ? true : false;
        shipsData["deck" + shipType as keyof ShipList][parseInt(shipNumber)] = shipOnFire;
      };

      const updateFieldsData = (): void => {
        nextPlayerField["column" + column][row].isHit = true;
        if (shipOnFire.isDestroyed) {
          const splitedElements: string[][] = [];
          shipOnFire.coords.forEach((coord) => {
            let columnNumber = coord.slice(0, 1);
            let rowNumber = parseInt(coord.slice(-1));
            nextPlayerField["column" + columnNumber][
              rowNumber
            ].isDestroyed = true;
            if (+columnNumber > 0) {
              if (
                !nextPlayerField["column" + (+columnNumber - 1)][rowNumber]
                  .isShip
              ) {
                nextPlayerField["column" + (+columnNumber - 1)][
                  rowNumber
                ].isBlocked = true;
                nextPlayerField["column" + (+columnNumber - 1)][
                  rowNumber
                ].isMiss = true;
                const aimIndex = nextAimList.findIndex(
                  (aim) => aim === (+columnNumber - 1).toString() + rowNumber
                );
                if (aimIndex !== -1) {
                  const el = nextAimList.splice(aimIndex, 1);
                  splitedElements.push(el);
                }
              }
            }
            if (+columnNumber < 9) {
              if (
                !nextPlayerField["column" + (+columnNumber + 1)][rowNumber]
                  .isShip
              ) {
                nextPlayerField["column" + (+columnNumber + 1)][
                  rowNumber
                ].isBlocked = true;
                nextPlayerField["column" + (+columnNumber + 1)][
                  rowNumber
                ].isMiss = true;
                const aimIndex = nextAimList.findIndex(
                  (aim) => aim === (+columnNumber + 1).toString() + rowNumber
                );
                if (aimIndex !== -1) {
                  const el = nextAimList.splice(aimIndex, 1);
                  splitedElements.push(el);
                }
              }
            }
            if (+rowNumber > 0) {
              if (
                !nextPlayerField["column" + columnNumber][+rowNumber - 1].isShip
              ) {
                nextPlayerField["column" + columnNumber][
                  +rowNumber - 1
                ].isBlocked = true;
                nextPlayerField["column" + columnNumber][
                  +rowNumber - 1
                ].isMiss = true;
                const aimIndex = nextAimList.findIndex(
                  (aim) => aim === columnNumber + (+rowNumber - 1).toString()
                );
                if (aimIndex !== -1) {
                  const el = nextAimList.splice(aimIndex, 1);
                  splitedElements.push(el);
                }
              }
            }
            if (+rowNumber < 9) {
              if (
                !nextPlayerField["column" + columnNumber][+rowNumber + 1].isShip
              ) {
                nextPlayerField["column" + columnNumber][
                  +rowNumber + 1
                ].isBlocked = true;
                nextPlayerField["column" + columnNumber][
                  +rowNumber + 1
                ].isMiss = true;
                const aimIndex = nextAimList.findIndex(
                  (aim) => aim === columnNumber + (+rowNumber + 1).toString()
                );
                if (aimIndex !== -1) {
                  const el = nextAimList.splice(aimIndex, 1);
                  splitedElements.push(el);
                }
              }
            }
            if (+columnNumber < 9 && +rowNumber < 9) {
              nextPlayerField["column" + (+columnNumber + 1)][
                +rowNumber + 1
              ].isBlocked = true;
              nextPlayerField["column" + (+columnNumber + 1)][
                +rowNumber + 1
              ].isMiss = true;
              const aimIndex = nextAimList.findIndex(
                (aim) =>
                  aim ===
                  (+columnNumber + 1).toString() + (+rowNumber + 1).toString()
              );
              if (aimIndex !== -1) {
                const el = nextAimList.splice(aimIndex, 1);
                splitedElements.push(el);
              }
            }
            if (+columnNumber > 0 && +rowNumber > 0) {
              nextPlayerField["column" + (+columnNumber - 1)][
                +rowNumber - 1
              ].isBlocked = true;
              nextPlayerField["column" + (+columnNumber - 1)][
                +rowNumber - 1
              ].isMiss = true;
              const aimIndex = nextAimList.findIndex(
                (aim) =>
                  aim ===
                  (+columnNumber - 1).toString() + (+rowNumber - 1).toString()
              );
              if (aimIndex !== -1) {
                const el = nextAimList.splice(aimIndex, 1);
                splitedElements.push(el);
              }
            }
            if (+columnNumber < 9 && +rowNumber > 0) {
              nextPlayerField["column" + (+columnNumber + 1)][
                +rowNumber - 1
              ].isBlocked = true;
              nextPlayerField["column" + (+columnNumber + 1)][
                +rowNumber - 1
              ].isMiss = true;
              const aimIndex = nextAimList.findIndex(
                (aim) =>
                  aim ===
                  (+columnNumber + 1).toString() + (+rowNumber - 1).toString()
              );
              if (aimIndex !== -1) {
                const el = nextAimList.splice(aimIndex, 1);
                splitedElements.push(el);
              }
            }
            if (+columnNumber > 0 && +rowNumber < 9) {
              nextPlayerField["column" + (+columnNumber - 1)][
                +rowNumber + 1
              ].isBlocked = true;
              nextPlayerField["column" + (+columnNumber - 1)][
                +rowNumber + 1
              ].isMiss = true;
              const aimIndex = nextAimList.findIndex(
                (aim) =>
                  aim ===
                  (+columnNumber - 1).toString() + (+rowNumber + 1).toString()
              );
              if (aimIndex !== -1) {
                const el = nextAimList.splice(aimIndex, 1);
                splitedElements.push(el);
              }
            }            
          });
        }
      };

      const generateIntendedAims = (): void => {
        gameData.computerLastShot = aimNumber[0];

        if (
          gameData.intendedAims.verticalUp.length === 0 &&
          gameData.intendedAims.verticalDown.length === 0 &&
          gameData.intendedAims.horizontalUp.length === 0 &&
          gameData.intendedAims.horizontalDown.length === 0
        ) {
          let column = gameData.computerLastShot.slice(0, 1);
          let row = gameData.computerLastShot.slice(1);
          let columnUp = column;
          let columnDown = column;
          let rowUp = row;
          let rowDown = row;

          const checkCoords = (coord: string): number =>
            nextAimList.findIndex((aimCoord) => aimCoord === coord);

          if (+column === 0 && +row === 0) {
            for (let i = 0; i < +shipOnFire.id.slice(0, 1) - 1; i++) {
              let checkedCoordIndex = checkCoords(
                (+columnUp + 1).toString() + row
              );
              if (checkedCoordIndex !== -1) {
                if (i > 0 && gameData.intendedAims.horizontalUp.length > 0) {
                  gameData.intendedAims.horizontalUp.push(
                    nextAimList[checkedCoordIndex]
                  );
                }
                if (i === 0) {
                  gameData.intendedAims.horizontalUp.push(
                    nextAimList[checkedCoordIndex]
                  );
                }
              }

              checkedCoordIndex = checkCoords(column + (+rowUp + 1).toString());
              if (checkedCoordIndex !== -1) {
                if (i > 0 && gameData.intendedAims.verticalUp.length > 0) {
                  gameData.intendedAims.verticalUp.push(
                    nextAimList[checkedCoordIndex]
                  );
                }
                if (i === 0) {
                  gameData.intendedAims.verticalUp.push(
                    nextAimList[checkedCoordIndex]
                  );
                }
              }

              if (+columnUp < 9) {
                columnUp = (+columnUp + 1).toString();
              }
              if (+rowUp < 9) {
                rowUp = (+rowUp + 1).toString();
              }
            }
          }

          if (+column === 9 && +row === 0) {
            for (let i = 0; i < +shipOnFire.id.slice(0, 1) - 1; i++) {
              let checkedCoordIndex = checkCoords(
                (+columnDown - 1).toString() + row
              );
              if (checkedCoordIndex !== -1) {
                if (i > 0 && gameData.intendedAims.horizontalDown.length > 0) {
                  gameData.intendedAims.horizontalDown.push(
                    nextAimList[checkedCoordIndex]
                  );
                }
                if (i === 0) {
                  gameData.intendedAims.horizontalDown.push(
                    nextAimList[checkedCoordIndex]
                  );
                }
              }

              checkedCoordIndex = checkCoords(column + (+rowUp + 1).toString());
              if (checkedCoordIndex !== -1) {
                if (i > 0 && gameData.intendedAims.verticalUp.length > 0) {
                  gameData.intendedAims.verticalUp.push(
                    nextAimList[checkedCoordIndex]
                  );
                }
                if (i === 0) {
                  gameData.intendedAims.verticalUp.push(
                    nextAimList[checkedCoordIndex]
                  );
                }
              }

              if (+columnDown > 0) {
                columnDown = (+columnDown - 1).toString();
              }
              if (+rowUp < 9) {
                rowUp = (+rowUp + 1).toString();
              }
            }
          }

          if (+column === 9 && +row === 9) {
            for (let i = 0; i < +shipOnFire.id.slice(0, 1) - 1; i++) {
              let checkedCoordIndex = checkCoords(
                (+columnDown - 1).toString() + row
              );
              if (checkedCoordIndex !== -1) {
                if (i > 0 && gameData.intendedAims.horizontalDown.length > 0) {
                  gameData.intendedAims.horizontalDown.push(
                    nextAimList[checkedCoordIndex]
                  );
                }
                if (i === 0) {
                  gameData.intendedAims.horizontalDown.push(
                    nextAimList[checkedCoordIndex]
                  );
                }
              }

              checkedCoordIndex = checkCoords(
                column + (+rowDown - 1).toString()
              );
              if (checkedCoordIndex !== -1) {
                if (i > 0 && gameData.intendedAims.verticalDown.length > 0) {
                  gameData.intendedAims.verticalDown.push(
                    nextAimList[checkedCoordIndex]
                  );
                }
                if (i === 0) {
                  gameData.intendedAims.verticalDown.push(
                    nextAimList[checkedCoordIndex]
                  );
                }
              }

              if (+columnDown > 0) {
                columnDown = (+columnDown - 1).toString();
              }
              if (+rowUp > 0) {
                rowUp = (+rowUp - 1).toString();
              }
            }
          }

          if (+column === 0 && +row === 9) {
            for (let i = 0; i < +shipOnFire.id.slice(0, 1) - 1; i++) {
              let checkedCoordIndex = checkCoords(
                (+columnUp + 1).toString() + row
              );
              if (checkedCoordIndex !== -1) {
                if (i > 0 && gameData.intendedAims.horizontalUp.length > 0) {
                  gameData.intendedAims.horizontalUp.push(
                    nextAimList[checkedCoordIndex]
                  );
                }
                if (i === 0) {
                  gameData.intendedAims.horizontalUp.push(
                    nextAimList[checkedCoordIndex]
                  );
                }
              }

              checkedCoordIndex = checkCoords(
                column + (+rowDown - 1).toString()
              );
              if (checkedCoordIndex !== -1) {
                if (i > 0 && gameData.intendedAims.verticalDown.length > 0) {
                  gameData.intendedAims.verticalDown.push(
                    nextAimList[checkedCoordIndex]
                  );
                }
                if (i === 0) {
                  gameData.intendedAims.verticalDown.push(
                    nextAimList[checkedCoordIndex]
                  );
                }
              }

              if (+columnUp < 9) {
                columnUp = (+columnUp + 1).toString();
              }
              if (+rowDown > 0) {
                rowDown = (+rowDown - 1).toString();
              }
            }
          }

          if (+column > 0 && +column < 9 && +row === 0) {
            for (let i = 0; i < +shipOnFire.id.slice(0, 1) - 1; i++) {
              let checkedCoordIndex = checkCoords(
                (+columnUp + 1).toString() + row
              );
              if (checkedCoordIndex !== -1) {
                if (i > 0 && gameData.intendedAims.horizontalUp.length > 0) {
                  gameData.intendedAims.horizontalUp.push(
                    nextAimList[checkedCoordIndex]
                  );
                }
                if (i === 0) {
                  gameData.intendedAims.horizontalUp.push(
                    nextAimList[checkedCoordIndex]
                  );
                }
              }

              checkedCoordIndex = checkCoords(
                (+columnDown - 1).toString() + row
              );
              if (checkedCoordIndex !== -1) {
                if (i > 0 && gameData.intendedAims.horizontalDown.length > 0) {
                  gameData.intendedAims.horizontalDown.push(
                    nextAimList[checkedCoordIndex]
                  );
                }
                if (i === 0) {
                  gameData.intendedAims.horizontalDown.push(
                    nextAimList[checkedCoordIndex]
                  );
                }
              }

              checkedCoordIndex = checkCoords(column + (+rowUp + 1).toString());
              if (checkedCoordIndex !== -1) {
                if (i > 0 && gameData.intendedAims.verticalUp.length > 0) {
                  gameData.intendedAims.verticalUp.push(
                    nextAimList[checkedCoordIndex]
                  );
                }
                if (i === 0) {
                  gameData.intendedAims.verticalUp.push(
                    nextAimList[checkedCoordIndex]
                  );
                }
              }

              checkedCoordIndex = checkCoords(
                column + (+rowDown - 1).toString()
              );
              if (checkedCoordIndex !== -1) {
                if (i > 0 && gameData.intendedAims.verticalDown.length > 0) {
                  gameData.intendedAims.verticalDown.push(
                    nextAimList[checkedCoordIndex]
                  );
                }
                if (i === 0) {
                  gameData.intendedAims.verticalDown.push(
                    nextAimList[checkedCoordIndex]
                  );
                }
              }

              if (+columnUp < 9) {
                columnUp = (+columnUp + 1).toString();
              }
              if (+columnDown > 0) {
                columnDown = (+columnDown - 1).toString();
              }
              if (+rowUp < 9) {
                rowUp = (+rowUp + 1).toString();
              }
            }
          }

          if (+column > 0 && +column < 9 && +row === 9) {
            for (let i = 0; i < +shipOnFire.id.slice(0, 1) - 1; i++) {
              let checkedCoordIndex = checkCoords(
                (+columnUp + 1).toString() + row
              );
              if (checkedCoordIndex !== -1) {
                if (i > 0 && gameData.intendedAims.horizontalUp.length > 0) {
                  gameData.intendedAims.horizontalUp.push(
                    nextAimList[checkedCoordIndex]
                  );
                }
                if (i === 0) {
                  gameData.intendedAims.horizontalUp.push(
                    nextAimList[checkedCoordIndex]
                  );
                }
              }

              checkedCoordIndex = checkCoords(
                (+columnDown - 1).toString() + row
              );
              if (checkedCoordIndex !== -1) {
                if (i > 0 && gameData.intendedAims.horizontalDown.length > 0) {
                  gameData.intendedAims.horizontalDown.push(
                    nextAimList[checkedCoordIndex]
                  );
                }
                if (i === 0) {
                  gameData.intendedAims.horizontalDown.push(
                    nextAimList[checkedCoordIndex]
                  );
                }
              }

              checkedCoordIndex = checkCoords(
                column + (+rowDown - 1).toString()
              );
              if (checkedCoordIndex !== -1) {
                if (i > 0 && gameData.intendedAims.verticalDown.length > 0) {
                  gameData.intendedAims.verticalDown.push(
                    nextAimList[checkedCoordIndex]
                  );
                }
                if (i === 0) {
                  gameData.intendedAims.verticalDown.push(
                    nextAimList[checkedCoordIndex]
                  );
                }
              }

              if (+columnUp < 9) {
                columnUp = (+columnUp + 1).toString();
              }
              if (+columnDown > 0) {
                columnDown = (+columnDown - 1).toString();
              }
              if (+rowDown > 0) {
                rowDown = (+rowDown - 1).toString();
              }
            }
          }

          if (+column === 0 && +row > 0 && +row < 9) {
            for (let i = 0; i < +shipOnFire.id.slice(0, 1) - 1; i++) {
              let checkedCoordIndex = checkCoords(
                (+columnUp + 1).toString() + row
              );
              if (checkedCoordIndex !== -1) {
                if (i > 0 && gameData.intendedAims.horizontalUp.length > 0) {
                  gameData.intendedAims.horizontalUp.push(
                    nextAimList[checkedCoordIndex]
                  );
                }
                if (i === 0) {
                  gameData.intendedAims.horizontalUp.push(
                    nextAimList[checkedCoordIndex]
                  );
                }
              }

              checkedCoordIndex = checkCoords(column + (+rowUp + 1).toString());
              if (checkedCoordIndex !== -1) {
                if (i > 0 && gameData.intendedAims.verticalUp.length > 0) {
                  gameData.intendedAims.verticalUp.push(
                    nextAimList[checkedCoordIndex]
                  );
                }
                if (i === 0) {
                  gameData.intendedAims.verticalUp.push(
                    nextAimList[checkedCoordIndex]
                  );
                }
              }

              checkedCoordIndex = checkCoords(
                column + (+rowDown - 1).toString()
              );
              if (checkedCoordIndex !== -1) {
                if (i > 0 && gameData.intendedAims.verticalDown.length > 0) {
                  gameData.intendedAims.verticalDown.push(
                    nextAimList[checkedCoordIndex]
                  );
                }
                if (i === 0) {
                  gameData.intendedAims.verticalDown.push(
                    nextAimList[checkedCoordIndex]
                  );
                }
              }

              if (+columnUp < 9) {
                columnUp = (+columnUp + 1).toString();
              }
              if (+rowUp < 9) {
                rowUp = (+rowUp + 1).toString();
              }
              if (+rowDown > 0) {
                rowDown = (+rowDown - 1).toString();
              }
            }
          }

          if (+column === 9 && +row > 0 && +row < 9) {
            for (let i = 0; i < +shipOnFire.id.slice(0, 1) - 1; i++) {
              let checkedCoordIndex = checkCoords(
                (+columnDown - 1).toString() + row
              );
              if (checkedCoordIndex !== -1) {
                if (i > 0 && gameData.intendedAims.horizontalDown.length > 0) {
                  gameData.intendedAims.horizontalDown.push(
                    nextAimList[checkedCoordIndex]
                  );
                }
                if (i === 0) {
                  gameData.intendedAims.horizontalDown.push(
                    nextAimList[checkedCoordIndex]
                  );
                }
              }

              checkedCoordIndex = checkCoords(column + (+rowUp + 1).toString());
              if (checkedCoordIndex !== -1) {
                if (i > 0 && gameData.intendedAims.verticalUp.length > 0) {
                  gameData.intendedAims.verticalUp.push(
                    nextAimList[checkedCoordIndex]
                  );
                }
                if (i === 0) {
                  gameData.intendedAims.verticalUp.push(
                    nextAimList[checkedCoordIndex]
                  );
                }
              }

              checkedCoordIndex = checkCoords(
                column + (+rowDown - 1).toString()
              );
              if (checkedCoordIndex !== -1) {
                if (i > 0 && gameData.intendedAims.verticalDown.length > 0) {
                  gameData.intendedAims.verticalDown.push(
                    nextAimList[checkedCoordIndex]
                  );
                }
                if (i === 0) {
                  gameData.intendedAims.verticalDown.push(
                    nextAimList[checkedCoordIndex]
                  );
                }
              }

              if (+columnDown > 0) {
                columnDown = (+columnDown - 1).toString();
              }
              if (+rowUp < 9) {
                rowUp = (+rowUp + 1).toString();
              }
              if (+rowDown > 0) {
                rowDown = (+rowDown - 1).toString();
              }
            }
          }

          if (+column > 0 && +column < 9 && +row > 0 && +row < 9) {
            for (let i = 0; i < +shipOnFire.id.slice(0, 1) - 1; i++) {
              let checkedCoordIndex = checkCoords(
                (+columnUp + 1).toString() + row
              );
              if (checkedCoordIndex !== -1) {
                if (i > 0 && gameData.intendedAims.horizontalUp.length > 0) {
                  gameData.intendedAims.horizontalUp.push(
                    nextAimList[checkedCoordIndex]
                  );
                }
                if (i === 0) {
                  gameData.intendedAims.horizontalUp.push(
                    nextAimList[checkedCoordIndex]
                  );
                }
              }

              checkedCoordIndex = checkCoords(
                (+columnDown - 1).toString() + row
              );
              if (checkedCoordIndex !== -1) {
                if (i > 0 && gameData.intendedAims.horizontalDown.length > 0) {
                  gameData.intendedAims.horizontalDown.push(
                    nextAimList[checkedCoordIndex]
                  );
                }
                if (i === 0) {
                  gameData.intendedAims.horizontalDown.push(
                    nextAimList[checkedCoordIndex]
                  );
                }
              }

              checkedCoordIndex = checkCoords(column + (+rowUp + 1).toString());
              if (checkedCoordIndex !== -1) {
                if (i > 0 && gameData.intendedAims.verticalUp.length > 0) {
                  gameData.intendedAims.verticalUp.push(
                    nextAimList[checkedCoordIndex]
                  );
                }
                if (i === 0) {
                  gameData.intendedAims.verticalUp.push(
                    nextAimList[checkedCoordIndex]
                  );
                }
              }

              checkedCoordIndex = checkCoords(
                column + (+rowDown - 1).toString()
              );
              if (checkedCoordIndex !== -1) {
                if (i > 0 && gameData.intendedAims.verticalDown.length > 0) {
                  gameData.intendedAims.verticalDown.push(
                    nextAimList[checkedCoordIndex]
                  );
                }
                if (i === 0) {
                  gameData.intendedAims.verticalDown.push(
                    nextAimList[checkedCoordIndex]
                  );
                }
              }

              if (+columnUp < 9) {
                columnUp = (+columnUp + 1).toString();
              }
              if (+columnDown > 0) {
                columnDown = (+columnDown - 1).toString();
              }
              if (+rowUp < 9) {
                rowUp = (+rowUp + 1).toString();
              }
              if (+rowDown > 0) {
                rowDown = (+rowDown - 1).toString();
              }
            }
          }
          if (gameData.intendedAims.verticalUp.length === 0) {
            gameData.isVertical = true;
            gameData.isDirectionToUpper = false;
          }
          if (gameData.intendedAims.verticalDown.length === 0) {
            gameData.isVertical = true;
            gameData.isDirectionToUpper = true;
          }
          if (
            gameData.intendedAims.verticalUp.length === 0 &&
            gameData.intendedAims.verticalDown.length === 0
          ) {
            gameData.isVertical = false;
            gameData.isDirectionToUpper = true;
          }

          if (gameData.intendedAims.horizontalUp.length === 0) {
            gameData.isVertical = false;
            gameData.isDirectionToUpper = false;
          }
          if (gameData.intendedAims.horizontalDown.length === 0) {
            gameData.isVertical = false;
            gameData.isDirectionToUpper = true;
          }
          if (
            gameData.intendedAims.horizontalUp.length === 0 &&
            gameData.intendedAims.horizontalDown.length === 0
          ) {
            gameData.isVertical = true;
          }
        }
      };

      if (shipOnFire.hits.length === +shipType) {
        generateIntendedAims();
      }
      updateShipsData();
      updateFieldsData();

      if (shipOnFire.hits.length > 0) {
        gameData.isKeepShooting = true;
        gameData.shotStatus = ShotStatus.HIT;
      } else {
        gameData.shotStatus = ShotStatus.DESTROY;
        gameData.isKeepShooting = false;
        gameData.intendedAims = {
          verticalUp: [],
          verticalDown: [],
          horizontalUp: [],
          horizontalDown: [],
        };
        gameData.computerLastShot = ``;
      }
      gameData.isReplayMove = true;
      gameData.isPlayerMove = false;
    };

    const onMiss = (): void => {
      const prevShotStatus = gameData.shotStatus;

      if (gameData.isKeepShooting) {
        if (prevShotStatus === ShotStatus.HIT && !gameData.isDirectionChanged) {
          changeDirection(gameData);
        }
        if (
          prevShotStatus === ShotStatus.MISS &&
          gameData.isDirectionChanged &&
          !gameData.isOrietationChanged
        ) {
          changeOrientation(gameData);
        }
        if (prevShotStatus === ShotStatus.MISS && gameData.isOrietationChanged) {
          changeDirection(gameData);
        }
      }

      const newShotStatus = ShotStatus.MISS;
      gameData.shotStatus = newShotStatus;
      nextPlayerField["column" + column][row].isMiss = true;
      gameData.isReplayMove = false;
      gameData.isPlayerMove = true;
    };

    playerField["column" + column][row].isShip ? onHit() : onMiss();
  };

  const keepShotOnShip = (): void => {
    const generateDirection = (): keyof SingleplayerGameState['intendedAims'] => {
      let direction: string = gameData.isVertical
        ? "vertical"
        : "horizontal";
      direction = gameData.isDirectionToUpper
        ? direction + "Up"
        : direction + "Down";
      return direction as keyof SingleplayerGameState['intendedAims'];
    };

    let direction = generateDirection();

    if (!gameData.intendedAims[direction].length) {
      changeDirection(gameData);
      direction = generateDirection();
      if (!gameData.intendedAims[direction].length) {
        changeOrientation(gameData);
        direction = generateDirection();
      }
      if (!gameData.intendedAims[direction].length) {
        changeDirection(gameData);
        direction = generateDirection();
      }
    }

    const intendedAimCoords = gameData.intendedAims[direction];
    let intendedCoord = intendedAimCoords.splice(0, 1)[0];
    const aimIndex = nextAimList.findIndex((aim) => intendedCoord === aim);
    shot(aimIndex);
  };

  const makeShot = (): void => {
    switch (gameData.shotStatus) {
      case ShotStatus.HIT:
        keepShotOnShip();
        break;
      case ShotStatus.DESTROY:
        shot(generateRandomAimIndex());
        break;
      case ShotStatus.MISS:
        gameData.isKeepShooting
          ? keepShotOnShip()
          : shot(generateRandomAimIndex());
        break;
      default:
        shot(generateRandomAimIndex());
    }
  };
  makeShot();

  return {
    playerField: nextPlayerField,
    playerShipsData: shipsData,
    singleplayerGame: gameData
  };
};
