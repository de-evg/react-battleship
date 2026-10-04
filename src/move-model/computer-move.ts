import {ShotStatus} from "../const";
import { generateRandomNumber } from "../utils/common";
import { cloneGameFieldData, GameFieldData } from "../utils/fields";
import { cloneShipList, ShipList } from "../utils/ships";
import { SingleplayerGameState } from "../store/reducers/singleplayer-game/singleplayer-game";

export interface ComputerMoveResult {
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

  const nextPlayerField = cloneGameFieldData(playerField);
  const shipsData = cloneShipList(playerShipsData);
  // Копируем и вложенные структуры: очередь целей и списки направлений мутируются ниже.
  const gameData: SingleplayerGameState = {
    ...singleplayerGameData,
    aimList: [ ...singleplayerGameData.aimList ],
    intendedAims: {
      verticalUp: [ ...singleplayerGameData.intendedAims.verticalUp ],
      verticalDown: [ ...singleplayerGameData.intendedAims.verticalDown ],
      horizontalUp: [ ...singleplayerGameData.intendedAims.horizontalUp ],
      horizontalDown: [ ...singleplayerGameData.intendedAims.horizontalDown ],
    },
  };

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

        const intendedAims = gameData.intendedAims;
        const hasIntendedAims =
          intendedAims.verticalUp.length > 0 ||
          intendedAims.verticalDown.length > 0 ||
          intendedAims.horizontalUp.length > 0 ||
          intendedAims.horizontalDown.length > 0;

        if (hasIntendedAims) {
          return;
        }

        const column = +gameData.computerLastShot.slice(0, 1);
        const row = +gameData.computerLastShot.slice(1);
        const deckLength = +shipOnFire.id.slice(0, 1);

        // Четыре продолжения раненого корабля: куда шагать от клетки попадания.
        const directions: {
          aim: keyof SingleplayerGameState["intendedAims"];
          columnStep: number;
          rowStep: number;
        }[] = [
          { aim: `horizontalUp`, columnStep: 1, rowStep: 0 },
          { aim: `horizontalDown`, columnStep: -1, rowStep: 0 },
          { aim: `verticalUp`, columnStep: 0, rowStep: 1 },
          { aim: `verticalDown`, columnStep: 0, rowStep: -1 },
        ];

        directions.forEach(({ aim, columnStep, rowStep }) => {
          const aims = intendedAims[aim];

          // Идём в одну сторону, пока не упрёмся в край поля или в уже отстрелянную клетку.
          for (let step = 1; step < deckLength; step++) {
            const nextColumn = column + columnStep * step;
            const nextRow = row + rowStep * step;
            const isOutOfField =
              nextColumn < 0 || nextColumn > 9 || nextRow < 0 || nextRow > 9;

            if (isOutOfField) {
              break;
            }

            const nextCoord = nextColumn.toString() + nextRow.toString();

            if (nextAimList.indexOf(nextCoord) === -1) {
              break;
            }

            aims.push(nextCoord);
          }
        });

        if (intendedAims.verticalUp.length === 0) {
          gameData.isVertical = true;
          gameData.isDirectionToUpper = false;
        }
        if (intendedAims.verticalDown.length === 0) {
          gameData.isVertical = true;
          gameData.isDirectionToUpper = true;
        }
        if (
          intendedAims.verticalUp.length === 0 &&
          intendedAims.verticalDown.length === 0
        ) {
          gameData.isVertical = false;
          gameData.isDirectionToUpper = true;
        }

        if (intendedAims.horizontalUp.length === 0) {
          gameData.isVertical = false;
          gameData.isDirectionToUpper = false;
        }
        if (intendedAims.horizontalDown.length === 0) {
          gameData.isVertical = false;
          gameData.isDirectionToUpper = true;
        }
        if (
          intendedAims.horizontalUp.length === 0 &&
          intendedAims.horizontalDown.length === 0
        ) {
          gameData.isVertical = true;
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
