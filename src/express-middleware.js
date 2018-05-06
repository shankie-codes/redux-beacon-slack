import request from 'superagent';

export const slackExpressMiddleware = (slackEndpoint) => {
  return (req, res, next) => {
    if (req.method === 'POST' && req.body.text) {
      request
        .post(slackEndpoint)
        .send(req.body)
        .set('accept', 'json')
        .end((err, response) => {
          // Calling the end function will send the request
          if (err) {
            console.log(err);
            return res.json('error');
          }
          return res.json(response);
        });
    } else {
      next('redux-beacon-slack: Accepts POST with req.query.text');
    }
  };
};

export default slackExpressMiddleware;
