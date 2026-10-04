import { generateCompShipList } from "./randomShips";
import { ShipList } from "./ships";

const DECK_TYPES: (keyof ShipList)[] = ["deck4", "deck3", "deck2", "deck1"];

const collectCoords = (ships: ShipList): string[] =>
  DECK_TYPES.reduce<string[]>(
    (coords, deckType) =>
      coords.concat(ships[deckType].reduce<string[]>((all, ship) => all.concat(ship.coords), [])),
    []
  );

const neighboursOf = (coord: string): string[] => {
  const column = Number(coord.slice(0, 1));
  const row = Number(coord.slice(1));
  const neighbours: string[] = [];

  for (let columnOffset = -1; columnOffset <= 1; columnOffset++) {
    for (let rowOffset = -1; rowOffset <= 1; rowOffset++) {
      neighbours.push((column + columnOffset).toString() + (row + rowOffset).toString());
    }
  }

  return neighbours;
};

describe("generateCompShipList", () => {
  it("расставляет весь флот", () => {
    const ships = generateCompShipList();

    expect(ships.deck4).toHaveLength(1);
    expect(ships.deck3).toHaveLength(2);
    expect(ships.deck2).toHaveLength(3);
    expect(ships.deck1).toHaveLength(4);
  });

  it("держит каждый корабль целиком внутри поля и даёт ему нужное число палуб", () => {
    const ships = generateCompShipList();
    const violations: string[] = [];

    DECK_TYPES.forEach((deckType) => {
      const deckLength = Number(deckType.replace("deck", ""));

      ships[deckType].forEach((ship) => {
        if (ship.coords.length !== deckLength) {
          violations.push(`${ship.id}: палуб ${ship.coords.length}, ожидалось ${deckLength}`);
        }

        ship.coords.forEach((coord) => {
          const column = Number(coord.slice(0, 1));
          const row = Number(coord.slice(1));

          if (column < 0 || column > 9 || row < 0 || row > 9) {
            violations.push(`${ship.id}: клетка ${coord} вне поля`);
          }
        });
      });
    });

    expect(violations).toEqual([]);
  });

  it("не ставит два корабля на одну клетку", () => {
    const coords = collectCoords(generateCompShipList());

    expect(new Set(coords).size).toBe(coords.length);
  });

  it("не ставит корабли вплотную друг к другу", () => {
    const ships = generateCompShipList();
    const shipCells = DECK_TYPES.reduce<Set<string>[]>(
      (sets, deckType) =>
        sets.concat(ships[deckType].map((ship) => new Set(ship.coords))),
      []
    );
    const violations: string[] = [];

    shipCells.forEach((cells, shipIndex) => {
      cells.forEach((coord) => {
        neighboursOf(coord).forEach((neighbour) => {
          shipCells.forEach((otherCells, otherIndex) => {
            if (otherIndex !== shipIndex && otherCells.has(neighbour)) {
              violations.push(`${coord} касается ${neighbour}`);
            }
          });
        });
      });
    });

    expect(violations).toEqual([]);
  });
});
