/**
 * TODO: Add persistor and autoRehydrate
 */
import { createStore, applyMiddleware, compose } from "redux";
import promiseMiddleware from "redux-promise-middleware";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { autoRehydrate } from "redux-persist";

import rootReducer from "./rootReducer";

const middlewares = [thunk];

if (__DEV__) {
  middlewares.push(logger);
}

export default function configureStore() {
  return createStore(
    rootReducer,
    {}, // default state of the application
    compose(applyMiddleware(...middlewares))
  );
}
