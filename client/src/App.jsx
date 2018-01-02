import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Typekit from 'react-typekit';
import { createStore, combineReducers } from 'redux';

import './App.scss';
import Container from './components/Container';

const reducer = combineReducers(
  Object.assign({}, require('./reducers'))
);

const store = createStore(
  reducer
);

class App extends Component {
  state = {
    response: '',
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <Container />
        </Provider>
        <Typekit kitId="yfs1mos" />
      </div>
    );
  }
}

export default App;
