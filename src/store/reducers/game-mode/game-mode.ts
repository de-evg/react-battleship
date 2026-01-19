/* eslint-disable default-case */
import { Action } from "../../action";
import { ActionType } from "../../action";
import { GameMode, GameModeType } from "../../../const";

interface GameModeState {
  gameMode: GameModeType;
}

const initialState: GameModeState = {
  gameMode: GameMode.IN_MENU
};

export const gameMode = (state: GameModeState = initialState, action: Action): GameModeState => {
  switch (action.type) {
    case ActionType.RESET_GAME_MODE:
      return {...state, ...initialState};
    case ActionType.CHANGE_GAME_MODE:
      return {gameMode: action.payload};
  }
  return state;
};
