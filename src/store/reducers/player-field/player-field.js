/* eslint-disable default-case */
import {generateBasicGameFieldData} from "../../../utils/fields";
import {ActionType} from "../../action";

const initialState = {
  palyerField: generateBasicGameFieldData()
}

export const playerField = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.INIT_PLAYER:
      return {palyerField: action.payload}
  }
  return state;
};
