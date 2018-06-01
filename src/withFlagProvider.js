import '@babel/polyfill';
import React, {Component} from 'react';
import {Provider} from './context';
import camelCase from 'lodash/camelCase';
import {initLDClient, ldClient} from './initLDClient';

export default (WrappedComponent, {clientSideId, user, options}) => {
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
      const flags = await initLDClient(clientSideId, user, options);
      this.setState({flags}); //eslint-disable-line
      this.subscribeToChanges();
    }

    render() {
      return (
        <Provider value={this.state.flags}>
          <WrappedComponent {...this.props} />
        </Provider>
      );
    }
  }
};