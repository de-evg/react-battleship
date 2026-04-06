import React, { useCallback, useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { Link, RouteComponentProps } from "react-router-dom";
import { appRoute, GameMode, Winner } from "../../const";
import { NameSpace } from "../../store/reducers/root";
import OpponentField from "../opponent-field/opponent-field";
import UserField from "../user-field/user-field";
import { ActionCreator } from "../../store/action";
import { generateComputerMove } from "../../move-model/computer-move";
import { generatePlayerMove } from "../../move-model/player-move";
import { checkOnGameOver } from "../../move-model/victory";
import { GameModeType, WinnerType } from "../../const";
import { GameFieldData } from "../../utils/fields";
import { ShipList } from "../../utils/ships";
import { SingleplayerGameState } from "../../store/reducers/singleplayer-game/singleplayer-game";

interface SingleplayerScreenProps extends RouteComponentProps {
  gameMode: GameModeType;
  updateGameMode: (mode: GameModeType) => void;
  setShipOnPlace: (newShip: any) => void;
  shipTypeOnPlace: number;
  playerShipsData: ShipList;
  resetGame: () => void;
  isAllShipPlaced: boolean;
  singleplayerGame: SingleplayerGameState;
  playerField: GameFieldData;
  makeAComputerMove: (move: any) => void;
  makeAPlayerMove: (move: any) => void;
  opponentShipsData: ShipList | {};
  opponentField: GameFieldData;
  setWinner: (winnerData: {winner: WinnerType | string, isGameOver: boolean}) => void;
}

const SingleplayerScreen: React.FC<SingleplayerScreenProps> = ({
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
  opponentField,
  setWinner,
}) => {
  const { isPlayerMove, isReplayMove, isGameOver, winner } = singleplayerGame;
  const [isCompMove, setCompMove] = useState(true);
  const navRef = useRef<HTMLElement>(null);
  const navToggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (gameMode === GameMode.GAME) {
      const winnerResult = checkOnGameOver(playerShipsData, opponentShipsData as ShipList);
      if (winnerResult.isGameOver) {
        setWinner(winnerResult);
        updateGameMode(GameMode.GAME_OVER);
      }
    }
  }, [gameMode, opponentShipsData, playerShipsData, setWinner, updateGameMode]);

  useEffect(() => {
    if (gameMode === GameMode.IN_MENU) {
      updateGameMode(GameMode.SINGLE_ON_START);
    }
    if (gameMode === GameMode.ARRAGMENT && isAllShipPlaced) {
      updateGameMode(GameMode.SINGLE_SHIPS_READY);
    }

    let delay: NodeJS.Timeout | undefined;
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
    return () => {
      if (delay) clearTimeout(delay);
    };
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
    isCompMove,
  ]);

  const handlePlaceShipBtnClick = useCallback(() => {
    updateGameMode(GameMode.ARRAGMENT);
    const firstShip = playerShipsData["deck" + shipTypeOnPlace as keyof ShipList][0];
    setShipOnPlace(firstShip);
  }, [updateGameMode, setShipOnPlace, shipTypeOnPlace, playerShipsData]);

  const handleResetBtnClick = useCallback(() => {
    resetGame();
  }, [resetGame]);

  const handleStartGameBtnClick = useCallback(() => {
    if (navRef.current) navRef.current.classList.add(`nav--hidden`);
    if (navToggleRef.current) navToggleRef.current.classList.add(`nav-toggle--hidden`);
    updateGameMode(GameMode.GAME);
  }, [updateGameMode]);

  const handleNavToggleBtnClick = useCallback(() => {
    if (navRef.current) navRef.current.classList.toggle(`nav--hidden`);
    if (navToggleRef.current) navToggleRef.current.classList.toggle(`nav-toggle--hidden`);
  }, []);

  const handlePlayerMove = useCallback(
    (evt: React.MouseEvent) => {
      if (
        (evt.target as HTMLElement).tagName === "LI" &&
        (evt.target as HTMLElement).classList.contains(`battlefield__square`) &&
        !(evt.target as HTMLElement).classList.contains(`miss`) &&
        !(evt.target as HTMLElement).classList.contains(`hit`) &&
        gameMode === GameMode.GAME &&
        isPlayerMove
      ) {
        const playerMove = generatePlayerMove(
          evt.target as HTMLElement,
          opponentField,
          opponentShipsData as ShipList,
          singleplayerGame
        );
        if (playerMove) {
          makeAPlayerMove(playerMove);
        }
      }
    },
    [
      gameMode,
      isPlayerMove,
      makeAPlayerMove,
      opponentField,
      opponentShipsData,
      singleplayerGame,
    ]
  );

  return (
    <section className={"seabattle"}>
      <div className="container">
        <header className="header">
          <h1 className="visually--hidden">Морской бой</h1>
          <button ref={navToggleRef} className="nav-toggle" onClick={handleNavToggleBtnClick}></button>
          <nav ref={navRef} className="nav">
            <Link className="btn nav__item" to={appRoute.MAIN} onClick={handleResetBtnClick}>
              Главное меню
            </Link>
            <button className="btn nav__item" onClick={handleResetBtnClick}>
              Перезапустить
            </button>
            {gameMode === GameMode.SINGLE_ON_START && (
              <button className="btn nav__item" onClick={handlePlaceShipBtnClick}>
                Разместить корабли
              </button>
            )}
            {gameMode === GameMode.SINGLE_SHIPS_READY && (
              <button className="btn nav__item" onClick={handleStartGameBtnClick}>
                Начать игру
              </button>
            )}
          </nav>
          
        </header>
        <main className="main">
          <UserField />
          {gameMode === GameMode.GAME && isPlayerMove && !isGameOver && (
            <p className="info info__move-arrow--right">Ваш ход</p>
          )}
          {gameMode === GameMode.GAME && !isPlayerMove && !isGameOver && (
            <p className="info info__move-arrow--left">Ход противника</p>
          )}
          {gameMode !== GameMode.GAME && !isGameOver && (
            <div className="info"></div>
          )}

          {gameMode === GameMode.GAME_OVER &&
            winner === Winner.FIRST_PLAYER && (
              <div className="info">
                <p>Поздравляю!</p>
                <p>Вы победили</p>
              </div>
            )}

          {gameMode === GameMode.GAME_OVER &&
            winner === Winner.SECOND_PLAYER && (
              <div className="info">
                <p>К сожалению, Вы проиграли</p>
              </div>
            )}
          <OpponentField onBattlefieldClickHandler={handlePlayerMove} />
        </main>
      </div>
    </section>
  );
};

