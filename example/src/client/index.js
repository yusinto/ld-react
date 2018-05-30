import React from 'react';
import {hydrate} from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import App from '../universal/app';
import {Provider} from '../universal/ldContext';
import ldClientPackage from 'ldclient-js';
import uuid from 'uuid';

const clientSideId = 'your-client-side-id';
const user = {key: uuid.v4()};

const ldClient = ldClientPackage.initialize(clientSideId, user);
ldClient.on('ready', () => {
  // setFlags(flags, store);
  // subscribeToChanges(flags, store);
  console.log('ldClient is ready');
});

hydrate(
  <Provider value={ldClient}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>,
  document.getElementById('reactDiv'),
);
