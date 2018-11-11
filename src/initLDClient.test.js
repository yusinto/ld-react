jest.mock('ldclient-js', () => ({
  initialize: jest.fn(),
}));
jest.mock('./initUser', () => jest.fn());

import {initialize as ldClientInitialize} from 'ldclient-js';
import initUser from './initUser';
import initLDClient from './initLDClient';

const clientSideId = 'deadbeef';
const defaulUser = {key: 'abcdef'};
const options = {bootstrap: 'localStorage'};
const flags = {'test-flag': false, 'another-test-flag': true};

describe('initLDClient', () => {
  beforeEach(() => {
    ldClientInitialize.mockImplementation(() => ({
      on: (e, cb) => cb(),
      allFlags: () => flags,
    }));
    initUser.mockImplementation(() => defaulUser);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('initialise with clientSideId only', async () => {
    await initLDClient(clientSideId);

    expect(ldClientInitialize.mock.calls[0][0]).toBe(clientSideId);
    expect(ldClientInitialize.mock.calls[0][1]).toBe(defaulUser);
    expect(ldClientInitialize.mock.calls[0][2]).toBeUndefined();
  });

  test('initialise with custom user and options', async () => {
    const customUser = {key: 'yus@reactjunkie.com'};
    await initLDClient(clientSideId, customUser, options);

    expect(ldClientInitialize.mock.calls[0][0]).toBe(clientSideId);
    expect(ldClientInitialize.mock.calls[0][1]).toBe(customUser);
    expect(ldClientInitialize.mock.calls[0][2]).toBe(options);
  });

  test('initialise should return camelCased flags', async () => {
    const remoteFlags = await initLDClient(clientSideId);

    expect(remoteFlags).toEqual({"anotherTestFlag": true, "testFlag": false});
  });
});