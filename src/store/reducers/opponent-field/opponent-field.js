/* eslint-disable default-case */
import {
  generateBasicGameFieldData,
  placeComputerShips,
} from "../../../utils/fields";
import { ActionType } from "../../action";

const initialState = {
  opponentField: generateBasicGameFieldData(),
  opponentShipsPlaced: false,
};

export const opponentField = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.RESET_OPPONENT_FIELD:
      return { ...state, opponentField: generateBasicGameFieldData(), opponentShipsPlaced: false};

    case ActionType.PLACE_COMPUTER_SHIPS:
      return {
        ...state,
        opponentField: placeComputerShips(
          action.payload.fieldsData,
          action.payload.shipsData
        ),
      };
    case ActionType.OPPONENT_SHIP_PLACED:
      return {
        ...state,
        opponentShipsPlaced: true,
      };
    case ActionType.UPDATE_OPPONENT_FIELD:
      return {
        ...state,
        opponentField: action.payload,
      };
  }
  return state;
};
