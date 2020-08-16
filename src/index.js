import * as serviceWorker from './serviceWorker';
import store from "./redux/redux-store";
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {KamasutraApiProvider} from "./components/context/kamasutra-api-context";
import KamasutraApiServices from "./services/kamasutra-api";

const kamasutraApiServices = new KamasutraApiServices();

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <KamasutraApiProvider  value={kamasutraApiServices}>
            <App/>
            </KamasutraApiProvider>

        </Provider>
    </BrowserRouter>, document.getElementById('root'));


// API
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
