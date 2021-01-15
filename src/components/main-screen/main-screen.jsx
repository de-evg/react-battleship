import React, {useCallback, useEffect} from "react";
import PropTypes from "prop-types";
import {appRoute} from "../../const";
import {connect} from "react-redux";
import {ActionCreator} from "../../store/action";

const MainScreen = ({history, resetStore}) => {
  useEffect(() => {
    resetStore();
  }, [resetStore]);

  const handleSinglePlayerBtnClick = useCallback(() => {
    history.push(appRoute.SINGLE);
  }, [history]);  

  return (
    <div className={"game__container"}>
      <button className={"btn"} onClick={handleSinglePlayerBtnClick}>Начать игру</button>
    </div>
  );
};

MainScreen.propTypes = {
  history: PropTypes.object.isRequired,
  resetStore: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => ({
  resetStore() {
    dispatch(ActionCreator.resetGameMode());
    dispatch(ActionCreator.resetUserField());
    dispatch(ActionCreator.resetUserShips());
    dispatch(ActionCreator.resetOpponentField());
  }
});

export default connect(null, mapDispatchToProps)(MainScreen);
