import {Winner} from "../const";

const checkOnDestroyedShips = (shipsData) => {
  const shipsTypes = Object.keys(shipsData);
  let survivingShips = [];
  shipsTypes.forEach((type) => {
      const ships = shipsData[type].filter((ship) => !ship.isDestroyed);
      survivingShips = survivingShips.concat(ships);
  });
  return !survivingShips.length;
};

export const checkOnGameOver = (firstPlayerShips, secondPlayerShips) => {    
  const isFirstPlayerAllShipsDestroyed = checkOnDestroyedShips(firstPlayerShips);
  const isSecondPlayerAllShipsDestroyed = checkOnDestroyedShips(secondPlayerShips);
  if (isSecondPlayerAllShipsDestroyed) {
    return {
      isGameOver: true,
      winner: Winner.FIRST_PLAYER
    };
  }
  if (isFirstPlayerAllShipsDestroyed) {
    return {
      isGameOver: true,
      winner: Winner.SECOND_PLAYER
    };
  }
  return {
    isGameOver: false,
    winner: ``
  };  
};
