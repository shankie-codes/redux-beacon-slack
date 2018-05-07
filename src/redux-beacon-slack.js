import request from 'superagent';

const reduxBeaconSlack = options => (events) => {
  events.forEach(({ slackPayload }) => {
    if (options.webhookURL && slackPayload && slackPayload.text) {
      request
        .post(options.webhookURL)
        .send(slackPayload)
        .set('accept', 'json')
        .set(options.headers)
        // eslint-disable-next-line
        .end((err, response) => {
          // Calling the end function will send the request
          if (err) {
            return new Error('Posting to Slack failed');
          }
        });
    }
  });
};

export default reduxBeaconSlack;
