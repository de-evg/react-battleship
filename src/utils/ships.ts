export class Ship {
  id: string;
  coords: string[];
  hits: string[];
  isVertical: boolean;
  isPlaced: boolean;
  isDestroyed: boolean;

  constructor(id: string) {
    this.id = id;
    this.coords = [];
    this.hits = new Array(+id.slice(0, 1)).fill("life");
    this.isVertical = false;
    this.isPlaced = false;
    this.isDestroyed = false;
  }
}

export interface ShipList {
  deck4: Ship[];
  deck3: Ship[];
  deck2: Ship[];
  deck1: Ship[];
}

export const generateShipList = (): ShipList => {
  const CompShipList: ShipList = {
    deck4: [new Ship("4.0")],
    deck3: [new Ship("3.0"), new Ship("3.1")],
    deck2: [new Ship("2.0"), new Ship("2.1"), new Ship("2.2")],
    deck1: [new Ship("1.0"), new Ship("1.1"), new Ship("1.2"), new Ship("1.3")],
  };
  return CompShipList;
};

/** Копия корабля вместе с массивами `coords` и `hits`, которые мутируются по ходу игры. */
export const cloneShip = (ship: Ship): Ship => {
  const clonedShip = new Ship(ship.id);
  clonedShip.coords = [...ship.coords];
  clonedShip.hits = [...ship.hits];
  clonedShip.isVertical = ship.isVertical;
  clonedShip.isPlaced = ship.isPlaced;
  clonedShip.isDestroyed = ship.isDestroyed;
  return clonedShip;
};

export const cloneShipList = (shipsData: ShipList): ShipList => ({
  deck4: shipsData.deck4.map(cloneShip),
  deck3: shipsData.deck3.map(cloneShip),
  deck2: shipsData.deck2.map(cloneShip),
  deck1: shipsData.deck1.map(cloneShip),
});
