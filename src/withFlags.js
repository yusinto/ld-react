import React from 'react';
import Context from './context';

const withFlags = (Component) => props => (
  <Context.Consumer>
    {
      flags => <Component flags={flags} {...props} />
    }
  </Context.Consumer>
);

export default withFlags;