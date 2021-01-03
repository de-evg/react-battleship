/* eslint-disable default-case */

import generateShipList from "../../../utils/ships";
import {ActionType} from "../../action";

const initialState = {
  palyerShips: generateShipList()
};

export const playerShips = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.INIT_PLAYER_SHIPS:
      return {palyerShips: action.payload}
  }
  return state;
};