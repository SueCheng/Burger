import React from "react";
import ReactDOM from "react-dom";
import "./styles/styles.scss";
import App from "./components/App";
import { unregister } from "./registerServiceWorker";

import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import { Provider } from "react-redux";
import reducers from "./reducers";

/*function updateWidth() {
  let viewport = document.querySelector("meta[name=viewport]");
  viewport.setAttribute(
    "content",
    "width=device-width,initial-scale=1,shrink-to-fit=yes"
  );
}

updateWidth();*/
const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);
ReactDOM.render(
  <Provider
    store={createStoreWithMiddleware(
      reducers,
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )}
  >
    <App />
  </Provider>,
  document.getElementById("root")
);

//registerServiceWorker();
unregister();
