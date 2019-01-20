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
