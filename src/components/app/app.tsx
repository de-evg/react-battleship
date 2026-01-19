import React from "react";
import {BrowserRouter, Route, Switch, RouteComponentProps} from "react-router-dom";
import {appRoute} from "../../const";
import MainScreen from "../main-screen/main-screen";
import SingleplayerScreen from "../singleplayer-screen/singleplayer-screen";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={appRoute.MAIN} render={(props: RouteComponentProps) => <MainScreen history={props.history} />} />
        <Route exact path={appRoute.SINGLE} render={(props: RouteComponentProps) => <SingleplayerScreen history={props.history} />} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
