export const METHOD = {
  get: 'GET',
  post: 'POST',
  delete: 'DELETE',
  put: 'PUT',
  options: 'OPTIONS',
};

export const HEADER = {
  contentType: 'Content-Type',
  accept: 'Accept',
  authorization: 'Authorization',
  userAgent: 'User-Agent',
  cacheControl: 'Cache-Control',
  acceptEncoding: 'Accept-Encoding',
  acceptLanguage: 'Accept-Language',
  host: 'Host',
  connection: 'Connection',
  contentLength: 'Content-Length',
  cookie: 'Cookie',
  origin: 'Origin',
  referer: 'Referer',
  transferEncoding: 'Transfer-Encoding',
  accessControlAllowOrigin: 'Access-Control-Allow-Origin',
  accessControlAllowMethods: 'Access-Control-Allow-Methods',
  accessControlAllowHeaders: 'Access-Control-Allow-Headers',
};

export const MIME_TYPE = {
  textPlain: 'text/plain',
  textHTML: 'text/html',
  applicationJSON: 'application/json',
  applicationXML: 'application/xml',
  applicationFormUrlEncoded: 'application/x-www-form-urlencoded',
  multipartFormData: 'multipart/form-data',
  imageJPEG: 'image/jpeg',
  imagePNG: 'image/png',
  imageGIF: 'image/gif',
  audioMPEG: 'audio/mpeg',
  audioWAV: 'audio/wav',
  videoMP4: 'video/mp4',
  videoAVI: 'video/x-msvideo',
  applicationOctetStream: 'application/octet-stream',
  applicationPDF: 'application/pdf',
  applicationZip: 'application/zip',
  textMarkdown: 'text/markdown',
};

export const STATUS = {
  continue: 100,
  switchingProtocols: 101,
  ok: 200,
  created: 201,
  accepted: 202,
  nonAuthoritativeInformation: 203,
  noContent: 204,
  resetContent: 205,
  partialContent: 206,
  multipleChoices: 300,
  movedPermanently: 301,
  found: 302,
  seeOther: 303,
  notModified: 304,
  useProxy: 305,
  temporaryRedirect: 307,
  permanentRedirect: 308,
  badRequest: 400,
  unauthorized: 401,
  paymentRequired: 402,
  forbidden: 403,
  notFound: 404,
  methodNotAllowed: 405,
  notAcceptable: 406,
  proxyAuthenticationRequired: 407,
  requestTimeout: 408,
  conflict: 409,
  gone: 410,
  lengthRequired: 411,
  preconditionFailed: 412,
  payloadTooLarge: 413,
  uriTooLong: 414,
  unsupportedMediaType: 415,
  rangeNotSatisfiable: 416,
  expectationFailed: 417,
  imATeapot: 418,
  misdirectedRequest: 421,
  unprocessableEntity: 422,
  locked: 423,
  failedDependency: 424,
  upgradeRequired: 426,
  preconditionRequired: 428,
  tooManyRequests: 429,
  requestHeaderFieldsTooLarge: 431,
  unavailableForLegalReasons: 451,
  internalServerError: 500,
  notImplemented: 501,
  badGateway: 502,
  serviceUnavailable: 503,
  gatewayTimeout: 504,
  httpVersionNotSupported: 505,
  variantAlsoNegotiates: 506,
  insufficientStorage: 507,
  loopDetected: 508,
  notExtended: 510,
  networkAuthenticationRequired: 511,
};

export const URL_DEFAULT = '/';
