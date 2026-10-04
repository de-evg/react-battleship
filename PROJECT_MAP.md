# Карта проекта `react-battleship`

> Реализация игры «Морской бой» — одиночная партия против компьютера.
> React 17 + Redux + TypeScript, сборка на Vite, раздача статики через Express.

| Параметр | Значение |
| --- | --- |
| Пакет | `battleship@0.1.0` (private) |
| Ветка | `migrate-to-typescript` |
| Remote | `git@github.com:de-evg/react-battleship.git` |
| React | 17.0.1 (классовых компонентов нет, только функции + хуки) |
| Состояние | Redux 4.0.5 + react-redux 7.2.2 + redux-thunk 2.3.0 |
| Роутинг | react-router-dom 5.2.0 |
| Сборка | Vite 5.4.2 + `@vitejs/plugin-react` 4.3.1 |
| Типы | TypeScript 4.9.5 (`strict: true`, `any` в `src` отсутствует) |
| Тесты | Jest 26.6.3 — 5 наборов, 25 тестов, все проходят |
| Линт | ESLint 7.17.0 + @typescript-eslint 5.62.0, `npm run lint` проходит без замечаний |
| Размер кода | 2638 строк TS/TSX в 31 файле `src/` |

---

## 1. Дерево файлов

```
react-battleship/
├── index.html                    # HTML-точка входа Vite → /src/index.tsx
├── vite.config.ts                # Vite: порт 3000, outDir "build", sourcemap
├── tsconfig.json                 # strict, jsx: react-jsx, moduleResolution: node
├── package.json                  # dev / build / preview / test / lint / typecheck / server
├── server.js                     # Express: статика из build/, порт 8080
├── jest.config.js                # Jest: jsdom, тесты в src, трансформер на TS
├── jest.transformer.js           # Трансформер Jest на базе установленного TypeScript
├── README.md                     # Описание проекта, скрипты, известные ограничения
├── PROJECT_MAP.md                # Этот документ
├── .eslintrc.yml                 # Единственный конфиг ESLint
├── .editorconfig
├── .gitignore
├── package-lock.json
│
├── public/
│   └── css/style.css             # единственный публичный ассет — все стили (11.7 КБ)
│
├── build/                        # артефакт vite build (в .gitignore)
│   ├── index.html
│   ├── assets/index-*.js         # бандл ~203 КБ (+ sourcemap)
│   └── css/style.css
│
└── src/
    ├── index.tsx                 # createStore(root, thunk + devtools) → Provider → render
    ├── const.ts                  # appRoute, GameMode, ShotStatus, Winner + производные типы
    ├── vite-env.d.ts
    │
    ├── components/               # ── слой представления ──
    │   ├── app/app.tsx                       # BrowserRouter + 2 маршрута
    │   ├── main-screen/main-screen.tsx       # меню «Начать игру», сброс стора
    │   ├── singleplayer-screen/…             # оркестратор партии
    │   ├── user-field/user-field.tsx         # своё поле: расстановка кораблей
    │   ├── opponent-field/…                  # поле врага: генерация и отрисовка
    │   ├── battlefield/battlefield.tsx       # сетка 10×10, обработчики мыши
    │   ├── battlefield-row/…                 # строка сетки
    │   └── square/square.tsx                 # клетка (классы ship / hit / miss)
    │
    ├── move-model/               # ── игровая логика (чистые функции) ──
    │   ├── computer-move.ts                  # ИИ: очередь целей, добивание корабля
    │   ├── computer-move.test.ts             # 9 положений клетки, выбор целей
    │   ├── player-move.ts                    # выстрел игрока, пометка убитых кораблей
    │   ├── victory.ts                        # проверка «все корабли уничтожены»
    │   └── victory.test.ts
    │
    ├── store/                    # ── состояние ──
    │   ├── action.ts                         # Action (19 вариантов) + ActionCreator
    │   └── reducers/
    │       ├── root.ts                       # combineReducers + NameSpace + RootState
    │       ├── game-mode/                    # фаза партии
    │       ├── player-field/                 # поле игрока
    │       ├── player-ships/                 # корабли игрока + процесс расстановки
    │       ├── opponent-field/               # поле врага + флаг расстановки
    │       ├── opponent-ships/               # корабли врага (случайные)
    │       └── singleplayer-game/            # ходы, цели, статус выстрела, победитель
    │
    └── utils/                    # ── модели данных ──
        ├── fields.ts                         # FieldCell / GameFieldData, копирование, проверки
        ├── fields.test.ts
        ├── ships.ts                          # class Ship, ShipList, копирование флота
        ├── ships.test.ts
        ├── randomShips.ts                    # случайная расстановка флота
        ├── randomShips.test.ts
        └── common.ts                         # generateRandomNumber
```

