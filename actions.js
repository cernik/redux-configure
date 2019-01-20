// @flow
export const createActionNames = (namespace, action) => {
  const TYPE = action.toUpperCase();
  return {
    [TYPE]: `${namespace}/${TYPE}`,
    [`${TYPE}_SUCCESS`]: `${namespace}/${TYPE}_SUCCESS`,
    [`${TYPE}_FAIL`]: `${namespace}/${TYPE}_FAIL`,
  };
};

export const createActionTypes = (namespace = 'root') => (actions = ['load']) =>
  actions.reduce(
    (acc, action) => ({ ...acc, ...createActionNames(namespace, action) }),
    {}
  );

export const initActions = name => (actionNames = [], extraActions = {}) =>
  actionNames.reduce(
    (acc, action) => ({
      [action]: payload => ({
        type: `${name}/${action.toUpperCase()}`,
        payload,
      }),
      ...acc,
    }),
    extraActions
  );

export const configureActionTypes = actions =>
  Object.keys(actions).reduce(
    (acc, reducerName) => ({
      ...acc,
      [reducerName]: createActionTypes(reducerName)(
        Object.keys(actions[reducerName])
      ),
    }),
    {}
  );
/*
configureActionTypes = ({})=>({})
get
{
  repos: {
    load: ()=>{}
  }
}

returns
{
  repos: {
    LOAD: 'repos/LOAD',
    LOAD_SUCCESS: 'repos/LOAD_SUCCESS',
    LOAD_FAIL: 'repos/LOAD_FAIL',
  }
}
*/
