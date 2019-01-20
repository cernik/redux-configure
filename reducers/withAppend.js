// @flow
export const withAppend = types => (state, action) => {
  {
    console.log('withAppend');
    let nextState = state;
    switch (action.type) {
      case types.APPEND: {
        nextState = {
          ...state,
          isFetching: true,
        };
        break;
      }
      case types.APPEND_SUCCESS: {
        if (action.payload.data) {
          let nextData;
          if (Array.isArray(action.payload.data)) {
            nextData = action.payload.data;
          } else {
            nextData = [action.payload.data];
          }
          nextState = {
            ...state,
            data: (state.data || []).concat(nextData),
            isFetching: false,
          };
        }
        break;
      }
      case types.APPEND_FAIL: {
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
