import { generateShipList, ShipList } from "./ships";

const DECK_TYPES: (keyof ShipList)[] = ["deck4", "deck3", "deck2", "deck1"];

describe("generateShipList", () => {
  it("выдаёт классический флот 1×4 + 2×3 + 3×2 + 4×1", () => {
    const ships = generateShipList();

    expect(ships.deck4).toHaveLength(1);
    expect(ships.deck3).toHaveLength(2);
    expect(ships.deck2).toHaveLength(3);
    expect(ships.deck1).toHaveLength(4);
  });

  it("даёт каждому кораблю столько жизней, сколько у него палуб", () => {
    const ships = generateShipList();

    DECK_TYPES.forEach((deckType) => {
      const deckLength = Number(deckType.replace("deck", ""));

      ships[deckType].forEach((ship) => {
        expect(ship.hits).toHaveLength(deckLength);
      });
    });
  });

  it("создаёт корабли в состоянии «не расставлен»", () => {
    const ships = generateShipList();

    DECK_TYPES.forEach((deckType) => {
      ships[deckType].forEach((ship) => {
        expect(ship.isPlaced).toBe(false);
        expect(ship.isDestroyed).toBe(false);
        expect(ship.coords).toEqual([]);
      });
    });
  });
});
