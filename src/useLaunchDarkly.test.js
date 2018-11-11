jest.mock('react', () => {
  const original = jest.requireActual('react');
  return {
    ...original,
    useState: jest.fn(),
  }
});
jest.mock('./initLDClient', () => ({
  initLDClient: jest.fn(),
  ldClient: {
    on: jest.fn(),
  },
}));

import React, {useState} from 'react';
import TestRenderer from 'react-test-renderer';

import {initLDClient, ldClient} from './initLDClient';
import useLaunchDarkly from './useLaunchDarkly';

const clientSideId = 'deadbeef';
const flags = {'testFlag': true, 'anotherTestFlag': true};

describe('useLaunchDarkly hook', () => {
  const mockSetFlags = jest.fn();

  beforeEach(() => {
    initLDClient.mockImplementation(() => flags);
    useState.mockImplementation(() => [flags, mockSetFlags]);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('initialise ld client and subscribe on mount', () => {
    const App = () => <div>My App</div>;
    const LaunchDarklyApp = () => useLaunchDarkly(App, ({clientSideId}));
    const component = TestRenderer.create(<LaunchDarklyApp />);

    // GOTCHA: we need to re-render a second time to trigger useEffect hooks
    // https://github.com/kentcdodds/react-testing-library/issues/215
    component.update(<LaunchDarklyApp />);

    expect(initLDClient.mock.calls[0][0]).toBe(clientSideId);
    ldClient.on.mockImplementation((e, cb) => {
      expect(e).toEqual('change');
      cb();
    });
    expect(component).toMatchSnapshot();
  });

  test('setFlags is called in both useEffect and subscribe', () => {
    const App = () => <div>My App</div>;
    const LaunchDarklyApp = () => useLaunchDarkly(App, ({clientSideId}));
    const component = TestRenderer.create(<LaunchDarklyApp />);
    component.update(<LaunchDarklyApp />);

    // first useEffect, then in subscribe
    mockSetFlags
      .mockImplementationOnce(remoteFlags => {
        expect(remoteFlags).toEqual(flags);
      })
      .mockImplementationOnce(remoteFlags => {
        expect(remoteFlags).toEqual({"anotherTestFlag": true, "testFlag": false});
      });

    ldClient.on.mockImplementation((e, cb) => {
      expect(e).toEqual('change');
      cb({'test-flag': {current: false, previous: true}});
      expect(mockSetFlags.mock.calls.length).toBe(2);
    });
  });
});