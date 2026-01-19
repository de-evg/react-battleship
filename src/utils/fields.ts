export interface FieldCell {
  id: string;
  isShip: boolean;
  shipID: string | null;
  isMiss: boolean;
  isBlocked: boolean;
  isHit: boolean;
  isDestroyed: boolean;
}

export interface GameFieldData {
  [key: string]: FieldCell[];
}

export const generateBasicGameFieldData = (): GameFieldData => {
  const basicGameFieldData: GameFieldData = {};
  for (let columnNumber = 0; columnNumber < 10; columnNumber++) {
    basicGameFieldData["column" + columnNumber] = [];
    for (let rowNumber = 0; rowNumber < 10; rowNumber++) {
      basicGameFieldData["column" + columnNumber][rowNumber] = {
        id: columnNumber.toString() + rowNumber.toString(),
        isShip: false,
        shipID: null,
        isMiss: false,
        isBlocked: false,
        isHit: false,
        isDestroyed: false,
      };
    }
  }
  return basicGameFieldData;
};

export const checkCoordsOnBlock = (coords: string[], fields: GameFieldData): boolean => {
  let coordIsBlocked = true;
  if (!coords.length) {    
    return coordIsBlocked;
  }
  coordIsBlocked = !!coords.find((coordinate) => {
    const [columnNumber, rowNumber] = coordinate.split(``);
    const fieldOnCheck = fields["column" + columnNumber][parseInt(rowNumber)];
    return fieldOnCheck.isBlocked ? true : false;
  });
  return coordIsBlocked;
};

export const placeComputerShips = (fieldsData: GameFieldData, shipsData: any): GameFieldData => {
  const newFieldsData = {...fieldsData};
  Object.keys(shipsData).forEach((shipType) =>
    shipsData[shipType].forEach((ship: any) => {
      ship.coords.map((coord: string) => {
        const columnNumber = coord.slice(0, 1);
        const rowNumber = parseInt(coord.slice(1));
        newFieldsData["column" + columnNumber][rowNumber].isShip = true;
        newFieldsData["column" + columnNumber][rowNumber].isBlocked = true;
        newFieldsData["column" + columnNumber][rowNumber].shipID = ship.id;
        return coord;
      });
    })
  );
  return newFieldsData;
};
