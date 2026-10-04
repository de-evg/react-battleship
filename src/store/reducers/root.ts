import {combineReducers} from "redux";
import {gameMode} from "./game-mode/game-mode";
import {opponentField} from "./opponent-field/opponent-field";
import {opponentShips} from "./opponent-ships/opponent-ships";
import {playerField} from "./player-field/player-field";
import {playerShips} from "./player-ships/player-ships";
import {singleplayerGame} from "./singleplayer-game/singleplayer-game";
import type {GameModeState} from "./game-mode/game-mode";
import type {OpponentFieldState} from "./opponent-field/opponent-field";
import type {OpponentShipsState} from "./opponent-ships/opponent-ships";
import type {PlayerFieldState} from "./player-field/player-field";
import type {PlayerShipsState} from "./player-ships/player-ships";
import type {SingleplayerGameState} from "./singleplayer-game/singleplayer-game";

export const NameSpace = {
  PLAYER_FIELD: `PLAYER_FIELD`,
  PLAYER_SHIPS: `PLAYER_SHIPS`,
  OPPONENT_FIELD: `OPPONENT_FIELD`,
  OPPONENT_SHIPS: `OPPONENT_SHIPS`,
  GAME_MODE: `GAME_MODE`,
  SINGLEPLAYER_GAME: `SINGLEPLAYER_GAME`
} as const;

/** Полное состояние приложения. Ключи совпадают со значениями `NameSpace`. */
export interface RootState {
  PLAYER_FIELD: PlayerFieldState;
  PLAYER_SHIPS: PlayerShipsState;
  OPPONENT_FIELD: OpponentFieldState;
  OPPONENT_SHIPS: OpponentShipsState;
  GAME_MODE: GameModeState;
  SINGLEPLAYER_GAME: SingleplayerGameState;
}

export default combineReducers({
  [NameSpace.PLAYER_FIELD]: playerField,
  [NameSpace.PLAYER_SHIPS]: playerShips,
  [NameSpace.OPPONENT_FIELD]: opponentField,
  [NameSpace.OPPONENT_SHIPS]: opponentShips,
  [NameSpace.GAME_MODE]: gameMode,
  [NameSpace.SINGLEPLAYER_GAME]: singleplayerGame
});
