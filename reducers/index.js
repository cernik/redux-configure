// @flow
export { withLoad } from './withLoad';
export { withCreate } from './withCreate';
export { withUpdate } from './withUpdate';
export { withDelete } from './withDelete';
export { withAppend } from './withAppend';

export const defaultInitialState = {
  data: [],
  isFetching: false,
  errorMessage: '',
};

export const pipeReducers = (...fns) => (state, action) =>
  fns.reduce((v, fn) => fn(v, action), state);

export const configureReducer = (types = {}) => (
  ...reducers
) => initialState => (
  state = {
    ...defaultInitialState,
    ...initialState,
  },
  action = { type: '', payload: {} }
) =>
  pipeReducers(
    ...reducers.map(fn => {
      // if (typeof fn() === 'object') {
      //   return fn;
      // }
      // console.log('fn',fn);
      // console.log('');
      return fn(types);
    })
  )(state, action);
