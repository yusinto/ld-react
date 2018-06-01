import React from 'react';
import {Consumer} from './context';

const withFlags = (Component) => props => (
  <Consumer>
    {
      flags => <Component flags={flags} {...props} />
    }
  </Consumer>
);

export default withFlags;