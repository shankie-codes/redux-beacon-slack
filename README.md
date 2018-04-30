# redux-beacon-slack

Slack Incoming Webhook target for [Redux Beacon](https://github.com/rangle/redux-beacon).

This is an early-stage work in progress, built for one specific project, but with the hope that it will grow over time with PRs. There's a to-do list below.

##Motivation
Redux Beacon listens to Redux actions and dispatches events to analytics platforms. Slack isn't an analytics platform, but our client wanted the same events that were going to Google Tag Manager to appear in Slack so that they could choose to take action on them. For instance, they wanted to know if a new person signed up for the app so that they could get in touch to find out more about what they needed. This could be accomplished in other ways, such as the excellent [Redux Saga](https://github.com/redux-saga/redux-saga), but we decided that it's quite nice to attach them onto the same action middleware.

## Security/Spam
If you were to include your Slack webhook address in your client-side bundle, it would be possible for a bot to scrap your webhook address and spam your organisation. Though it's not a major risk (as an incoming webhook doesn't allow access to the wider Slack API), it would still be good to avoid publishing this.

To mitigate this risk, we've supplied a little Express middleware to proxy the request, allowing your client bundle to make a request to a server with the same origin. This also allows you to implement some security on your endpoint, e.g. a same-origin policy, JWT validation, etc.

## Usage - client



## Usage - server



##To-do

* Tests!
* Better documentation
* A way to expand the server middleware to offer other sercurity measures, e.g. rate limiting etc
* Middleware for other servers