/* eslint-disable default-case */

import { generateCompShipList } from "../../../utils/randomShips";
import { ActionType } from "../../action";
import { Action, OpponentShipsData } from "../../action";

export interface OpponentShipsState {
  opponentShipsData: OpponentShipsData;
}

const initialState: OpponentShipsState = {
  opponentShipsData: {},
};

export const opponentShips = (state: OpponentShipsState = initialState, action: Action): OpponentShipsState => {
  switch (action.type) {
    case ActionType.RESET_OPPONENT_SHIPS:
      return { ...state, opponentShipsData: {} };

    case ActionType.GENERATE_RANDOM_SHIPS:
      return { ...state, opponentShipsData: generateCompShipList() };
    case ActionType.UPDATE_OPPONENT_SHIPS:
      return {...state, opponentShipsData: action.payload};
  }
  return state;
};
