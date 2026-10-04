import type { GameModeType, WinnerType } from "../const";
import type { GameFieldData } from "../utils/fields";
import type { Ship, ShipList } from "../utils/ships";
import type { SingleplayerGameState } from "./reducers/singleplayer-game/singleplayer-game";

export const ActionType = {
  CHANGE_GAME_MODE: `CHANGE_GAME_MODE`,
  RESET_USER_SHIPS: `RESET_USER_SHIPS`,
  RESET_USER_FIELD: `RESET_USER_FIELD`,
  RESET_OPPONENT_SHIPS: `RESET_OPPONENT_SHIPS`,
  RESET_OPPONENT_FIELD: `RESET_OPPONENT_FIELD`,
  RESET_GAME_MODE: `RESET_GAME_MODE`,
  UPDATE_USER_FIELD: `UPDATE_USER_FIELD`,
  UPDATE_SHIP_ON_PLACE: `UPDATE_SHIP_ON_PLACE`,
  ALL_SHIPS_PLACED: `ALL_SHIPS_PLACED`,
  SHIP_PLACED: `SHIP_PLACED`,
  GENERATE_RANDOM_SHIPS: `GENERATE_RANDOM_SHIPS`,
  PLACE_COMPUTER_SHIPS: `PLACE_COMPUTER_SHIPS`,
  OPPONENT_SHIP_PLACED: `OPPONENT_SHIP_PLACED`,
  UPDATE_USER_SHIPS: `UPDATE_USER_SHIPS`,
  UPDATE_SINGLEPLAYER_GAME: `UPDATE_SINGLEPLAYER_GAME`,
  UPDATE_OPPONENT_SHIPS: `UPDATE_OPPONENT_SHIPS`,
  UPDATE_OPPONENT_FIELD: `UPDATE_OPPONENT_FIELD`,
  SET_WINNER: `SET_WINNER`,
  RESET_SINGLEPLAYER_SETTINGS: `RESET_SINGLEPLAYER_SETTINGS`,
} as const;

/** Корабль, который игрок ставит на поле. Пока корабль не выбран — пустой объект. */
export type ShipOnPlace = Ship | {};

export interface PlaceShipPayload {
  shipTypeOnPlace: number;
  playerShipsData: ShipList;
  isAllShipPlaced: boolean;
}

/** Аргумент обработчика расстановки в `UserField`. */
export interface PlaceShipRequest extends PlaceShipPayload {
  playerField: GameFieldData;
  currentShipOnPlace: ShipOnPlace;
}

export interface PlaceComputerShipsPayload {
  fieldsData: GameFieldData;
  shipsData: ShipList;
}

export interface WinnerPayload {
  winner: WinnerType | string;
  isGameOver: boolean;
}

export type Action =
  | { type: typeof ActionType.CHANGE_GAME_MODE; payload: GameModeType }
  | { type: typeof ActionType.RESET_USER_SHIPS }
  | { type: typeof ActionType.RESET_USER_FIELD }
  | { type: typeof ActionType.RESET_OPPONENT_SHIPS }
  | { type: typeof ActionType.RESET_OPPONENT_FIELD }
  | { type: typeof ActionType.RESET_GAME_MODE }
  | { type: typeof ActionType.UPDATE_USER_FIELD; payload: GameFieldData }
  | { type: typeof ActionType.UPDATE_SHIP_ON_PLACE; payload: ShipOnPlace }
  | { type: typeof ActionType.ALL_SHIPS_PLACED }
  | { type: typeof ActionType.SHIP_PLACED; payload: PlaceShipPayload }
  | { type: typeof ActionType.GENERATE_RANDOM_SHIPS }
  | { type: typeof ActionType.PLACE_COMPUTER_SHIPS; payload: PlaceComputerShipsPayload }
  | { type: typeof ActionType.OPPONENT_SHIP_PLACED }
  | { type: typeof ActionType.UPDATE_USER_SHIPS; payload: ShipList }
  | { type: typeof ActionType.UPDATE_SINGLEPLAYER_GAME; payload: Partial<SingleplayerGameState> }
  | { type: typeof ActionType.UPDATE_OPPONENT_SHIPS; payload: ShipList | {} }
  | { type: typeof ActionType.UPDATE_OPPONENT_FIELD; payload: GameFieldData }
  | { type: typeof ActionType.SET_WINNER; payload: WinnerPayload }
  | { type: typeof ActionType.RESET_SINGLEPLAYER_SETTINGS };

export const ActionCreator = {
  changeGameMode: (mode: GameModeType): Action => ({
    type: ActionType.CHANGE_GAME_MODE,
    payload: mode,
  }),
  resetUserShips: (): Action => ({
    type: ActionType.RESET_USER_SHIPS,
  }),
  resetUserField: (): Action => ({
    type: ActionType.RESET_USER_FIELD,
  }),
  resetOpponentShips: (): Action => ({
    type: ActionType.RESET_OPPONENT_SHIPS,
  }),
  resetOpponentField: (): Action => ({
    type: ActionType.RESET_OPPONENT_FIELD,
  }),
  resetGameMode: (): Action => ({
    type: ActionType.RESET_GAME_MODE,
  }),
  updateOpponentShips: (newShipsData: ShipList | {}): Action => ({
    type: ActionType.UPDATE_OPPONENT_SHIPS,
    payload: newShipsData,
  }),
  updateOpponentField: (newField: GameFieldData): Action => ({
    type: ActionType.UPDATE_OPPONENT_FIELD,
    payload: newField,
  }),
  updateUserField: (newField: GameFieldData): Action => ({
    type: ActionType.UPDATE_USER_FIELD,
    payload: newField,
  }),
  updateUserShips: (updatedShipsData: ShipList): Action => ({
    type: ActionType.UPDATE_USER_SHIPS,
    payload: updatedShipsData,
  }),
  updateShipOnPlace: (newShip: ShipOnPlace): Action => ({
    type: ActionType.UPDATE_SHIP_ON_PLACE,
    payload: newShip,
  }),
  updateAllShipPlaced: (): Action => ({
    type: ActionType.ALL_SHIPS_PLACED,
  }),
  placeShip: (nextShipData: PlaceShipPayload): Action => ({
    type: ActionType.SHIP_PLACED,
    payload: nextShipData,
  }),
  generateComputerShips: (): Action => ({
    type: ActionType.GENERATE_RANDOM_SHIPS,
  }),
  placeComputerShips: (opponentData: PlaceComputerShipsPayload): Action => ({
    type: ActionType.PLACE_COMPUTER_SHIPS,
    payload: opponentData,
  }),
  opponentShipPlaced: (): Action => ({
    type: ActionType.OPPONENT_SHIP_PLACED,
  }),
  updateSingleplayerGame: (newGameData: Partial<SingleplayerGameState>): Action => ({
    type: ActionType.UPDATE_SINGLEPLAYER_GAME,
    payload: newGameData,
  }),
  setWinner: (winnerData: WinnerPayload): Action => ({
    type: ActionType.SET_WINNER,
    payload: winnerData,
  }),
  resetSingleplayerGameSettings: (): Action => ({
    type: ActionType.RESET_SINGLEPLAYER_SETTINGS,
  }),
};
