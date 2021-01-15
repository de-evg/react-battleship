/* eslint-disable default-case */
import {ActionCreator, ActionType} from "../../action";

const generateAimList = () => {
  const aimList = []; 
  for (let column = 0; column < 10; column++) {
      for (let row = 0; row < 10; row++) {
          const aim = column.toString() + row.toString();
          aimList.push(aim);        
      }    
  }
  return aimList;
};

const initialState = {
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

export const singleplayerGame = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.UPDATE_SINGLEPLAYER_GAME:
      return {...state, ...action.payload}
    case ActionType.SET_WINNER:
      return {...state, ...action.payload}
  }
  return state;
};