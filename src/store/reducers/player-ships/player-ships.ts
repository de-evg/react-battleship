/* eslint-disable default-case */

import { generateShipList, ShipList } from "../../../utils/ships";
import { ActionType } from "../../action";
import { Action } from "../../action";

const DEFAULT_SHIP_TYPE = 4;

interface PlayerShipsState {
  playerShipsData: ShipList;
  currentShipOnPlace: any;
  shipTypeOnPlace: number;
  isAllShipPlaced: boolean;
}

const initialState: PlayerShipsState = {
  playerShipsData: generateShipList(),
  currentShipOnPlace: {},
  shipTypeOnPlace: DEFAULT_SHIP_TYPE,
  isAllShipPlaced: false,
};

export const playerShips = (state: PlayerShipsState = { ...initialState }, action: Action): PlayerShipsState => {
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
      };
  }
  return state;
};
