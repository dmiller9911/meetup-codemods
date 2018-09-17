import React from 'react';
import { connect } from 'react-redux';

export const BaseComponent = () => <div />;

export const ConnectedComponent = connect(state => ({
  posts: state.posts,
}))(BaseComponent);