### Размеры ключевых модулей

| Файл | Строк | Роль |
| --- | ---: | --- |
| [src/move-model/computer-move.ts](src/move-model/computer-move.ts) | 427 | ИИ противника |
| [src/components/user-field/user-field.tsx](src/components/user-field/user-field.tsx) | 373 | Расстановка кораблей игроком |
| [src/components/singleplayer-screen/singleplayer-screen.tsx](src/components/singleplayer-screen/singleplayer-screen.tsx) | 262 | Оркестратор партии |
| [src/utils/randomShips.ts](src/utils/randomShips.ts) | 166 | Случайная расстановка |
| [src/move-model/computer-move.test.ts](src/move-model/computer-move.test.ts) | 154 | Тесты выбора целей |
| [src/move-model/player-move.ts](src/move-model/player-move.ts) | 150 | Ход игрока |
| [src/store/action.ts](src/store/action.ts) | 142 | Экшены |
| [src/utils/randomShips.test.ts](src/utils/randomShips.test.ts) | 92 | Тесты инвариантов расстановки |
| [src/components/opponent-field/opponent-field.tsx](src/components/opponent-field/opponent-field.tsx) | 83 | Поле врага |
| [src/utils/fields.ts](src/utils/fields.ts) | 75 | Модель поля |
| [src/store/reducers/singleplayer-game/singleplayer-game.ts](src/store/reducers/singleplayer-game/singleplayer-game.ts) | 72 | Состояние партии |
| остальные 20 файлов | ≤ 54 каждый | — |

---

## 2. Точки входа и маршруты

**Запуск:** [index.html](index.html) подключает `/src/index.tsx` как ES-модуль; [src/index.tsx](src/index.tsx) создаёт store (`redux-thunk` + `composeWithDevTools`) и рендерит `<App />` в `<div id="root">`.

**Маршруты** ([src/components/app/app.tsx](src/components/app/app.tsx), константы в [src/const.ts](src/const.ts)):

| Путь | Компонент | Назначение |
| --- | --- | --- |
| `/` | `MainScreen` | Главное меню; при монтировании сбрасывает режим, поля и корабли |
| `/single` | `SingleplayerScreen` | Одиночная партия |

---

## 3. Фазы партии (машина состояний `GameMode`)

```
IN_MENU ──(MainScreen: resetGameMode)──► IN_MENU
   │
   └─(переход на /single)─► SINGLE_ON_START
                                │  «Разместить корабли»
                                ▼
                           ARRAGMENT ──(все корабли расставлены)──► SINGLE_SHIPS_READY
                                                                        │  «Начать игру»
                                                                        ▼
                                                                      GAME ◄──┐
                                                                        │     │
                                                        (есть выжившие)──┘     │
                                                                        │     │
                                                       (все уничтожены) ▼     │
                                                                   GAME_OVER ┘
                                                              (или «Перезапустить»)
```

Побочные значения:

* `ShotStatus`: `HIT` / `DESTROY` / `MISS` — используется ИИ для выбора следующего выстрела.
* `Winner`: `FIRST_PLAYER` (игрок) / `SECOND_PLAYER` (компьютер).

---

## 4. Поток данных

