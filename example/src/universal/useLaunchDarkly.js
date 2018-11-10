import React, {useState, useEffect} from 'react';
import camelCase from 'lodash.camelcase';
import {initLDClient, ldClient} from './initLDClient';
import Context from './context';

const useLaunchDarkly = (WrappedComponent, {clientSideId, user, options}) => {
  const [flags, setFlags] = useState({});

  const subscribeToChanges = () => {
    ldClient.on('change', changes => { // changes look like: {'dev-test-flag': {current: true, previous: false}, ...}
      const flattened = {};
      for (const key in changes) {
        flattened[camelCase(key)] = changes[key].current;
      }
      setFlags({...flags, ...flattened});
    });
  };

  useEffect(async () => {
    const fetchedFlags = await initLDClient(clientSideId, user, options);
    setFlags({...fetchedFlags});
    subscribeToChanges();
  }, []); // [] means run this effect only once on mount

  return (
    <Context.Provider value={flags}>
      <WrappedComponent/>
    </Context.Provider>
  );
};

export default useLaunchDarkly;