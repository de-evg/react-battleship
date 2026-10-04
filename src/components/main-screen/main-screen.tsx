import React, {useCallback, useEffect} from "react";
import {RouteComponentProps} from "react-router-dom";
import {appRoute} from "../../const";
import {connect} from "react-redux";
import {ActionCreator} from "../../store/action";
import type {Action} from "../../store/action";
import type {Dispatch} from "redux";

interface MainScreenProps extends RouteComponentProps {
  resetStore: () => void;
}

const MainScreen: React.FC<MainScreenProps> = ({history, resetStore}) => {
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

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  resetStore() {
    dispatch(ActionCreator.resetGameMode());
    dispatch(ActionCreator.resetUserField());
    dispatch(ActionCreator.resetUserShips());
    dispatch(ActionCreator.resetOpponentField());
  }
});

export default connect(null, mapDispatchToProps)(MainScreen);
