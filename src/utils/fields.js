export const generateBasicGameFieldData = () => {
  let basicGameFieldData = {};
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

export const checkCoordsOnBlock = (coords, fields) => {
  const isFieldBlocked = coords.find((coordinate) => {
    const [columnNumber, rowNumber] = coordinate.split(``);
    const fieldOnCheck = fields["column" + columnNumber][rowNumber];
    return fieldOnCheck.isBlocked ? true : false;
  });
  return !!isFieldBlocked;
};

export const placeComputerShips = (fieldsData, shipsData) => {
  const newFieldsData = {...fieldsData};
  Object.keys(shipsData).forEach((shipType) =>
    shipsData[shipType].forEach((ship) => {
      ship.coords.map((coord) => {
        newFieldsData["column" + coord.slice(0, 1)][coord.slice(1)].isShip = true;
        newFieldsData["column" + coord.slice(0, 1)][
          coord.slice(1)
        ].isBlocked = true;
        newFieldsData["column" + coord.slice(0, 1)][coord.slice(1)].shipID =
          ship.id;
        return coord;
      });
    })
  );
  return newFieldsData;
};
