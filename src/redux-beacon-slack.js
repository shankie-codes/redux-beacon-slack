import request from 'superagent';

const reduxBeaconSlack = (events) => {
  // console.log(events);

  // request
  //   .post('api/v1/slack-webhook-proxy')
  //   .send({ text: 'bumthis' })
  //   .set('accept', 'json')
  //   // eslint-disable-next-line
  //   .end((err, response) => {
  //     // Calling the end function will send the request
  //     if (err) {
  //       return new Error('Posting to Slack failed');
  //     }
  //   });
  // events.map(({ slackWebhookURL, slackPayload }) => {
  //   if (slackWebhookURL && slackPayload && slackPayload.text) {
  //     request
  //       .post(slackWebhookURL)
  //       .send(slackPayload)
  //       .set('accept', 'json')
  //       // eslint-disable-next-line
  //       .end((err, response) => {
  //         // Calling the end function will send the request
  //         if (err) {
  //           return new Error('Posting to Slack failed');
  //         }
  //       });
  //     return true;
  //   }
  //   return false;
  // });
  events.forEach(({ slackWebhookURL, slackPayload }) => {
    // events.forEach((event) => {
    // console.log(event);
    if (slackWebhookURL && slackPayload && slackPayload.text) {
      request
        .post(slackWebhookURL)
        .send(slackPayload)
        .set('accept', 'json')
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
