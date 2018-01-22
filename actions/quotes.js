import fetch from 'isomorphic-fetch';
import * as api from '../apikey.js';

export function getLanguages() {
  const endpoint = `https://translate.yandex.net/api/v1.5/tr.json/getLangs?key=${api.apiKey}`;
  return function(dispatch) {
      fetch(endpoint)
        .then(res => res.json())
        .then(res => {
          const languages = res;
          dispatch({ type: "LANGUAGES_GET", payload: languages});
        });
  }
}

export function getQuoteOfTheDay() {
  const endpoint = 'http://quotes.rest/qod.json';
  return function(dispatch) {
      fetch(endpoint)
        .then(res => res.json())
        .then(res => {
          let quote = {
              quote: 'Ops, this is embarassing.',
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

export function translate(quote, language, currentLanguage) {
  if (language != currentLanguage) {
    const request = `https://translate.yandex.net/api/v1.5/tr.json/translate?lang=${language}&key=${api.apiKey}&text=${quote.quote}`;
  return function(dispatch) {
      fetch(request)
          .then(res => res.json())
          .then(res => {
          if(res && res.text ) {
            let translatedQuote = {
              quote: res.text[0],
              author: quote.author,
            }
            dispatch({ type: "TRANSLATE", payload: {quote: translatedQuote, currentLanguage: language}});
          }
        });
    }
  }
}