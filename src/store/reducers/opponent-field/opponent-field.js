/* eslint-disable default-case */
import {generateBasicGameFieldData} from "../../../utils/fields";
import {ActionType} from "../../action";

const initialState = {
  opponentField: generateBasicGameFieldData()
}

export const opponentField = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.RESET_OPPONENT_FIELD:
      return {...state, ...initialState}
  }
  return state;
};