```
                 ┌──────────────────────────────────────────┐
                 │  Redux store (6 слайсов, см. §5)         │
                 └───────▲──────────────────────┬───────────┘
                         │ dispatch             │ mapStateToProps(RootState)
                         │                      ▼
   ActionCreator   ┌─────┴─────┐        ┌──────────────────────┐
   (store/action)  │ reducers  │        │  components/*        │
                   └───────────┘        └───────┬──────────────┘
                                                │ вызовы логики
                                                ▼
                                        ┌──────────────────────┐
                                        │  move-model/*        │
                                        │  utils/*             │
                                        └──────────────────────┘
```

**Расстановка.** `UserField` по `onMouseOver` / `onWheel` / `onClick` вычисляет координаты корабля, проверяет их через `checkCoordsOnBlock` и отправляет `placeShip`. Параллельно `OpponentField` в `useEffect` вызывает `generateRandomShips` → `generateCompShipList()` → `placeComputerShips`, заполняя поле врага.

**Ход игрока.** Клик по клетке поля противника → `handlePlayerMove` в `SingleplayerScreen` → `generatePlayerMove` → `makeAPlayerMove` (три экшена: корабли врага, поле врага, состояние партии).

**Ход компьютера.** Если игрок промахнулся, `useEffect` через `setTimeout` 700 мс запускает `generateComputerMove` → `makeAComputerMove`. ИИ ведёт `aimList` (все незакрытые клетки) и `intendedAims` (4 направления для добивания раненого корабля), переключая направление и ориентацию на основе `shotStatus`.

**Финал.** `useEffect` при `gameMode === GAME` зовёт `checkOnGameOver`; при победе — `setWinner` + переход в `GAME_OVER`.

**Чистота.** Все три генератора ходов (`computer-move`, `player-move`, `placeComputerShips`) и обработчики `UserField` работают на копиях: `cloneGameFieldData` копирует каждую клетку, `cloneShipList` — каждый корабль вместе с массивами `coords` и `hits`. Входные структуры не мутируются.

---

## 5. Состояние (Redux)

Корневой редьюсер — [src/store/reducers/root.ts](src/store/reducers/root.ts), пространства имён в `NameSpace`, полный тип состояния — `RootState`.

| Слайс (`NameSpace`) | Ключевые поля | Файл |
| --- | --- | --- |
| `GAME_MODE` | `gameMode` | [game-mode.ts](src/store/reducers/game-mode/game-mode.ts) |
| `PLAYER_FIELD` | `playerField: GameFieldData` | [player-field.ts](src/store/reducers/player-field/player-field.ts) |
| `PLAYER_SHIPS` | `playerShipsData`, `currentShipOnPlace`, `shipTypeOnPlace`, `isAllShipPlaced` | [player-ships.ts](src/store/reducers/player-ships/player-ships.ts) |
| `OPPONENT_FIELD` | `opponentField`, `opponentShipsPlaced` | [opponent-field.ts](src/store/reducers/opponent-field/opponent-field.ts) |
| `OPPONENT_SHIPS` | `opponentShipsData: ShipList \| {}` | [opponent-ships.ts](src/store/reducers/opponent-ships/opponent-ships.ts) |
| `SINGLEPLAYER_GAME` | `isPlayerMove`, `isReplayMove`, `shotStatus`, `aimList`, `intendedAims`, `isVertical`, `isGameOver`, `winner` | [singleplayer-game.ts](src/store/reducers/singleplayer-game/singleplayer-game.ts) |

`Action` в [src/store/action.ts](src/store/action.ts) — размеченное объединение из 19 вариантов, у каждого свой тип нагрузки:

```ts
export type Action =
  | { type: typeof ActionType.CHANGE_GAME_MODE; payload: GameModeType }
  | { type: typeof ActionType.UPDATE_USER_FIELD; payload: GameFieldData }
  | { type: typeof ActionType.SHIP_PLACED; payload: PlaceShipPayload }
  | { type: typeof ActionType.PLACE_COMPUTER_SHIPS; payload: PlaceComputerShipsPayload }
  | { type: typeof ActionType.SET_WINNER; payload: WinnerPayload }
  | { type: typeof ActionType.RESET_GAME_MODE }
  | … // всего 19
```