const mapStateToProps = (state: any) => ({
  gameMode: state[NameSpace.GAME_MODE].gameMode,
  shipTypeOnPlace: state[NameSpace.PLAYER_SHIPS].shipTypeOnPlace,
  playerShipsData: state[NameSpace.PLAYER_SHIPS].playerShipsData,
  isAllShipPlaced: state[NameSpace.PLAYER_SHIPS].isAllShipPlaced,
  playerField: state[NameSpace.PLAYER_FIELD].playerField,
  singleplayerGame: state[NameSpace.SINGLEPLAYER_GAME],
  opponentField: state[NameSpace.OPPONENT_FIELD].opponentField,
  opponentShipsData: state[NameSpace.OPPONENT_SHIPS].opponentShipsData,
});

const mapDispatchToProps = (dispatch: any) => ({
  updateGameMode(mode: GameModeType) {
    dispatch(ActionCreator.changeGameMode(mode));
  },
  setShipOnPlace(newShip: any) {
    dispatch(ActionCreator.updateShipOnPlace(newShip));
  },
  resetGame() {
    dispatch(ActionCreator.changeGameMode(GameMode.SINGLE_ON_START));
    dispatch(ActionCreator.resetUserShips());
    dispatch(ActionCreator.resetUserField());
    dispatch(ActionCreator.resetOpponentShips());
    dispatch(ActionCreator.resetOpponentField());
    dispatch(ActionCreator.setWinner({winner: ``, isGameOver: false}));
    dispatch(ActionCreator.resetSingleplayerGameSettings());
  },
  makeAComputerMove({ playerShipsData, playerField, singleplayerGame }: any) {
    dispatch(ActionCreator.updateUserShips(playerShipsData));
    dispatch(ActionCreator.updateUserField(playerField));
    dispatch(ActionCreator.updateSingleplayerGame(singleplayerGame));
  },
  makeAPlayerMove({ opponentShipsData, opponentField, singleplayerGame }: any) {
    dispatch(ActionCreator.updateOpponentShips(opponentShipsData));
    dispatch(ActionCreator.updateOpponentField(opponentField));
    dispatch(ActionCreator.updateSingleplayerGame(singleplayerGame));
  },
  setWinner(winnerData: {winner: WinnerType | string, isGameOver: boolean}) {
    dispatch(ActionCreator.setWinner(winnerData));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleplayerScreen);
