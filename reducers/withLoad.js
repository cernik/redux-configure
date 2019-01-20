// @flow
export const withLoad = types => (state, action) => {
  {
    console.log('withLoad');
    let nextState = state;
    switch (action.type) {
      case types.LOAD: {
        nextState = {
          ...state,
          isFetching: true,
        };
        break;
      }
      case types.LOAD_SUCCESS: {
        if (action.payload.data) {
          let nextData;
          if (Array.isArray(action.payload.data)) {
            nextData = action.payload.data;
          } else {
            nextData = [action.payload.data];
          }
          nextState = {
            ...state,
            data: nextData,
            isFetching: false,
          };
        }
        break;
      }
      case types.LOAD_FAIL: {
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
