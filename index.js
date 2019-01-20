// @flow
import { extractServices, extractActions, extractReducers } from './extract';
import { context } from './context';
import {
  createActionTypes,
  configureActionTypes,
  initActions,
} from './actions';
import {
  configureReducer,
  withLoad,
  withCreate,
  withUpdate,
  withDelete,
  withAppend,
  pipeReducers,
} from './reducers';

export { connect } from 'redux';

export {
  configureMiddlewares,
  withAxios,
  withAxiosMultiClient,
  withLogger,
} from './middleware';
export { configureStore, configureStoreWithPersistStore } from './store';

export const reduxContext = context;

const configureModule = name => config => {
  const actionNames = Object.keys(config.actions());
  const actionTypes = createActionTypes(name)(actionNames);
  const actions = initActions(name)(actionNames, config.actions(actionTypes));

  const reducer = configureReducer(actionTypes)(...config.reducers)(
    config.initialState
  );

  return { actions, reducer, types: actionTypes };
};

const createModules = reducers =>
  Object.keys(reducers).reduce((acc, reducerName) => {
    const module = configureModule(reducerName)(reducers[reducerName]);
    return { ...acc, [reducerName]: module };
  }, {});

export const configureModules = (config = {}) => {
  const modules = createModules(config);

  const actions = extractActions(modules);

  context.registerActions(actions);

  return {
    // services,
    actions,
    reducers: extractReducers(modules),
  };
};

export {
  createActionTypes,
  configureActionTypes,
  configureReducer,
  withLoad,
  withCreate,
  withUpdate,
  withDelete,
  withAppend,
  pipeReducers,
};
