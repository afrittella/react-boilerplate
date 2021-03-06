import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import AppRouter, {history} from './routers/AppRouter';
import configureStore from './store/configureStore';
import 'normalize.css/normalize.css';
import './styles/style.scss';
import 'react-dates/lib/css/_datepicker.css';
import 'numeral/locales/it';
import numeral from 'numeral';
import {firebase} from './firebase/firebase';
import {login, logout} from "./actions/auth";
import LoadingPage from './components/LoadingPage';

numeral.locale('it');

const store = configureStore();

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);
const app = document.getElementById('app');

let hasRendered = false;

const renderApp = () => {
    if (!hasRendered) {
        ReactDOM.render(jsx, app);       
        hasRendered = true;
    }
};

ReactDOM.render(<LoadingPage />, app)

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        store.dispatch(login(user.uid));
        renderApp();
        if (history.location.pathname === '/') {
            history.push('/dashboard');
        }        
    } else {
        store.dispatch(logout());
        renderApp();
        history.push('/');
    }
});