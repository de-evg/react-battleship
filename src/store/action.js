export const ActionType = {
  INIT: `INIT`
};

export const ActionCreator = {
  initBattlefield: (filed) => ({
    type:`INIT`,
    payload: filed
  })
};