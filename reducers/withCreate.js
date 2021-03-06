// @flow
export const withCreate = types => (state, action) => {
  {
    let nextState = state;
    switch (types) {
      case types.CREATE: {
        nextState = {
          ...state,
          isFetching: true,
        };
        break;
      }
      case types.CREATE_SUCCESS: {
        if (action.payload.data) {
          let nextData;
          if (Array.isArray(action.payload.data)) {
            nextData = action.payload.data;
          } else {
            nextData = [action.payload.data];
          }
          nextState = {
            ...state,
            data: state.data.concat(nextData),
            isFetching: false,
          };
        }
        break;
      }
      case types.CREATE_FAIL: {
        nextState = {
          ...state,
          isFetching: false,
        };

        break;
      }
      default: {
        nextState = state;
        break;
      }
    }
    return nextState;
  }
};
