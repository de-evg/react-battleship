import React from "react";
import PropTypes from "prop-types";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {appRoute} from "../../const";
import MainScreen from "../main-screen/main-screen";
import SingleplayerScreen from "../singleplayer-screen/singleplayer-screen";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={appRoute.MAIN} render={(props) => <MainScreen history={props.history} />} />
        <Route exact path={appRoute.SINGLE} render={(props) => <SingleplayerScreen history={props.history} />} />
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  history: PropTypes.object
};

export default App;
