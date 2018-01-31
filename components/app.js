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
        if (nextProps.quote != null || (this.props.quote && nextProps.quote && this.props.quote.quote != nextProps.quote.quote)) {
            this.setState({
                quote: nextProps.quote,
            });
        }
    }

    onShare() {
        navigator.screenshot.URI((error,res) => {
            if (error) {
                console.error(error);
            } else {
                if (res && res.URI) {
                    const options = {
                        files: [res.URI],
                        chooserTitle: 'Choose an app',
                    };
                    window.plugins.socialsharing.shareWithOptions(options, () => { console.log('Share success')},  (err) => {console.log('Share error ' + err)});
                }
        
            }
          }, 100);

        
    }

    render() {
        return (
            <div className='container'>
                    <div className='header'> 
                        <div className='header-tiny'> Dailyquote </div>
                        <img className='header-share' onClick={this.onShare.bind(this)} src='http://nicolocarpignoli.com/downloads/share-button.png'/>
                    </div>
                
                { this.state.quote ? 
                    <div className='typewriter'>
                        {this.state.quote && this.state.quote.quote}
                    </div>
                : <div className='typewriter'> Loading </div>
                } 
                <div>
                    <div className='author'> {this.state.quote && this.state.quote.author} </div>
                </div>
                    <div className='translate'>
                        Read in other language 
                    </div>
                    <div className='translate'>
                        <select className='translate-select' id="select-language" 
                            onChange={(event) => this.props.dispatch(quotes.translate(this.state.quote, event.target && event.target.value, this.props.currentLanguage))}>
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
