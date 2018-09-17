import React from 'react';
import { connect as connectRedux } from 'react-redux';
import { compose } from 'compose';
import { connect } from 'some-other-module';

export const BaseComponent = () => <div />;

export const ConnectedComponent = compose(
  connect(state => state.users), // does nothing
  connectRedux((rootState, { id }) => {
    const user = rootState.users[id];
    return {
      user,
    };
  })
)(BaseComponent);
