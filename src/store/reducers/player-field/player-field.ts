/* eslint-disable default-case */
import { generateBasicGameFieldData, GameFieldData } from "../../../utils/fields";
import { ActionType } from "../../action";
import { Action } from "../../action";

interface PlayerFieldState {
  playerField: GameFieldData;
}

const initialState: PlayerFieldState = {
  playerField: generateBasicGameFieldData()
};

export const playerField = (state: PlayerFieldState = {...initialState}, action: Action): PlayerFieldState => {
  switch (action.type) {
    case ActionType.RESET_USER_FIELD:
      return {...state, playerField: generateBasicGameFieldData()};

    case ActionType.UPDATE_USER_FIELD:
      return {...state, playerField: action.payload};
  }
  return state;
};
