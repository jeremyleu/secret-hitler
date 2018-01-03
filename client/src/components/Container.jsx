import React, { Component } from 'react';
import { connect } from 'react-redux';

import Landing from './Landing';
import CreateGame from './CreateGame';
import './Container.scss';
import JoinGame from './JoinGame';
class Container extends Component {
  chooseView = (view) => {
    switch(view) {
      case 'landing':
        return <Landing />;
      case 'create':
        return <CreateGame />;
       case 'join':
         return <JoinGame />;
      default:
        return null;
    }
  }
  render() {
    return (
      <div className="container">
        {this.chooseView(this.props.view)}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {...state};
}

export default connect(mapStateToProps)(Container);
