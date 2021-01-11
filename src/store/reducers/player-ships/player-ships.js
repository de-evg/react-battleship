/* eslint-disable default-case */

import generateShipList from "../../../utils/ships";
import {ActionType} from "../../action";

const DEFAULT_SHIP_TYPE = 4;

const initialState = {
  playerShips: generateShipList(),
  currentShipOnPlace: {},
  shipTypeOnPlace: DEFAULT_SHIP_TYPE,
  isAllShipPlaced: false,
  shipTypeOnPlace: 4
};

export const playerShips = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.RESET_USER_SHIPS:
      return {...state, ...initialState}
    
    case ActionType.UPDATE_SHIP_ON_PLACE:
      return {...state, currentShipOnPlace: action.payload}
    
    case ActionType.ALL_SHIPS_PLACED:
        return {...state, isAllShipPlaced: true}
    case ActionType.SHIP_PLACED:
        return {...state, shipTypeOnPlace: action.payload.shipTypeOnPlace, playerShips: action.payload.shipsData}
  }
  return state;
};