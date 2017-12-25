import {applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk"
import promise from "redux-promise-middleware"
import reducer from "../reducers/index.js"

const middleware = applyMiddleware(promise(), thunk);

const store = handleStoreCreation();

function handleStoreCreation() {
    if(process.env.NODE_ENV === 'production')
        return createStore(reducer, applyMiddleware(promise(), thunk));
    return createStore(reducer, middleware);
}

export default store;