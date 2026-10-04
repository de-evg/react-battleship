/* eslint-disable default-case */
import { ActionType, Action } from "../../action";
import { WinnerType } from "../../../const";

interface IntendedAims {
  verticalUp: string[];
  verticalDown: string[];
  horizontalUp: string[];
  horizontalDown: string[];
}

export interface SingleplayerGameState {
  isPlayerMove: boolean;
  isReplayMove: boolean;
  computerLastShot: string;
  playerLastShot: string;
  isDirectionToUpper: boolean;
  isDirectionChanged: boolean;
  isOrietationChanged: boolean;
  isVertical: boolean;
  isKeepShooting: boolean;
  shotStatus: string;
  aimList: string[];
  intendedAims: IntendedAims;
  isGameOver: boolean;
  winner: WinnerType | string;
}

const generateAimList = (): string[] => {
  const aimList: string[] = []; 
  for (let column = 0; column < 10; column++) {
      for (let row = 0; row < 10; row++) {
          const aim = column.toString() + row.toString();
          aimList.push(aim);        
      }    
  }
  return aimList;
};

const initialState: SingleplayerGameState = {
  isPlayerMove: Math.random() > 0.5,
  isReplayMove: false,
  computerLastShot: ``,
  playerLastShot: ``,
  isDirectionToUpper: false,
  isDirectionChanged: false,
  isOrietationChanged: false,
  isVertical: false,
  isKeepShooting: false,
  shotStatus: ``,
  aimList: generateAimList(),
  intendedAims: {
    verticalUp: [],
    verticalDown: [],
    horizontalUp: [],
    horizontalDown: []
  },
  isGameOver: false,
  winner: ``
};

export const singleplayerGame = (state: SingleplayerGameState = {...initialState}, action: Action): SingleplayerGameState => {
  switch (action.type) {
    case ActionType.UPDATE_SINGLEPLAYER_GAME:
      return {...state, ...action.payload};
    case ActionType.SET_WINNER:
      return {...state, ...action.payload};
    case ActionType.RESET_SINGLEPLAYER_SETTINGS:
        return {...state, ...initialState};
  }
  return state;
};
