export const ActionType = {
  CHANGE_GAME_MODE: `CHANGE_GAME_MODE`
};

export const ActionCreator = {
  changeGameMode: (mode) => ({
    type:`CHANGE_GAME_MODE`,
    payload: mode
  })
};