Именованные типы нагрузок: `PlaceShipPayload`, `PlaceShipRequest`, `PlaceComputerShipsPayload`, `WinnerPayload`, `ShipOnPlace`.

---

## 6. Модели данных и соглашения

**Клетка поля** ([src/utils/fields.ts](src/utils/fields.ts)):

```ts
interface FieldCell {
  id: string;          // "<колонка><строка>", например "37" → колонка 3, строка 7
  isShip: boolean;
  shipID: string | null;  // "<палубы>.<номер>", например "4.0"
  isMiss: boolean;
  isBlocked: boolean;     // занята или вплотную к кораблю — сюда стрелять нельзя
  isHit: boolean;
  isDestroyed: boolean;
}
```

Поле — объект `{ column0: FieldCell[10], …, column9: FieldCell[10] }` (`GameFieldData`).

**Корабль** ([src/utils/ships.ts](src/utils/ships.ts)): класс `Ship` с `coords`, `hits` (массив `"life"` длиной по числу палуб), `isVertical`, `isPlaced`, `isDestroyed`.

**Флот** (`ShipList`): `deck4` — 1 корабль, `deck3` — 2, `deck2` — 3, `deck1` — 4.

**Координаты:** строка из двух символов — первая цифра колонка (`0…9`), остаток строка (`0…9`). Колонки на экране подписаны `["", "А"…"К"]`, строки — `1…10`.

---

## 7. Скрипты и развёртывание

| Команда | Что делает |
| --- | --- |
| `npm run dev` | Vite dev-сервер на порту **3000** |
| `npm run build` | Сборка в `build/` с sourcemap |
| `npm run preview` | Предпросмотр собранной версии |
| `npm test` | Jest: 5 наборов, 25 тестов |
| `npm run lint` | ESLint по `src` |
| `npm run typecheck` | `tsc --noEmit` |
| `node server.js` / `npm run server` | Express на порту **8080** (`PORT` из окружения): отдаёт `build/` и статику корня, `GET /ping` → `pong`, всё остальное → `build/index.html` |

---

## 8. Что было исправлено

| # | Проблема | Решение |
| --- | --- | --- |
| 1 | `moduleResolution: "Bundler"` не поддерживается установленным TypeScript 4.9.5 → `tsc` падал с TS6046/TS5070 | Значение заменено на `"node"`; в `types` добавлен `"jest"`; `NodeJS.Timeout` заменён на `ReturnType<typeof setTimeout>`. `tsc --noEmit` проходит без ошибок |
| 2 | `.babelrc` ссылался на `@babel/preset-react` и `@babel/preset-env`, которых нет; конфига Jest и тестов не было | `.babelrc` удалён, добавлены `jest.config.js` и `jest.transformer.js` (трансформер на уже установленном TypeScript — новые пакеты не нужны), написаны 25 тестов |
| 3 | Рабочая копия рассинхронизирована с git: `index.html` и `vite.config.ts` не добавлены, `public/index.html` удалён, но в индексе | Всё сведено в индексе: git видит переименование `public/index.html → index.html`; файлы IDE `.idea/` из индекса убраны и добавлены в `.gitignore` |
| 4 | `redux-devtools-extension` в `devDependencies` при рантайм-импорте; `typescript` наоборот в `dependencies`; лишний пакет `path` | Зависимости разложены по местам, `path` убран, `package-lock.json` пересобран, добавлен скрипт `typecheck` |
| 5 | README описывал команды CRA (`npm start`, `npm run eject`), которых нет | README переписан под реальный стек: скрипты, порты, правила игры, устройство, ограничения |
| 6 | `computer-move.ts` — 887 строк с 9 почти одинаковыми ветками по положению клетки у края поля | Девять веток заменены обходом четырёх направлений: 887 → 427 строк. Поведение сверено с сохранённой копией оригинала по всем 100 клеткам × 4 размера корабля — расхождения только там, где был баг (см. ниже) |
| 7 | `Action.payload?: any` и `state: any` в `mapStateToProps` | `Action` стало размеченным объединением с типизированными нагрузками; добавлен `RootState`; во всех компонентах `Dispatch<Action>` и `RootState`. **`any` в `src` больше не встречается** |
| 8 | Вложенные структуры мутировались через поверхностное копирование | Добавлены `cloneGameFieldData`, `cloneShip`, `cloneShipList`; применены в `computer-move`, `player-move`, `user-field` и `placeComputerShips`. Заодно глубоко копируются `aimList` и `intendedAims` |
| 9 | Мусор: `noop`, дублирующий `src/.eslintrc.yml`, три конфликтующих конфига ESLint | Удалены `noop`, `src/.eslintrc.yml` и мёртвый блок `eslintConfig` из `package.json`; настройки сведены в один корневой `.eslintrc.yml` |
| 10 | В `removeBlockedField` список соседей собирался вручную: два дубля, а клетка `(c, r+1)` отсутствовала | Заменено обходом окрестности 3×3 — ровно те клетки, что помечаются `isBlocked` при постановке корабля |

