import React from 'react';
import {hydrate} from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import App from '../universal/app';
// import {FlagProvider} from '../universal/ldContext';
// import ldClientPackage from 'ldclient-js';
// import uuid from 'uuid';
// import camelCase from 'lodash/camelCase';
//
// const initLdClient = async () => {
//   const clientSideId = 'your-client-side-id';
//   const user = {key: uuid.v4()};
//
//   const ldClient = ldClientPackage.initialize(clientSideId, user);
//   let flags = {};
//   await new Promise(resolve => ldClient.on('ready', () => {
//     const rawFlags = ldClient.allFlags();
//     for (const rawFlag in rawFlags) {
//       const camelCasedKey = camelCase(rawFlag);
//       flags[camelCasedKey] = rawFlags[rawFlag];
//     }
//     resolve();
//   }));
//
//   return flags;
// };
//
// (async () => {
//   const flags = await initLdClient();
//
//   hydrate(
//     <FlagProvider value={flags}>
//       <BrowserRouter>
//         <App/>
//       </BrowserRouter>
//     </FlagProvider>,
//     document.getElementById('reactDiv'),
//   );
// })();

hydrate(
  <BrowserRouter>
    <App/>
  </BrowserRouter>,
  document.getElementById('reactDiv'),
);