import React, {Component} from 'react';
import {FlagProvider} from './ldContext';
import ldClientPackage from 'ldclient-js';
import uuid from 'uuid';
import camelCase from 'lodash/camelCase';

export let ldClient;

const initLdClient = async () => {
  const clientSideId = 'your-client-side-id';
  const user = {key: uuid.v4()};
  ldClient = ldClientPackage.initialize(clientSideId, user);

  let flags = {};
  await new Promise(resolve => ldClient.on('ready', () => {
    const rawFlags = ldClient.allFlags();
    for (const rawFlag in rawFlags) {
      const camelCasedKey = camelCase(rawFlag);
      flags[camelCasedKey] = rawFlags[rawFlag];
    }
    resolve();
  }));

  return flags;
};

export default (WrappedComponent) => {
  return class extends Component {
    state = {flags: {}};

    subscribeToChanges = () => {
      ldClient.on('change', changes => { // changes look like: {'dev-test-flag': {current: true, previous: false}, ...}
        const flattened = {};
        for (const key in changes) {
          flattened[camelCase(key)] = changes[key].current;
        }
        const flags = {...this.state.flags, ...flattened};
        this.setState({flags});
      });
    };

    async componentDidMount() {
      const flags = await initLdClient();
      this.setState({flags});
      this.subscribeToChanges();
    }

    render() {
      return (
        <FlagProvider value={this.state.flags}>
          <WrappedComponent {...this.props} />
        </FlagProvider>
      );
    }
  }
};
