import {ShotStatus} from "../const";
import { generateRandomNumber } from "../utils/common";

export const generateComputerMove = (playerField, playerShipsData, singleplayerGameData) => {
  const nextAimList = [ ...singleplayerGameData.aimList ];
  const generateRandomAimIndex = () =>
    generateRandomNumber(0, nextAimList.length);

  const nextPlayerField = { ...playerField };
  const shipsData = { ...playerShipsData };
  const gameData = { ...singleplayerGameData };

  const changeDirection = (gameData) => {
    gameData.isDirectionToUpper = !gameData.isDirectionToUpper;
    gameData.isDirectionChanged = !gameData.isDirectionChanged;
  };

  const changeOrientation = (gameData) => {
    gameData.isVertical = !gameData.isVertical;
    gameData.isOrietationChanged = !gameData.isOrietationChanged;
  };

  const shot = (aimIndex) => {
    const aimNumber = nextAimList.splice(aimIndex, 1);
    gameData.aimList = nextAimList;
    gameData.computerLastShot = aimNumber[0];

    const column = aimNumber[0].slice(0, 1);
    const row = aimNumber[0].slice(1);

    const onHit = () => {
      const shipType = nextPlayerField["column" + column][row].shipID.slice(
        0,
        1
      );
      const shipNumber = nextPlayerField["column" + column][row].shipID.slice(
        -1
      );
      const shipOnFire = shipsData["deck" + shipType][shipNumber];

      const updateShipsData = () => {
        if (shipOnFire.hits.length) {
          shipOnFire.hits.splice(0, 1);
        }
        shipOnFire.isDestroyed = shipOnFire.hits.length === 0 ? true : false;
        shipsData["deck" + shipType][shipNumber] = shipOnFire;
      };

      const updateFieldsData = () => {
        nextPlayerField["column" + column][row].isHit = true;
        if (shipOnFire.isDestroyed) {
          const splitedElements = [];
          shipOnFire.coords.forEach((coord) => {
            let columnNumber = coord.slice(0, 1);
            let rowNumber = coord.slice(-1);
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

      const generateIntendedAims = () => {
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

          const checkCoords = (coord) =>
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

              if (columnUp < 9) {
                columnUp = +columnUp + 1;
              }
              if (rowUp < 9) {
                rowUp = +rowUp + 1;
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

              if (columnDown > 0) {
                columnDown = +columnDown - 1;
              }
              if (rowUp < 9) {
                rowUp = +rowUp + 1;
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

              if (columnDown > 0) {
                columnDown = +columnDown - 1;
              }
              if (rowUp > 0) {
                rowUp = +rowUp - 1;
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

              if (columnUp > 0) {
                columnUp = +columnUp + 1;
              }
              if (rowDown > 0) {
                rowDown = +rowDown - 1;
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

              if (columnUp > 0) {
                columnUp = +columnUp + 1;
              }
              if (columnDown > 0) {
                columnDown = +columnDown - 1;
              }
              if (rowUp > 0) {
                rowUp = +rowUp + 1;
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

              if (columnUp > 0) {
                columnUp = +columnUp + 1;
              }
              if (columnDown > 0) {
                columnDown = +columnDown - 1;
              }
              if (rowDown > 0) {
                rowDown = +rowDown - 1;
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

              if (columnUp > 0) {
                columnUp = +columnUp + 1;
              }
              if (rowUp > 0) {
                rowUp = +rowUp + 1;
              }
              if (rowDown > 0) {
                rowDown = +rowDown - 1;
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

              if (columnDown > 0) {
                columnDown = +columnDown - 1;
              }
              if (rowUp > 0) {
                rowUp = +rowUp + 1;
              }
              if (rowDown > 0) {
                rowDown = +rowDown - 1;
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

              if (columnUp > 0) {
                columnUp = +columnUp + 1;
              }
              if (columnDown > 0) {
                columnDown = +columnDown - 1;
              }
              if (rowUp > 0) {
                rowUp = +rowUp + 1;
              }
              if (rowDown > 0) {
                rowDown = +rowDown - 1;
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

    const onMiss = () => {
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

  const keepShotOnShip = () => {
    const generateDirection = () => {
      let direction = gameData.isVertical
        ? "vertical"
        : "horizontal";
      direction = gameData.isDirectionToUpper
        ? direction + "Up"
        : direction + "Down";
      return direction;
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

  const makeShot = () => {
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
  }
};
