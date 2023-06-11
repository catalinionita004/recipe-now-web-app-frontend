import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";

import reducers from "./store/reducers";
import Routes from "./router/routes";
import TranslateButton from "./components/buttons/translate-button";

import "./locales/i18n";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/styles.css";
import "../src/axios-interceptors/axios-interceptors";

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

ReactDOM.render(
     <Provider
          store={createStoreWithMiddleware(
               reducers,
               window.__REDUX_DEVTOOLS_EXTENSION__ &&
                    window.__REDUX_DEVTOOLS_EXTENSION__()
          )}
     >
          <BrowserRouter>
               <Routes />
          </BrowserRouter>
     </Provider>,
     document.getElementById("root")
);
