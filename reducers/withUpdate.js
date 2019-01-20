// @flow
export const withUpdate = types => (state, action) => {
  {
    let nextState = state;
    switch (types) {
      case types.UPDATE: {
        nextState = {
          ...state,
          isFetching: true,
        };
        break;
      }
      case types.UPDATE_SUCCESS: {
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
              const { id, ...rest } = item;
              if (id && rest.length) {
                return acc.map(x => {
                  if (x.id === id) {
                    return { ...x, ...rest };
                  }
                  return x;
                });
              }
              return acc;
            }, state.data || []),
            isFetching: false,
          };
        }
        break;
      }
      case types.UPDATE_FAIL: {
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
