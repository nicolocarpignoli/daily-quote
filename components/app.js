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

    componentWillReceiveProps(nextProps) {
        if (nextProps.quote != null) {
            this.setState({
                quote: nextProps.quote,
            });
        }
    }

    render() {
        return (
            <div>
                <div className='typewriter'>
                    <h1> {this.state.quote && this.state.quote.quote} </h1>
                </div>
                <div>
                    <h2 className='typewriter author'> {this.state.quote && this.state.quote.author} </h2>
                </div>
            </div>
    )}
}

export default connect(store => {
    return {
        quote: store.quotes.quote,
    }
})(App);
