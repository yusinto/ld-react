const EventSource = require('eventsource');
const eventSourceInitDict = {
  headers: {
    'Authorization': 'sdk',
    'Accept': 'text/event-stream',
  },
};
const es = new EventSource('https://firehose.launchdarkly.com', eventSourceInitDict);

es.addEventListener('server-time', (e) => {
  console.log(e.data);
});

es.onerror = function (err) {
  if (err) {
    if (err.status === 401 || err.status === 403) {
      console.log(`not authorized: ${JSON.stringify(err)}`);
    }
  }
};