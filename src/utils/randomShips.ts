import { generateShipList, Ship, ShipList } from "./ships";
import { generateBasicGameFieldData, GameFieldData } from "./fields";

const generateFieldValues = (): string[] => {
  const fieldValues: string[] = [];
  for (let column = 0; column < 10; column++) {
    for (let row = 0; row < 10; row++) {
      fieldValues.push(column.toString() + row.toString());
    }
  }
  return fieldValues;
};

const generateRandomShipList = (
  shipsData: ShipList,
  fieldData: GameFieldData,
  fieldValues: string[]
): ShipList => {
  const generateRandomOrientation = (shipsData: ShipList): void => {
    Object.keys(shipsData).forEach((shipType) =>
      shipsData[shipType as keyof ShipList].map((ship) => {
        ship.isVertical = Math.random() >= 0.5;
        return ship;
      })
    );
  };

  const generateCoords = (shipsData: ShipList): void => {
    const checkCoordsOnBlock = (coords: string[]): boolean => {
      const isFieldBlocked = coords.find((coordinate) => {
        const columnNumber = coordinate.slice(0, 1);
        const rowNumber = +coordinate.slice(1);
        const fieldOnCheck = fieldData["column" + columnNumber][rowNumber];
        return fieldOnCheck.isBlocked ? true : false;
      });
      return !!isFieldBlocked;
    };
    const generateRandomNumber = (min: number, max: number): number => {
      return Math.floor(Math.random() * (max - min)) + min;
    };

    const generateShipCoords = (ship: Ship, shipType: string): void => {
      generateRandomOrientation(shipsData);
      const deckLength = +shipType.slice(-1);
      const startCoord =
        fieldValues[generateRandomNumber(0, fieldValues.length)];
      const columnNumber = +startCoord.slice(0, 1);
      const rowNumber = +startCoord.slice(1);

      ship.coords.push(startCoord);
      if (ship.isVertical) {
        for (let i = 1; i < deckLength; i++) {
          if (deckLength <= 10 - rowNumber) {
            ship.coords.push(
              columnNumber.toString() + (rowNumber + i).toString()
            );
          } else {
            ship.coords.push(
              columnNumber.toString() + (rowNumber - i).toString()
            );
          }
        }
      } else {
        for (let i = 1; i < deckLength; i++) {
          if (deckLength <= 10 - columnNumber) {
            ship.coords.push((columnNumber + i).toString() + rowNumber);
          } else {
            ship.coords.push((columnNumber - i).toString() + rowNumber);
          }
        }
      }
    };

    const removeBlockedField = (coords: string[]): void => {
      coords.forEach((coord) => {
        const columnNumber = +coord.slice(0, 1);
        const rowNumber = +coord.slice(1);

        // Сама клетка и все восемь соседей — ровно то, что помечается isBlocked при постановке корабля.
        for (let columnOffset = -1; columnOffset <= 1; columnOffset++) {
          for (let rowOffset = -1; rowOffset <= 1; rowOffset++) {
            const neighbour =
              (columnNumber + columnOffset).toString() +
              (rowNumber + rowOffset).toString();
            const valueIndex = fieldValues.findIndex(
              (fieldValue) => fieldValue === neighbour
            );

            if (valueIndex > -1) {
              fieldValues.splice(valueIndex, 1);
            }
          }
        }
      });
    };

    Object.keys(shipsData).forEach((shipType) =>
      shipsData[shipType as keyof ShipList].map((ship) => {
        let isBlocked = true;
        while (isBlocked) {
          ship.coords = [];
          generateShipCoords(ship, shipType);
          isBlocked = checkCoordsOnBlock(ship.coords);
          if (!isBlocked) {
            removeBlockedField(ship.coords);
            ship.coords.forEach((coord) => {
              const columnNumber = +coord.slice(0, 1);
              const rowNumber = +coord.slice(1);

              fieldData["column" + columnNumber][rowNumber].isShip = true;
              fieldData["column" + columnNumber][rowNumber].isBlocked = true;

              if (columnNumber > 0) {
                fieldData["column" + (columnNumber - 1)][
                  rowNumber
                ].isBlocked = true;
              }
              if (columnNumber < 9) {
                fieldData["column" + (columnNumber + 1)][
                  rowNumber
                ].isBlocked = true;
              }
              if (rowNumber > 0) {
                fieldData["column" + columnNumber][
                  rowNumber - 1
                ].isBlocked = true;
              }
              if (rowNumber < 9) {
                fieldData["column" + columnNumber][
                  rowNumber + 1
                ].isBlocked = true;
              }

              if (columnNumber < 9 && rowNumber < 9) {
                fieldData["column" + (columnNumber + 1)][
                  rowNumber + 1
                ].isBlocked = true;
              }
              if (columnNumber > 0 && rowNumber > 0) {
                fieldData["column" + (columnNumber - 1)][
                  rowNumber - 1
                ].isBlocked = true;
              }
              if (columnNumber < 9 && rowNumber > 0) {
                fieldData["column" + (columnNumber + 1)][
                  rowNumber - 1
                ].isBlocked = true;
              }
              if (columnNumber > 0 && rowNumber < 9) {
                fieldData["column" + (columnNumber - 1)][
                  rowNumber + 1
                ].isBlocked = true;
              }
            });
          }
        }
        return ship;
      })
    );
  };
  generateCoords(shipsData);
  return shipsData;
};

export const generateCompShipList = (): ShipList => 
  generateRandomShipList(generateShipList(), generateBasicGameFieldData(), generateFieldValues());
