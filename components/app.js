import React from 'react';
import Component from 'react';
import * as quotes from '../actions/quotes';
import { connect } from "react-redux"
import '../styles/style.css';

class App extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            quote: null,
        };
    }

    componentDidMount() {
        this.props.dispatch(quotes.getQuoteOfTheDay());
        this.props.dispatch(quotes.getLanguages());
    }

    onLanguageChange(value) {
        console.log('value from event', value);
        this.translate(value);
    }

    translate(language) {
        this.props.dispatch(quotes.translate(this.state.quote, language, this.props.currentLanguage));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.quote != null || (this.props.quote.quote != nextProps.quote.quote)) {
            this.setState({
                quote: nextProps.quote,
            });
        }
    }

    render() {
        return (
            <div className='container'>
                <div className='tiny'> Dailyquote </div>
                { this.state.quote ? 
                    <div className='typewriter'>
                        <h1> {this.state.quote && this.state.quote.quote} </h1>
                    </div>
                : <div className='typewriter'> Loading </div>
                } 
                <div>
                    <h2 className='author'> {this.state.quote && this.state.quote.author} </h2>
                </div>
                <button className='translate' onClick={this.translate.bind(this)}> 
                    Read in other language 
                    <select id="select-language" onChange={this.onLanguageChange.bind(this)}>
                        {
                            this.languages && this.languages.map((language) => {
                                <option value={language}> {language} </option>
                            })
                        }
                    </select>
                </button>
                <div className='tiny'> Translations are courtesy of Yandex™ </div>
            </div>
    )}
}

export default connect(store => {
    return {
        quote: store.quotes.quote,
        currentLanguage: store.quotes.currentLanguage,
        languages: store.quotes.languages,
    }
})(App);
