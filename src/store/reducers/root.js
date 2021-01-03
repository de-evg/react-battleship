import {combineReducers} from "redux";
import {opponentField} from "./opponent-field/opponent-field";
import {playerField} from "./player-field/player-field";

const NameSpace = {
  PLAYER_FIELD: `PLAYER_FIELD`,
  OPPONENT_FIELD: `OPPONENT_FIELD`
};

export {NameSpace};
export default combineReducers({
  [NameSpace.PLAYER_FIELD]: playerField,
  [NameSpace.OPPONENT_FIELD]: opponentField
});