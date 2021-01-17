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
  updateOpponentShips: (newShipsData) => ({
    type: `UPDATE_OPPONENT_SHIPS`,
    payload: newShipsData
  }),
  updateOpponentField: (newField) => ({
    type: `UPDATE_OPPONENT_FIELD`,
    payload: newField
  }),
  updateUserField: (newField) => ({
    type: `UPDATE_USER_FIELD`,
    payload: newField
  }),
  updateUserShips: (updatedShipsData) => ({
    type: `UPDATE_USER_SHIPS`,
    payload: updatedShipsData
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
  }),
  generateComputerShips: () => ({
    type: `GENERATE_RANDOM_SHIPS`,
  }),
  placeComputerShips: (opponentData) => ({
    type: `PLACE_COMPUTER_SHIPS`,
    payload: opponentData
  }),
  opponentShipPlaced: () => ({
    type: `OPPONENT_SHIP_PLACED`
  }),
  updateSingleplayerGame: (newGameData) => ({
    type: `UPDATE_SINGLEPLAYER_GAME`,
    payload: newGameData
  }),
  setWinner: (winner) => ({
    type: `SET_WINNER`,
    payload: winner
  }),
  resetSingleplayerGameSettings: () => ({
    type: `RESET_SINGLEPLAYER_SETTINGS`,
  })
};