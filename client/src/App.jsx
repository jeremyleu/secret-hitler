import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import Typekit from 'react-typekit';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';

import './App.scss';
import Container from './components/Container';

const reducer = combineReducers(Object.assign({}, require('./reducers')));

let middlewares = [thunk];
if (process.env.NODE_ENV !== 'production') {
  const logger = require('redux-logger'); // eslint-disable-line global-require
  middlewares = [...middlewares, logger.createLogger()];
}
const store = compose(applyMiddleware(...middlewares))(createStore)(reducer);

const App = () => (
  <div className="App">
    <Provider store={store}>
      <Container />
    </Provider>
    <Typekit kitId="yfs1mos" />
  </div>
);

export default App;
