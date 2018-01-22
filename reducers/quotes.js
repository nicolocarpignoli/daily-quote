const defaultState = {
  quote: null,
  currentLanguage: 'en',
  originalQuote: null,
  languages: [],
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
      case "LANGUAGES_GET": {
        newState.languages = newState.response;
        return newState;
      }
      case "TRANSLATE": {
        newState.currentLanguage = newState.response.currentLanguage;
        newState.quote = newState.response.quote;
        return newState;
      }
      default:
        return state;
  }
};
