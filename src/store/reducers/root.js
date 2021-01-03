import {combineReducers} from "redux";
import {gameMode} from "./game-mode/game-mode";
import {opponentField} from "./opponent-field/opponent-field";
import {playerField} from "./player-field/player-field";
import {playerShips} from "./player-ships/player-ships";

const NameSpace = {
  PLAYER_FIELD: `PLAYER_FIELD`,
  PLAYER_SHIPS: `PLAYER_SHIPS`,
  OPPONENT_FIELD: `OPPONENT_FIELD`,
  GAME_MODE: `GAME_MODE`
};

export {NameSpace};
export default combineReducers({
  [NameSpace.PLAYER_FIELD]: playerField,
  [NameSpace.PLAYER_SHIPS]: playerShips,
  [NameSpace.OPPONENT_FIELD]: opponentField,
  [NameSpace.GAME_MODE]: gameMode
});