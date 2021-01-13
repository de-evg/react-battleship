/* eslint-disable default-case */

import { generateShipList } from "../../../utils/ships";
import { ActionType } from "../../action";

const DEFAULT_SHIP_TYPE = 4;

const initialState = {
  playerShipsData: generateShipList(),
  currentShipOnPlace: {},
  shipTypeOnPlace: DEFAULT_SHIP_TYPE,
  isAllShipPlaced: false,
  shipTypeOnPlace: 4,
};

export const playerShips = (state = { ...initialState }, action) => {
  switch (action.type) {
    case ActionType.RESET_USER_SHIPS:
      return { ...state, ...initialState, playerShipsData: generateShipList() };

    case ActionType.UPDATE_SHIP_ON_PLACE:
      return { ...state, currentShipOnPlace: action.payload };

    case ActionType.ALL_SHIPS_PLACED:
      return { ...state, isAllShipPlaced: true };
    case ActionType.SHIP_PLACED:
      return {
        ...state,
        shipTypeOnPlace: action.payload.shipTypeOnPlace,
        playerShipsData: action.payload.playerShipsData,
        isAllShipPlaced: action.payload.isAllShipPlaced,
      };
    case ActionType.UPDATE_USER_SHIPS:
      return {
        ...state,
        playerShipsData: action.payload
      }
  }
  return state;
};
