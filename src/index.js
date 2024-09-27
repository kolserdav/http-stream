import { createServer, ServerResponse, IncomingMessage } from 'http';
import { HEADER, METHOD, MIME_TYPE, STATUS, URL_DEFAULT } from './constants.js';

export { HEADER, METHOD, MIME_TYPE, STATUS };

/**
 * @typedef {IncomingMessage} Request
 * @typedef {Record<string, string>} Headers
 * @typedef {ServerResponse<IncomingMessage> & {
 *  req: IncomingMessage;
 * }} Response
 * @typedef {Record<string, string>} QueryString
 */

/**
 * @template Q
 * @typedef {Request & {
 *  query: Q;
 *  url: string;
 *  search: string;
 *  origin: string;
 * }} HttpRequest
 */

/**
 * @template Q
 * @typedef {(req: HttpRequest<Q>, res: Response) => Promise<void>} RouteHandler
 */

export default class HttpStream {
  /**
   * @private
   * @type {Record<string, {
   *  method: typeof METHOD[keyof typeof METHOD];
   *  cb: RouteHandler<any>
   * }>}
   */
  routes = {};

  /**
   * @public
   * @param {{
   *  port: number;
   *  cors?: {
   *    origin: string | string[]
   *    allowedHeaders?: string | string[]
   * }
   * }} options
   * @param {() => void} cb
   */
  listen({ port, cors }, cb = () => {}) {
    const { origin, allowedHeaders } = cors || {};
    const httpServer = createServer(async (req, res) => {
      const { method, url: _url, headers } = req;
      const url = this.cleanUrl(_url);
      console.log(1, req);
      if (method === METHOD.options) {
        console.log(11, Object.keys(headers).join(', '));
        const methods = Object.keys(METHOD)
          .map((item) => METHOD[/** @type {typeof this.as<keyof typeof METHOD>} */ (this.as)(item)])
          .join(', ');
        res.writeHead(STATUS.noContent, {
          Allow: methods,
          [HEADER.contentLength]: 0,
          [HEADER.accessControlAllowOrigin]: Array.isArray(origin)
            ? origin.join(', ')
            : origin || '',
          [HEADER.accessControlAllowMethods]: origin ? methods : '',
          [HEADER.accessControlAllowHeaders]: origin
            ? `Origin, X-Requested-With, Content-Type, Accept, Authorization, ${
                allowedHeaders
                  ? Array.isArray(allowedHeaders)
                    ? allowedHeaders.join(', ')
                    : allowedHeaders
                  : ''
              }`
            : '',
        });
        res.end();
        return;
      }

      // Checking if a route exists
      if (!this.routes[url]) {
        res.writeHead(STATUS.notFound, {
          [HEADER.contentType]: MIME_TYPE.textPlain,
        });
        res.end(`No route ${url}`);
        return;
      } else if (this.routes[url].method !== method) {
        res.writeHead(STATUS.methodNotAllowed, {
          [HEADER.contentType]: MIME_TYPE.textPlain,
        });
        res.end(`No route ${method} ${url}`);
        return;
      }

      const _req = this.rewriteRequest(req);

      // Run callback
      this.routes[url].cb(this.as(_req), res);
    });

    httpServer.listen(port, () => {
      cb();
    });
  }

  /**
   * Add convenience properties to 'req'
   * @private
   * @param {Request} req
   * @returns {HttpRequest<any>}
   */
  rewriteRequest(req) {
    const { url, headers } = req;
    /**
     * @type {HttpRequest<any>}
     */
    const _req = this.as(req);
    _req.query = this.parseQueryString(url || URL_DEFAULT);
    _req.search = this.getQueryString(url || URL_DEFAULT);
    _req.url = this.cleanUrl(url);
    _req.origin = headers.origin || '';
    return _req;
  }

  /**
   * @template Q
   * @public
   * @param {string} url
   * @param {RouteHandler<Q>} cb
   * @returns {void}
   */
  get(url, cb) {
    this.routes[url] = {
      method: METHOD.get,
      cb,
    };
  }

  /**
   * @template Q
   * @public
   * @param {string} url
   * @param {RouteHandler<Q>} cb
   * @returns {void}
   */
  post(url, cb) {
    this.routes[url] = {
      method: METHOD.post,
      cb,
    };
  }

  /**
   * @template Q
   * @public
   * @param {string} url
   * @param {RouteHandler<Q>} cb
   * @returns {void}
   */
  put(url, cb) {
    this.routes[url] = {
      method: METHOD.put,
      cb,
    };
  }

  /**
   * @template Q
   * @public
   * @param {string} url
   * @param {RouteHandler<Q>} cb
   * @returns {void}
   */
  delete(url, cb) {
    this.routes[url] = {
      method: METHOD.delete,
      cb,
    };
  }

  /**
   * @private
   * @param {string | undefined} url
   * @returns
   */
  cleanUrl(url) {
    if (!url) {
      return URL_DEFAULT;
    }
    return url.replace(/[\?#].*$/, '');
  }

  /**
   * @private
   * @param {string} url
   */
  getQueryString(url) {
    if (url.startsWith('/')) {
      url = 'http://localhost' + url;
    }

    const parsedUrl = new URL(url);
    return parsedUrl.search;
  }

  /**
   * @private
   * @template T
   * @param {string} url
   * @returns {T}
   */
  parseQueryString(url) {
    const queryString = this.getQueryString(url);
    const pairs = queryString.slice(1).split('&');
    /**
     * @type {QueryString}
     */
    const result = {};

    pairs.forEach((pair) => {
      const [key, value] = pair.split('=');
      const decodedKey = decodeURIComponent(key);
      const decodedValue = decodeURIComponent(value || '');

      if (decodedValue) {
        result[decodedKey] = decodedValue;
      }
    });

    return /** @type {typeof this.as<T>} */ (this.as)(result);
  }

  /**
   * @private
   * @template T
   * @param {any} data
   * @returns {T}
   */
  as(data) {
    return data;
  }
}
