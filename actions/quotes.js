import fetch from 'isomorphic-fetch';
import * as api from '../apikey.js';

export function getQuoteOfTheDay() {
  const endpoint = 'http://quotes.rest/qod.json';
  return function(dispatch) {
      fetch(endpoint)
        .then(res => res.json())
        .then(res => {
          let quote = {
              quote: 'Ops, this is embarassing.',
              author: 'Me',
            };
          if(res && res.contents && res.contents.quotes && res.contents.quotes[0]) {
            quote = {
              quote: res.contents.quotes[0].quote,
              author: res.contents.quotes[0].author,
            }
          }
          dispatch({ type: "QUOTE_GET", payload: quote});
        });
  }
}

export function translate(quote, actualLanguage) {
  let lang = 'it';
  if (actualLanguage == 'it') {
    return function(dispatch) { 
      dispatch({ type: "TRANSLATE", payload: null});
    }
  }
  const request = `https://translate.yandex.net/api/v1.5/tr.json/translate?lang=${lang}&key=${api.apiKey}&text=${quote.quote}`;
  return function(dispatch) {
      fetch(request)
          .then(res => res.json())
          .then(res => {
          if(res && res.text ) {
            let translatedQuote = {
              quote: res.text[0],
              author: quote.author,
            }
            dispatch({ type: "TRANSLATE", payload: translatedQuote});
          }
        });
  }
}