import camelCase from 'lodash.camelcase';
import {initialize as ldClientInitialize} from 'ldclient-js';
import initUser from './initUser';

export let ldClient;

export const initLDClient = async (clientSideId, user = initUser(), options) => {
  ldClient = ldClientInitialize(clientSideId, user, options);

  return await new Promise(resolve => ldClient.on('ready', () => {
    const rawFlags = ldClient.allFlags();
    const flags = {};
    for (const rawFlag in rawFlags) {
      const camelCasedKey = camelCase(rawFlag);
      flags[camelCasedKey] = rawFlags[rawFlag];
    }
    resolve(flags);
  }));
};

export default initLDClient;