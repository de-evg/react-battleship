import React, {useCallback, useEffect} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {appRoute, GameMode} from "../../const";
import {NameSpace} from "../../store/reducers/root";
import OpponentField from "../opponent-field/opponent-field";
import UserFiled from "../user-field/user-field";
import {ActionCreator} from "../../store/action";

const SingleplayerScreen = ({gameMode, updateGameMode}) => {

  useEffect(() => {
    if (gameMode === GameMode.IN_MENU) {
      updateGameMode(GameMode.SINGLE_ON_START);
    }    
  }, [gameMode, updateGameMode])

  const handlePlaceShipBtnClick = useCallback(() => {
    updateGameMode(GameMode.ARRAGMENT);
  }, [updateGameMode]);

  return (
    <section className={"seabattle"}>
      <div className="container">
        <header className="header">
          <h1 className="visually--hidden">Морской бой</h1>
          <nav className="nav">
            <Link className="nav__item" to={appRoute.MAIN}>Главное меню</Link>
            <div className="nav__item">Перезапустить</div>
            {
              gameMode === GameMode.SINGLE_ON_START &&
              <div className="nav__item" onClick={handlePlaceShipBtnClick}>Разместить корабли</div>
            }
            {
              gameMode === GameMode.SINGLE_SHIPS_READY &&
              <div className="nav__item" onClick={handlePlaceShipBtnClick}>Начать игру</div>
            }
          </nav>
        </header>
        <main className="main">
          <UserFiled />
          <OpponentField />
        </main>
      </div>
    </section>
  );
};

SingleplayerScreen.propTypes = {
  gameMode: PropTypes.string.isRequired,
  updateGameMode: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  gameMode: state[NameSpace.GAME_MODE].gameMode
});

const mapDispatchToProps = (dispatch) => ({
  updateGameMode(mode) {
    dispatch(ActionCreator.changeGameMode(mode))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleplayerScreen);