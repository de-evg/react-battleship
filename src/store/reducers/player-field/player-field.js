/* eslint-disable default-case */
import {generateBasicGameFieldData} from "../../../utils/fields";
import {ActionType} from "../../action";

const initialState = {
  playerField: generateBasicGameFieldData()
}

export const playerField = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.RESET_USER_FIELD:
      return {...state, ...initialState}

    case ActionType.UPDATE_USER_FIELD:
      return {...state, playerField: action.payload}
  }
  return state;
};
