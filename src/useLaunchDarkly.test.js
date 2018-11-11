jest.mock('react', () => {
  const original = jest.requireActual('react');
  return {
    ...original,
    useState: jest.fn(),
    useEffect: jest.fn(),
  }
});
jest.mock('./initLDClient', () => ({
  initLDClient: jest.fn(),
  ldClient: {
    on: jest.fn(),
  },
}));

import React, {useState, useEffect} from 'react';
import TestRenderer from 'react-test-renderer';

import {initLDClient, ldClient} from './initLDClient';
import useLaunchDarkly from './useLaunchDarkly';

const clientSideId = 'deadbeef';
const mockFlags = {'testFlag': true, 'anotherTestFlag': true};

describe('useLaunchDarkly hook', () => {
  let mockSetFlags = jest.fn();

  beforeEach(() => {
    initLDClient.mockImplementation(() => mockFlags);
    useState.mockImplementation(() => [{}, mockSetFlags]);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('render app', () => {
    const App = () => <div>My App</div>;
    const LaunchDarklyApp = () => useLaunchDarkly(App, ({clientSideId}));
    const component = TestRenderer.create(<LaunchDarklyApp />);

    expect(component).toMatchSnapshot();
  });

  test('setFlags is called in useEffect', async () => {
    const App = () => <div>My App</div>;
    const LaunchDarklyApp = () => useLaunchDarkly(App, ({clientSideId}));
    TestRenderer.create(<LaunchDarklyApp />);

    const asyncEffect = useEffect.mock.calls[0][0];
    const props = useEffect.mock.calls[0][1];
    await asyncEffect();

    expect(useEffect).toHaveBeenCalledTimes(1);
    expect(useEffect).toHaveBeenCalledWith(asyncEffect, props);
    expect(initLDClient).toHaveBeenCalledWith(clientSideId, undefined, undefined);
    expect(mockSetFlags).toHaveBeenCalledWith(mockFlags);
  });

  test('subscribe to changes', async () => {
    const mockSetFlags = jest.fn();
    useState.mockImplementation(() => [mockFlags, mockSetFlags]);
    ldClient.on.mockImplementation((e, cb) => cb({'test-flag': {current: false, previous: true}}));

    const App = () => <div>My App</div>;
    const LaunchDarklyApp = () => useLaunchDarkly(App, ({clientSideId}));
    TestRenderer.create(<LaunchDarklyApp />);

    const asyncEffect = useEffect.mock.calls[0][0];
    await asyncEffect();

    expect(mockSetFlags).toHaveBeenCalledTimes(2);
    expect(mockSetFlags).toHaveBeenCalledWith(mockFlags);
    expect(mockSetFlags).toHaveBeenLastCalledWith({'testFlag': false, 'anotherTestFlag': true});
  });
});