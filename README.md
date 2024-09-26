# @kolserdav/http-stream

Simple, convenient, powerful low-level server with streaming support

## Simple

Minimal interference with the standard NodeJS `http` server

## Convenient

- The routing system is organized as in popular frameworks
- Frequently used properties are added to the request object
- Constants are imported for convenient and safe use of `HTTP` protocol entities, more details [src/constants.js](./src/constants.js)

## Powerful

Request and response objects are not cloned, so they retain all the dynamic properties of native instances, which allows you to easily handle `Transfer-Encoding: chunked` without additional libraries.

## Low-level

You need to handle the response yourself and monitor the response headers. For example, if we finish the request without using `Transfer-Encoding: chunked`, we must not forget to set the `Content-Length` header:

```javascript
const result = JSON.stringify({ data: 'Hello World!' });
res.writeHead(STATUS.ok, {
  [HEADER.contentType]: MIME_TYPE.applicationJSON,
  [HEADER.contentLength]: result.length,
});
res.end(result);
```

_More details [examples/server.js](./examples/server.js)_
