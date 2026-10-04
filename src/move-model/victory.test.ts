import { Winner } from "../const";
import { checkOnGameOver } from "./victory";
import { generateShipList } from "../utils/ships";

const destroyAll = (ships: ReturnType<typeof generateShipList>) => {
  Object.values(ships)
    .flat()
    .forEach((ship) => {
      ship.isDestroyed = true;
    });
};

describe("checkOnGameOver", () => {
  it("игра продолжается, пока у обоих есть корабли", () => {
    expect(checkOnGameOver(generateShipList(), generateShipList())).toEqual({
      isGameOver: false,
      winner: "",
    });
  });

  it("победа игрока, когда уничтожен флот противника", () => {
    const opponentShips = generateShipList();
    destroyAll(opponentShips);

    expect(checkOnGameOver(generateShipList(), opponentShips)).toEqual({
      isGameOver: true,
      winner: Winner.FIRST_PLAYER,
    });
  });

  it("победа компьютера, когда уничтожен флот игрока", () => {
    const playerShips = generateShipList();
    destroyAll(playerShips);

    expect(checkOnGameOver(playerShips, generateShipList())).toEqual({
      isGameOver: true,
      winner: Winner.SECOND_PLAYER,
    });
  });

  it("при одновременном уничтожении победа достаётся игроку", () => {
    const playerShips = generateShipList();
    const opponentShips = generateShipList();
    destroyAll(playerShips);
    destroyAll(opponentShips);

    expect(checkOnGameOver(playerShips, opponentShips)).toEqual({
      isGameOver: true,
      winner: Winner.FIRST_PLAYER,
    });
  });
});
