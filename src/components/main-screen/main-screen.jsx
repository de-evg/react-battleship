import React, {useCallback} from "react";
import PropTypes from "prop-types";
import {appRoute} from "../../const";

const MainScreen = ({history}) => {
  const handleSinglePlayerBtnClick = useCallback(() => {
    history.push(appRoute.SINGLE);
  }, [history]);
  const handleMultyPlayerBtnClick = () => {};

  return (
    <div className={"game__container"}>
      <button className={"btn"} onClick={handleSinglePlayerBtnClick}>Одиночная игра</button>
      <button className={"btn"} onClick={handleMultyPlayerBtnClick}>Сетевая игра</button>
    </div>
  );
};

MainScreen.propTypes = {
  history: PropTypes.object.isRequired
};

export default MainScreen;
