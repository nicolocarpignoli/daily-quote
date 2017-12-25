import fetch from 'isomorphic-fetch';

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