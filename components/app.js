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
    }

    translate() {
        this.props.dispatch(quotes.translate(this.state.quote, this.props.currentLanguage));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.quote != null) {
            this.setState({
                quote: nextProps.quote,
            });
        }
    }

    render() {
        return (
            <div className='container'>
                <div className='appname'> Dailyquote </div>
                <div className='typewriter'>
                    <h1> {this.state.quote && this.state.quote.quote} </h1>
                </div>
                <div>
                    <h2 className='author'> {this.state.quote && this.state.quote.author} </h2>
                </div>
                <button className='translate author' onClick={this.translate.bind(this)}> Translate </button>
            </div>
    )}
}

export default connect(store => {
    return {
        quote: store.quotes.quote,
        currentLanguage: store.quotes.currentLanguage,
    }
})(App);
