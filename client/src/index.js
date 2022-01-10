import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

//redux
import {Provider} from "react-redux";
import store from "./redux/store";


//css
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

//axios defauls
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:5000/api';
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8'



ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();