import { GameModeType, WinnerType } from "../const";

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
  RESET_SINGLEPLAYER_SETTINGS: `RESET_SINGLEPLAYER_SETTINGS`
} as const;

export interface Action {
  type: string;
  payload?: any;
}

export const ActionCreator = {
  changeGameMode: (mode: GameModeType): Action => ({
    type: `CHANGE_GAME_MODE`,
    payload: mode
  }),
  resetUserShips: (): Action => ({
    type: `RESET_USER_SHIPS`,
  }),
  resetUserField: (): Action => ({
    type: `RESET_USER_FIELD`,
  }),
  resetOpponentShips: (): Action => ({
    type: `RESET_OPPONENT_SHIPS`,
  }),
  resetOpponentField: (): Action => ({
    type: `RESET_OPPONENT_FIELD`,
  }),
  resetGameMode: (): Action => ({
    type: `RESET_GAME_MODE`
  }),
  updateOpponentShips: (newShipsData: any): Action => ({
    type: `UPDATE_OPPONENT_SHIPS`,
    payload: newShipsData
  }),
  updateOpponentField: (newField: any): Action => ({
    type: `UPDATE_OPPONENT_FIELD`,
    payload: newField
  }),
  updateUserField: (newField: any): Action => ({
    type: `UPDATE_USER_FIELD`,
    payload: newField
  }),
  updateUserShips: (updatedShipsData: any): Action => ({
    type: `UPDATE_USER_SHIPS`,
    payload: updatedShipsData
  }),
  updateShipOnPlace: (newShip: any): Action => ({
    type: `UPDATE_SHIP_ON_PLACE`,
    payload: newShip
  }),
  updateAllShipPlaced: (): Action => ({
    type: `ALL_SHIPS_PLACED`    
  }),
  placeShip: (nextShipData: any): Action => ({
    type: `SHIP_PLACED`,
    payload: nextShipData
  }),
  generateComputerShips: (): Action => ({
    type: `GENERATE_RANDOM_SHIPS`,
  }),
  placeComputerShips: (opponentData: any): Action => ({
    type: `PLACE_COMPUTER_SHIPS`,
    payload: opponentData
  }),
  opponentShipPlaced: (): Action => ({
    type: `OPPONENT_SHIP_PLACED`
  }),
  updateSingleplayerGame: (newGameData: any): Action => ({
    type: `UPDATE_SINGLEPLAYER_GAME`,
    payload: newGameData
  }),
  setWinner: (winnerData: {winner: WinnerType | string, isGameOver: boolean}): Action => ({
    type: `SET_WINNER`,
    payload: winnerData
  }),
  resetSingleplayerGameSettings: (): Action => ({
    type: `RESET_SINGLEPLAYER_SETTINGS`,
  })
};
