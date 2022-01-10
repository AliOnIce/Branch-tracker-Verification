import {applyMiddleware, createStore} from "redux";
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

import rootReducer from './reducers/rootReducer';
import {loadState} from "../helpers/localStorage";
import throttle from "lodash/throttle";
import jwtDecode from "jwt-decode";
import {setAuthorizationToken} from "../helpers/setAuthorizationToken";

import {createLogger} from "redux-logger";
const loggerMiddleware = createLogger();

const persistedState = loadState();
if (persistedState && persistedState.token) {
    setAuthorizationToken(persistedState.token);
    persistedState.auth = {
        user: jwtDecode(persistedState.token),
        token: persistedState.token,
        error: false,
        errorMessage: ''
    }
    delete persistedState.token;
}
const store = createStore(rootReducer, persistedState, composeWithDevTools(applyMiddleware(thunkMiddleware, loggerMiddleware)));

export default store;