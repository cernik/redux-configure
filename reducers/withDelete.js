// @flow
export const withDelete = types => (state, action) => {
  {
    let nextState = state;
    switch (types) {
      case types.DELETE: {
        nextState = {
          ...state,
          isFetching: true,
        };
        break;
      }
      case types.DELETE_SUCCESS: {
        if (action.payload.data) {
          let nextData;
          if (Array.isArray(action.payload.data)) {
            nextData = action.payload.data;
          } else {
            nextData = [action.payload.data];
          }

          nextState = {
            ...state,
            data: nextData.reduce((acc = [], item = {}) => {
              const { id } = item;
              if (id) {
                return acc.filter(x => x.id !== id);
              }
              return acc;
            }, state.data || []),
            isFetching: false,
          };
        }
        break;
      }
      case types.DELETE_FAIL: {
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
