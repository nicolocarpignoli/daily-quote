const defaultState = {
  quote: null,
  currentLanguage: 'en',
  originalQuote: null,
};

export default function reducer(state = defaultState, action) {
  var newState = Object.assign({}, state);
  newState.response = action.payload;
  newState.actionType = action.type;

  switch (action.type) {
      case "QUOTE_GET": {
        newState.quote = newState.response;
        newState.originalQuote = newState.response;
        newState.currentLanguage = 'en';
        return newState;
      }
      case "TRANSLATE": {
        if (state.currentLanguage == 'en') {
          newState.currentLanguage = 'it';
          newState.quote = newState.response;
        } else {
          newState.currentLanguage = 'en';
          newState.quote = state.originalQuote;
        }
      }
      default:
        return state;
  }
};
