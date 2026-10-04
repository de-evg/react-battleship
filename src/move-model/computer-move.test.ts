import { generateComputerMove } from "./computer-move";
import { generateBasicGameFieldData, GameFieldData } from "../utils/fields";
import { generateShipList, ShipList } from "../utils/ships";
import { SingleplayerGameState } from "../store/reducers/singleplayer-game/singleplayer-game";

type MoveResult = ReturnType<typeof generateComputerMove>;

// Целевую клетку кладём в aimList первой, а Math.random возвращает почти ноль,
// чтобы generateRandomAimIndex() выбрал именно её: floor(0.0001 * 100) === 0.
const AIM_RANDOM_VALUE = 0.0001;

const allCells = (): string[] => {
  const cells: string[] = [];

  for (let column = 0; column < 10; column++) {
    for (let row = 0; row < 10; row++) {
      cells.push(column.toString() + row.toString());
    }
  }

  return cells;
};

const buildGameState = (
  target: string,
  excludedAims: string[]
): SingleplayerGameState => ({
  isPlayerMove: false,
  isReplayMove: false,
  computerLastShot: ``,
  playerLastShot: ``,
  isDirectionToUpper: false,
  isDirectionChanged: false,
  isOrietationChanged: false,
  isVertical: false,
  isKeepShooting: false,
  shotStatus: ``,
  aimList: [
    target,
    ...allCells().filter(
      (cell) => cell !== target && !excludedAims.includes(cell)
    ),
  ],
  intendedAims: {
    verticalUp: [],
    verticalDown: [],
    horizontalUp: [],
    horizontalDown: [],
  },
  isGameOver: false,
  winner: ``,
});

// Сценарий «компьютер впервые попал в корабль из `deck` палуб в клетку (column, row)».
const runMove = (
  column: number,
  row: number,
  deck: number,
  excludedAims: string[] = []
): MoveResult => {
  const playerField: GameFieldData = generateBasicGameFieldData();
  const playerShipsData: ShipList = generateShipList();
  const ship = playerShipsData[("deck" + deck) as keyof ShipList][0];
  const target = column.toString() + row.toString();

  playerField["column" + column][row].isShip = true;
  playerField["column" + column][row].shipID = ship.id;
  ship.coords = [target];

  const originalRandom = Math.random;
  Math.random = () => AIM_RANDOM_VALUE;

  try {
    return generateComputerMove(
      playerField,
      playerShipsData,
      buildGameState(target, excludedAims)
    );
  } finally {
    Math.random = originalRandom;
  }
};

const aimsOf = (result: MoveResult) => result.singleplayerGame.intendedAims;

describe("generateComputerMove: выбор клеток для добивания", () => {
  it("стреляет именно в заданную клетку", () => {
    expect(runMove(9, 9, 4).singleplayerGame.computerLastShot).toBe("99");
    expect(runMove(3, 4, 2).singleplayerGame.computerLastShot).toBe("34");
  });

  it("у однопалубного корабля целей для добивания нет", () => {
    expect(aimsOf(runMove(5, 5, 1))).toEqual({
      verticalUp: [],
      verticalDown: [],
      horizontalUp: [],
      horizontalDown: [],
    });
  });

  it("в центре поля расставляет цели во все четыре стороны", () => {
    expect(aimsOf(runMove(5, 5, 3))).toEqual({
      horizontalUp: ["65", "75"],
      horizontalDown: ["45", "35"],
      verticalUp: ["56", "57"],
      verticalDown: ["54", "53"],
    });
  });

  it("в левом верхнем углу не выходит за поле", () => {
    expect(aimsOf(runMove(0, 0, 4))).toEqual({
      horizontalUp: ["10", "20", "30"],
      horizontalDown: [],
      verticalUp: ["01", "02", "03"],
      verticalDown: [],
    });
  });

  it("в правом нижнем углу перебирает три разные клетки, а не одну трижды", () => {
    const aims = aimsOf(runMove(9, 9, 4));

    expect(aims.horizontalDown).toEqual(["89", "79", "69"]);
    expect(aims.verticalDown).toEqual(["98", "97", "96"]);
    expect(aims.horizontalUp).toEqual([]);
    expect(aims.verticalUp).toEqual([]);
  });

  it("на верхнем краю не предлагает клетки за границей поля", () => {
    expect(aimsOf(runMove(5, 0, 3))).toEqual({
      horizontalUp: ["60", "70"],
      horizontalDown: ["40", "30"],
      verticalUp: ["51", "52"],
      verticalDown: [],
    });
  });

  it("на нижнем краю не предлагает клетки за границей поля", () => {
    expect(aimsOf(runMove(5, 9, 3))).toEqual({
      horizontalUp: ["69", "79"],
      horizontalDown: ["49", "39"],
      verticalUp: [],
      verticalDown: ["58", "57"],
    });
  });

  it("останавливается на уже отстрелянной клетке", () => {
    const aims = aimsOf(runMove(5, 5, 4, ["65"]));

    expect(aims.horizontalUp).toEqual([]);
    expect(aims.horizontalDown).toEqual(["45", "35", "25"]);
    expect(aims.verticalUp).toEqual(["56", "57", "58"]);
    expect(aims.verticalDown).toEqual(["54", "53", "52"]);
  });
});
