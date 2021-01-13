import {combineReducers} from "redux";
import {gameMode} from "./game-mode/game-mode";
import {opponentField} from "./opponent-field/opponent-field";
import {opponentShips} from "./opponent-ships/opponent-ships";
import {playerField} from "./player-field/player-field";
import {playerShips} from "./player-ships/player-ships";
import {singleplayerGame} from "./singleplayer-game/singleplayer-game";

const NameSpace = {
  PLAYER_FIELD: `PLAYER_FIELD`,
  PLAYER_SHIPS: `PLAYER_SHIPS`,
  OPPONENT_FIELD: `OPPONENT_FIELD`,
  OPPONENT_SHIPS: `OPPONENT_SHIPS`,
  GAME_MODE: `GAME_MODE`,
  SINGLEPLAYER_GAME: `SINGLEPLAYER_GAME`
};

export {NameSpace};
export default combineReducers({
  [NameSpace.PLAYER_FIELD]: playerField,
  [NameSpace.PLAYER_SHIPS]: playerShips,
  [NameSpace.OPPONENT_FIELD]: opponentField,
  [NameSpace.OPPONENT_SHIPS]: opponentShips,
  [NameSpace.GAME_MODE]: gameMode,
  [NameSpace.SINGLEPLAYER_GAME]: singleplayerGame
});