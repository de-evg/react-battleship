import { Winner, WinnerType } from "../const";
import { Ship, ShipList } from "../utils/ships";

interface GameOverResult {
  isGameOver: boolean;
  winner: WinnerType | string;
}

const checkOnDestroyedShips = (shipsData: ShipList): boolean => {
  const shipsTypes = Object.keys(shipsData);
  let survivingShips: Ship[] = [];
  shipsTypes.forEach((type) => {
      const ships = shipsData[type as keyof ShipList].filter((ship) => !ship.isDestroyed);
      survivingShips = survivingShips.concat(ships);
  });
  return !survivingShips.length;
};

export const checkOnGameOver = (firstPlayerShips: ShipList, secondPlayerShips: ShipList): GameOverResult => {    
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
