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
