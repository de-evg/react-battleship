import React from "react";
import {render} from "react-dom";
import {applyMiddleware, createStore} from "redux";
import root from "./store/reducers/root";
import App from "./components/app/app";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {Provider} from "react-redux";

const store = createStore(
    root,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument()))
);

render(
    <Provider store={store}>
        <App />
    </Provider>
    ,
    document.getElementById(`root`)
);