### Побочная находка

В исходном `computer-move.ts` в ветке для правого нижнего угла (9;9) вместо `rowDown` уменьшался `rowUp`, из-за чего ИИ трижды предлагал одну и ту же клетку вместо трёх разных. Это подтверждено дифференциальным тестом: расхождения с оригиналом ровно в `99 deck3` и `99 deck4` (у 1- и 2-палубных кораблей обход делает меньше двух шагов, поэтому дубликат не проявляется). Исправлено рефакторингом.

### Дополнительно (после восстановления работы)

| Изменение | Результат |
| --- | --- |
| ESLint не разбирал TypeScript | Установлены `@typescript-eslint/parser` и `@typescript-eslint/eslint-plugin` 5.62.0 (совместимы с ESLint 7 и TypeScript 4.9), добавлен скрипт `npm run lint`. Линт проходит без ошибок и предупреждений |
| Неиспользуемые зависимости | Удалены `prop-types` и `web-vitals`; `prop-types` остаётся транзитивной зависимостью `react-redux` и `react-router-dom` |
| Тип `{}` | Заменён на `Record<string, never>` через `EmptyObject`, `ShipOnPlace` и `OpponentShipsData` |
| Пустые обработчики в `Battlefield` | Три обработчика стали необязательными, `OpponentField` их больше не передаёт |
| Утверждения `shipID!` | Заменены явной проверкой на `null` |
| Смешанные переводы строк | Добавлен `.gitattributes` с `* text=auto eol=lf` |

---

## 9. Что осталось

* `browserslist` в `package.json` для Vite не применяется: сборщик использует `build.target`.
* Пакеты `@testing-library/*` подключены, но тестов на компоненты нет — покрыта только логика.
* Реализован только одиночный режим; сетевой игры нет.

---

## 10. Заметки по окружению

* Проверено на Node **v20.19.4**, npm **10.8.2**; в `node_modules` 521 пакет верхнего уровня.
* `npx tsc --noEmit` — без ошибок; `npx jest --runInBand` — 5 наборов, 25 тестов; `npm run build` — `✓ 120 modules transformed`, бандл 203 КБ.
* **Ограниченный режим DSH.** Процесс оболочки работает на низком уровне целостности (`S-1-16-4096`), поэтому запись в рабочую папку блокируется политикой мандатных меток — это штатное ограничение песочницы, а не проблема прав доступа. Операции, требующие записи (`git`, `npm install`, `npm run build`, удаление файлов), выполнялись отдельными командами с полным доступом с подтверждением пользователя.
* **Jest в песочнице** не может порождать рабочие процессы и падает с `spawn EPERM`; помогает `npx jest --runInBand`. То же ограничение вызывает `spawn EPERM` у `esbuild` при `npm run build`.
* В начале работы рабочая папка была недоступна оболочке из-за прав Windows. Права восстановлены штатным диагностическим скриптом DSH; резервная копия прав и команда отката — в `C:\my_projects\dsh-acl-recovery\`.
