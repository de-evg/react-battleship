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
  SHIP_PLACED: `SHIP_PLACED`
};

export const ActionCreator = {
  changeGameMode: (mode) => ({
    type:`CHANGE_GAME_MODE`,
    payload: mode
  }),
  resetUserShips: () => ({
    type: `RESET_USER_SHIPS`,
  }),
  resetUserField: () => ({
    type: `RESET_USER_FIELD`,
  }),
  resetOpponentShips: () => ({
    type: `RESET_OPPONENT_SHIPS`,
  }),
  resetOpponentField: () => ({
    type: `RESET_OPPONENT_FIELD`,
  }),
  resetGameMode: () => ({
    type: `RESET_GAME_MODE`
  }),
  updateUserField: (newField) => ({
    type: `UPDATE_USER_FIELD`,
    payload: newField
  }),
  updateShipOnPlace: (newShip) => ({
    type: `UPDATE_SHIP_ON_PLACE`,
    payload: newShip
  }),
  updateAllShipPlaced: () => ({
    type: `ALL_SHIPS_PLACED`    
  }),
  placeShip:  (nextShipData) => ({
    type: `SHIP_PLACED`,
    payload: nextShipData
  })
};