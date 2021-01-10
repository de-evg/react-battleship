/* eslint-disable default-case */
import {ActionType} from "../../action";
import {GameMode} from "../../../const";

const initialState = {
  gameMode: GameMode.IN_MENU
}

export const gameMode = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.RESET_GAME_MODE:
      return {...state, ...initialState}
    case ActionType.CHANGE_GAME_MODE:
      return {gameMode: action.payload}
  }
  return state;
};