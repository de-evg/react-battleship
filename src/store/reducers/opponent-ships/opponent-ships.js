/* eslint-disable default-case */

import { compShipList } from "../../../utils/randomShips";
import { ActionType } from "../../action";

const initialState = {
  opponentShipsData: {},
};

export const opponentShips = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.RESET_USER_SHIPS:
      return { ...state, ...initialState };

    case ActionType.GENERATE_RANDOM_SHIPS:
      return { ...state, opponentShipsData: compShipList };
    case ActionType.UPDATE_OPPONENT_SHIPS:
      return {...state, opponentShipsData: action.payload}
  }
  return state;
};
