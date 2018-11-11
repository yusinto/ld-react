jest.mock('uuid', () => ({
  v4: () => 'some-unique-guid',
}));

jest.mock('ip', () => ({
  address: () => '111.222.333.456',
}));


describe('initUser', () => {
  beforeEach(() => {

  });

  afterEach(() => {
    jest.resetModules();
    jest.resetAllMocks();
  });

  test('desktop user', () => {
    jest.doMock('ua-parser-js', () => () => ({
      getResult: () => ({browser: {name: 'waterfox'}}),
      getDevice: () => ({type: 'desktop'}),
    }));

    const initUser = require('./initUser').default;
    const result = initUser();
    expect(result).toEqual({
      "custom": {"browser": "waterfox", "device": "desktop"},
      "ip": "111.222.333.456",
      "key": "some-unique-guid"
    });
  });

  test('mobile user', () => {
    jest.doMock('ua-parser-js', () => () => ({
      getResult: () => ({browser: {name: 'chrome ios'}}),
      getDevice: () => ({type: 'mobile'}),
    }));
    const initUser = require('./initUser').default;
    const result = initUser();
    expect(result).toEqual({
      "custom": {"browser": "chrome ios", "device": "mobile"},
      "ip": "111.222.333.456",
      "key": "some-unique-guid"
    });
  });

  test('tablet user', () => {
    jest.doMock('ua-parser-js', () => () => ({
      getResult: () => ({browser: {name: 'safari ios'}}),
      getDevice: () => ({type: 'tablet'}),
    }));
    const initUser = require('./initUser').default;
    const result = initUser();
    expect(result).toEqual({
      "custom": {"browser": "safari ios", "device": "tablet"},
      "ip": "111.222.333.456",
      "key": "some-unique-guid"
    });
  });
});