import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {appRoute} from "../../const";
import MainScreen from "../main-screen/main-screen";
import SingleplayerScreen from "../singleplayer-screen/singleplayer-screen";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={appRoute.MAIN} component={MainScreen} />
        <Route exact path={appRoute.SINGLE} component={SingleplayerScreen} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
