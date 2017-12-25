const defaultState = {
  quote: null,
};

export default function reducer(state = defaultState, action) {
  var newState = Object.assign({}, state);
  newState.response = action.payload;
  newState.actionType = action.type;

  switch (action.type) {
      case "QUOTE_GET": {
        newState.quote = newState.response;
        return newState;
      }
      default:
        return state;
  }
};
