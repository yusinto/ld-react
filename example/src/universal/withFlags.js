import React from 'react';
import {Consumer} from './ldContext';

const withFlags = (Component) => props =>
  <Consumer>
    {
      ldClient => <Component ldClient={ldClient} {...props}/>
    }
  </Consumer>;

export default withFlags;