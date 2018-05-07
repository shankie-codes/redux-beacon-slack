# redux-beacon-slack

Slack Incoming Webhook target for [Redux Beacon](https://github.com/rangle/redux-beacon).

This is an early-stage work in progress, built for one specific project, but with the hope that it will grow over time with PRs. There's a to-do list below.

##Motivation
Redux Beacon listens to Redux actions and dispatches events to analytics platforms. Slack isn't an analytics platform, but our client wanted the same events that were going to Google Tag Manager to appear in Slack so that they could choose to take action on them. For instance, they wanted to know if a new person signed up for the app so that they could get in touch to find out more about what they needed. This could be accomplished in other ways, such as the excellent [Redux Saga](https://github.com/redux-saga/redux-saga), but we decided that it's quite nice to attach them onto the same action middleware.

The current implmentation is quite naive and could do with improvement.

## Security/Spam
If you were to include your Slack webhook address in your client-side bundle, it would be possible for a bot to scrap your webhook address and spam your organisation. Though it's not a major risk (as an incoming webhook doesn't allow access to the wider Slack API), it would still be good to avoid publishing this.

To mitigate this risk, we've supplied a little Express middleware to proxy the request, allowing your client bundle to make a request to a server with the same origin. This also allows you to implement some security on your endpoint, e.g. a same-origin policy, JWT validation, etc.

## Usage - client

In `configureStore.js` or similar:

```js
import slack from "redux-beacon-slack";

// Define Beacon events to send to analytics platforms
const somethingImportant = action => ({
  slackPayload: { text: "Something important" }, // You can add any valid Slack webhook fields, as documented here: https://api.slack.com/custom-integrations/incoming-webhooks
});

// Map the events to Redux actions
export const eventsMap = {
  "AN_IMPORTANT_ACTION": somethingImportant,
};

const slackBeaconMiddleware = createMiddleware(
  eventsMap,
  slack({
    webhookURL: "/api/v1/slack-webhook-proxy", // Either your full hooks.slack.com URL, or the server-side proxy that you've set up
    headers: {
      Authorization: `Bearer ${idToken}`, // Not needed if you're posting directly to Slack
    },
  }),
);

```

## Usage - server

Although you _can_ set up the client to post directly to your Slack incoming webhook URL, it's not recommended as it'll expose you webhook address to the world in your client-side bundle. To get around this, we've included a simple Express middleware that proxies your Slack URL. Although it's beyond the scope of this package, this means that you can put your endpoint behind some sort of authentication, allowing only authorised users to post analytics events.

Setup is simple:

```js
import slackProxyMiddleware from "redux-beacon-slack/dist/server";

app.use(
  "/api/v1/slack-webhook-proxy",
  slackProxyMiddleware('https://hooks.slack.com/services/your/hook/path'),
);
```

Then, reconfigure your client to send analytics events to your new endpoint, e.g. https://myapp.com/api/v1/slack-webhook-proxy

The middleware is only for Express at the moment, though PRs for other servers (even if it's just docs) are most welcome.

##To-do

* Tests!
* Better documentation
* A way to expand the server middleware to offer other sercurity measures, e.g. rate limiting etc
* Middleware for other servers
* Integration with `redux-beacon` `logger`

## Thanks

* Initial work on this package supported by [Arts Active Trust](http://artsactive.org.uk/) as part of the [A2:Connect](https://a2connect.org) project.
* [Krasimir](http://krasimirtsonev.com/blog/article/javascript-library-starter-using-webpack-es6) for getting me started with a nice Webpack config for developing this project