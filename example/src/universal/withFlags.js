import React from 'react';
import {FlagConsumer} from './ldContext';

const withFlags = (Component) => props =>
  <FlagConsumer>
    {
      flags => <Component flags={flags} {...props}/>
    }
  </FlagConsumer>;

export default withFlags;