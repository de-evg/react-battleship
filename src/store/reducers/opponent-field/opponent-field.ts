/* eslint-disable default-case */
import {
  generateBasicGameFieldData,
  placeComputerShips,
  GameFieldData,
} from "../../../utils/fields";
import { ActionType } from "../../action";
import { Action } from "../../action";

interface OpponentFieldState {
  opponentField: GameFieldData;
  opponentShipsPlaced: boolean;
}

const initialState: OpponentFieldState = {
  opponentField: generateBasicGameFieldData(),
  opponentShipsPlaced: false,
};

export const opponentField = (state: OpponentFieldState = initialState, action: Action): OpponentFieldState => {
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
