import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { appRoute, GameMode } from "../../const";
import { NameSpace } from "../../store/reducers/root";
import OpponentField from "../opponent-field/opponent-field";
import UserFiled from "../user-field/user-field";
import { ActionCreator } from "../../store/action";
import { generateComputerMove } from "../../move-model/computer-move";
import {generatePlayerMove} from "../../move-model/player-move";

const SingleplayerScreen = ({
  gameMode,
  updateGameMode,
  setShipOnPlace,
  shipTypeOnPlace,
  playerShipsData,
  resetGame,
  isAllShipPlaced,
  singleplayerGame,
  playerField,
  makeAComputerMove,
  makeAPlayerMove,
  opponentShipsData,
  opponentField
}) => {
  const { isPlayerMove, isReplayMove } = singleplayerGame;
  const [isCompMove, setCompMove] = useState(true);

  useEffect(() => {    
    if (gameMode === GameMode.IN_MENU) {
      updateGameMode(GameMode.SINGLE_ON_START);
    }
    if (gameMode === GameMode.ARRAGMENT && isAllShipPlaced) {
      updateGameMode(GameMode.SINGLE_SHIPS_READY);
    }
    let delay;
    if (gameMode === GameMode.GAME && (!isPlayerMove || isReplayMove)) {
      delay = setTimeout(() => setCompMove(true), 700);      
    }

    if (gameMode === GameMode.GAME && !isPlayerMove && isCompMove) {      
      const computerMove = generateComputerMove(
        playerField,
        playerShipsData,
        singleplayerGame
      );      
        setCompMove(false);      
      makeAComputerMove(computerMove);      
    }
    return () => clearTimeout(delay);
  }, [
    setCompMove,
    isReplayMove,
    gameMode,
    updateGameMode,
    isAllShipPlaced,
    playerField,
    playerShipsData,
    singleplayerGame,
    makeAComputerMove,
    isPlayerMove,
    isCompMove
  ]);

  const handlePlaceShipBtnClick = useCallback(() => {
    updateGameMode(GameMode.ARRAGMENT);
    const firstShip = playerShipsData["deck" + shipTypeOnPlace][0];
    setShipOnPlace(firstShip);
  }, [updateGameMode, setShipOnPlace, shipTypeOnPlace, playerShipsData]);

  const handleResetBtnClick = useCallback(() => {
    resetGame();
  }, [resetGame]);

  const handleStartGameBtnClick = useCallback(() => {
    updateGameMode(GameMode.GAME);
  }, [updateGameMode]);

  const handlePlayerMove = useCallback((evt) => {
    if (
      evt.target.tagName === "LI" && evt.target.classList.contains(`battlefield__square`) &&
      gameMode === GameMode.GAME && isPlayerMove) {
        const playerMove = generatePlayerMove(evt.target, opponentField, opponentShipsData, singleplayerGame);
        makeAPlayerMove(playerMove);
      }
  }, [gameMode, isPlayerMove, makeAPlayerMove, opponentField, opponentShipsData, singleplayerGame]);

  return (
    <section className={"seabattle"}>
      <div className="container">
        <header className="header">
          <h1 className="visually--hidden">Морской бой</h1>
          <nav className="nav">
            <Link className="nav__item" to={appRoute.MAIN}>
              Главное меню
            </Link>
            <div className="nav__item" onClick={handleResetBtnClick}>
              Перезапустить
            </div>
            {gameMode === GameMode.SINGLE_ON_START && (
              <div className="nav__item" onClick={handlePlaceShipBtnClick}>
                Разместить корабли
              </div>
            )}
            {gameMode === GameMode.SINGLE_SHIPS_READY && (
              <div className="nav__item" onClick={handleStartGameBtnClick}>
                Начать игру
              </div>
            )}
          </nav>
        </header>
        <main className="main">
          <UserFiled />
          <OpponentField onBattlefieldClickHandler={handlePlayerMove} />
        </main>
      </div>
    </section>
  );
};

SingleplayerScreen.propTypes = {
  gameMode: PropTypes.string.isRequired,
  updateGameMode: PropTypes.func.isRequired,
  setShipOnPlace: PropTypes.func.isRequired,
  shipTypeOnPlace: PropTypes.number.isRequired,
  playerShipsData: PropTypes.object.isRequired,
  resetGame: PropTypes.func.isRequired,
  isAllShipPlaced: PropTypes.bool.isRequired,
  singleplayerGame: PropTypes.object.isRequired,
  playerField: PropTypes.object.isRequired,
  makeAComputerMove: PropTypes.func.isRequired,
  makeAPlayerMove: PropTypes.func.isRequired,
  opponentField: PropTypes.object.isRequired,
  opponentShipsData: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  gameMode: state[NameSpace.GAME_MODE].gameMode,
  shipTypeOnPlace: state[NameSpace.PLAYER_SHIPS].shipTypeOnPlace,
  playerShipsData: state[NameSpace.PLAYER_SHIPS].playerShipsData,
  isAllShipPlaced: state[NameSpace.PLAYER_SHIPS].isAllShipPlaced,
  playerField: state[NameSpace.PLAYER_FIELD].playerField,
  singleplayerGame: state[NameSpace.SINGLEPLAYER_GAME],
  opponentField: state[NameSpace.OPPONENT_FIELD].opponentField,
  opponentShipsData: state[NameSpace.OPPONENT_SHIPS].opponentShipsData
});

const mapDispatchToProps = (dispatch) => ({
  updateGameMode(mode) {
    dispatch(ActionCreator.changeGameMode(mode));
  },
  setShipOnPlace(newShip) {
    dispatch(ActionCreator.updateShipOnPlace(newShip));
  },
  resetGame() {
    dispatch(ActionCreator.changeGameMode(GameMode.SINGLE_ON_START));
    dispatch(ActionCreator.resetUserShips());
    dispatch(ActionCreator.resetUserField());
    dispatch(ActionCreator.resetOpponentShips());
    dispatch(ActionCreator.resetOpponentField());
  },
  makeAComputerMove({playerShipsData, playerField, singleplayerGame}) {
    dispatch(ActionCreator.updateUserShips(playerShipsData));
    dispatch(ActionCreator.updateUserField(playerField));
    dispatch(
      ActionCreator.updateSingleplayerGame(singleplayerGame)
    );
  },
  makeAPlayerMove({opponentShipsData, opponentField, singleplayerGame}) {
    dispatch(ActionCreator.updateOpponentShips(opponentShipsData));
    dispatch(ActionCreator.updateOpponentField(opponentField));
    dispatch(
      ActionCreator.updateSingleplayerGame(singleplayerGame)
    );
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleplayerScreen);
