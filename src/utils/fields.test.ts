import { checkCoordsOnBlock, generateBasicGameFieldData } from "./fields";

describe("generateBasicGameFieldData", () => {
  it("создаёт поле 10×10", () => {
    const field = generateBasicGameFieldData();
    expect(Object.keys(field)).toHaveLength(10);

    for (let column = 0; column < 10; column++) {
      expect(field["column" + column]).toHaveLength(10);
    }
  });

  it("нумерует клетки как «колонка + строка»", () => {
    const field = generateBasicGameFieldData();
    expect(field["column0"][0].id).toBe("00");
    expect(field["column3"][7].id).toBe("37");
    expect(field["column9"][9].id).toBe("99");
  });

  it("по умолчанию все клетки пустые", () => {
    const field = generateBasicGameFieldData();
    const cells = Object.values(field).flat();

    expect(cells).toHaveLength(100);
    cells.forEach((cell) => {
      expect(cell).toMatchObject({
        isShip: false,
        shipID: null,
        isMiss: false,
        isBlocked: false,
        isHit: false,
        isDestroyed: false,
      });
    });
  });
});

describe("checkCoordsOnBlock", () => {
  it("считает пустой список координат заблокированным", () => {
    expect(checkCoordsOnBlock([], generateBasicGameFieldData())).toBe(true);
  });

  it("пропускает свободные клетки", () => {
    const field = generateBasicGameFieldData();
    expect(checkCoordsOnBlock(["00", "01", "02"], field)).toBe(false);
  });

  it("замечает хотя бы одну занятую клетку", () => {
    const field = generateBasicGameFieldData();
    field["column1"][2].isBlocked = true;

    expect(checkCoordsOnBlock(["00", "12", "02"], field)).toBe(true);
  });
});
