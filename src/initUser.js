import uuid from 'uuid';
import ip from 'ip';
import UAParser from 'ua-parser-js';

const userAgentParser = new UAParser();
const isMobileDevice = typeof window !== 'undefined' && userAgentParser.getDevice().type === 'mobile';
const isTabletDevice = typeof window !== 'undefined' && userAgentParser.getDevice().type === 'tablet';

export default () => {
  let device;

  if (isMobileDevice) {
    device = 'mobile';
  } else if (isTabletDevice) {
    device = 'tablet';
  } else {
    device = 'desktop';
  }

  return {
    key: uuid.v4(),
    ip: ip.address(),
    custom: {
      browser: userAgentParser.getResult().browser.name,
      device,
    },
  };
};