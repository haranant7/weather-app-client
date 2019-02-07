/*

App client to render files

*/

import React from 'react';
import ReactDOM from 'react-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Search from './components/Search';
import Weather from './components/Weather';
import { PrivateRoute } from './components/PrivateRoute';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';

const store = createStore(rootReducer,applyMiddleware(thunk));
store.subscribe(() => console.log('store', store.getState()));

ReactDOM.render(
    <Provider store = {store}>
        <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={Login}/>
                    <Route path='/register' component={Register} />
                    <PrivateRoute path='/home' component={Home} />
                    <PrivateRoute path='/search' component={Search} />
                    <PrivateRoute path='/weather' component={Weather} />
                </Switch>
        </BrowserRouter>
    </Provider>
    ,document.getElementById('root')
);