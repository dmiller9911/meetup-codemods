import React from 'react';
import { connect } from 'react-redux';

export const BaseComponent = () => <div />;

export const ConnectedComponent = connect(state => ({
  users: state.users,
}))(BaseComponent);
