import React from 'react';
import ReactDOM from 'react-dom/client';
import {HashRouter} from 'react-router-dom'
import App from './App';
import './index.css';
import {Provider} from "react-redux";
import store from "./Redux/reduxStore";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(

    <HashRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </HashRouter>
);
