// @flow
import { extractServices, extractActions, extractReducers } from './extract';
import { context } from './context';
import { createActionTypes, initActions } from './actions';
import {
  configureReducer,
  withLoad,
  withCreate,
  withUpdate,
  withDelete,
} from './reducers';

export { connect } from 'redux';
export { Provider } from 'react-redux';

export { configureMiddlewares, withAxios, withLogger } from './middleware';
export { configureStore } from './store';

export const reduxContext = context;

const configureModule = name => config => {
  const actionNames = Object.keys(config.actions());
  const actionTypes = createActionTypes(name)(actionNames);
  const actions = initActions(name)(actionNames, config.actions(actionTypes));

  const reducer = configureReducer(actionTypes)(
    config.initialReducer,
    ...config.reducers
  )(config.initialState);

  return { actions, reducer, types: actionTypes };
};

const createModules = reducers =>
  Object.keys(reducers).reduce((acc, reducerName) => {
    const module = configureModule(reducerName)(reducers[reducerName]);
    return { ...acc, [reducerName]: module };
  }, {});

export const configureModules = (config = {}) => {
  const modules = createModules(config);
  // const services = extractServices(modules);
  const actions = extractActions(modules);
  console.log('actions', actions);
  // context.registerServices(services);
  context.registerActions(actions);

  return {
    // services,
    actions,
    reducers: extractReducers(modules),
  };
};

export {
  createActionTypes,
  configureReducer,
  withLoad,
  withCreate,
  withUpdate,
  withDelete,
};
