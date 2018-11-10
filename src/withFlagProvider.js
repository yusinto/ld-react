import React, {Component} from 'react';
import camelCase from 'lodash.camelcase';
import Context from './context';
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
        this.setState((prevState) => ({flags: {...prevState, ...flattened}}));
      });
    };

    async componentDidMount() {
      const flags = await initLDClient(clientSideId, user, options);
      this.setState({flags}); //eslint-disable-line
      this.subscribeToChanges();
    }

    render() {
      return (
        <Context.Provider value={this.state.flags}>
          <WrappedComponent {...this.props} />
        </Context.Provider>
      );
    }
  }
};