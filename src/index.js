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
 *  headers: Headers;
 * }} HttpRequest
 */

/**
 * @template Q
 * @typedef {(req: HttpRequest<Q>, res: Response) => Promise<void>} RouteHandler
 */

export default class HttpStream {
  /**
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
   * }} options
   * @param {() => void} cb
   */
  listen({ port }, cb = () => {}) {
    const httpServer = createServer(async (req, res) => {
      const { method, url: _url } = req;

      const url = this.cleanUrl(_url);

      if (method === METHOD.options) {
        res.writeHead(204, {
          Allow: Object.keys(METHOD)
            .map(
              (item) => METHOD[/** @type {typeof this.as<keyof typeof METHOD>} */ (this.as)(item)]
            )
            .join(', '),
          [HEADER.contentLength]: 0,
        });
        res.end();
        return;
      }

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
    const { url } = req;
    /**
     * @type {HttpRequest<any>}
     */
    const _req = this.as(req);
    _req.query = this.parseQueryString(url || URL_DEFAULT);
    _req.search = this.getQueryString(url || URL_DEFAULT);
    _req.url = this.cleanUrl(url);
    _req.headers = this.parseHeaders(req.rawHeaders);
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
   * @param {string[]} rawHeaders
   * @returns {Headers}
   */
  parseHeaders(rawHeaders) {
    /**
     * @type {Headers}
     */
    const res = {};
    rawHeaders.forEach((item, index) => {
      if (index % 2 === 0) {
        res[item.toLowerCase()] = rawHeaders[index + 1];
      }
    });
    return res;
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
