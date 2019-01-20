// @flow
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; //eslint-disable-line

export const configureStore = (reducers = {}, middlewares = []) => {
  const rootReducer = combineReducers(reducers);
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(...middlewares))
  );
  return {
    store,
  };
};
