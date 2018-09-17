import React from 'react';
import { connect } from 'some-other-module';

export const BaseComponent = () => <div />;

export const ConnectedComponent = connect(state => ({
  users: state.users,
}))(BaseComponent);
