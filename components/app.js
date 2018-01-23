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
                    <div className='translate'>
                        Read in other language 
                    </div>
                    <div className='translate'>
                        <select className='translate-select' id="select-language" 
                            onChange={(event) => this.props.dispatch(quotes.translate(this.state.quote, event.target.value, this.props.currentLanguage))}>
                            <option value={null} selected> Select a language </option>
                            {                            
                                this.props.languages && this.props.languages.map((obj) => {
                                    return <option value={obj.key}> {obj.language} </option>
                                })
                            }
                        </select>
                    </div>
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
