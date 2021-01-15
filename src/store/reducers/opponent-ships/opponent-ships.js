/* eslint-disable default-case */

import { generateCompShipList } from "../../../utils/randomShips";
import { ActionType } from "../../action";

const initialState = {
  opponentShipsData: {},
};

export const opponentShips = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.RESET_OPPONENT_SHIPS:
      return { ...state, opponentShipsData: {} };

    case ActionType.GENERATE_RANDOM_SHIPS:
      return { ...state, opponentShipsData: generateCompShipList() };
    case ActionType.UPDATE_OPPONENT_SHIPS:
      return {...state, opponentShipsData: action.payload}
  }
  return state;
};
