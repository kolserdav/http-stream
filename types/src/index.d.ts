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
    private routes;
    /**
     * @public
     * @param {{
     *  port: number;
     * }} options
     * @param {() => void} cb
     */
    public listen({ port }: {
        port: number;
    }, cb?: () => void): void;
    /**
     * Add convenience properties to 'req'
     * @private
     * @param {Request} req
     * @returns {HttpRequest<any>}
     */
    private rewriteRequest;
    /**
     * @template Q
     * @public
     * @param {string} url
     * @param {RouteHandler<Q>} cb
     * @returns {void}
     */
    public get<Q>(url: string, cb: RouteHandler<Q>): void;
    /**
     * @template Q
     * @public
     * @param {string} url
     * @param {RouteHandler<Q>} cb
     * @returns {void}
     */
    public post<Q>(url: string, cb: RouteHandler<Q>): void;
    /**
     * @template Q
     * @public
     * @param {string} url
     * @param {RouteHandler<Q>} cb
     * @returns {void}
     */
    public put<Q>(url: string, cb: RouteHandler<Q>): void;
    /**
     * @template Q
     * @public
     * @param {string} url
     * @param {RouteHandler<Q>} cb
     * @returns {void}
     */
    public delete<Q>(url: string, cb: RouteHandler<Q>): void;
    /**
     * @private
     * @param {string | undefined} url
     * @returns
     */
    private cleanUrl;
    /**
     * @private
     * @param {string} url
     */
    private getQueryString;
    /**
     * @private
     * @template T
     * @param {string} url
     * @returns {T}
     */
    private parseQueryString;
    /**
     * @private
     * @template T
     * @param {any} data
     * @returns {T}
     */
    private as;
}
export type Request = IncomingMessage;
export type Headers = Record<string, string>;
export type Response = ServerResponse<IncomingMessage> & {
    req: IncomingMessage;
};
export type QueryString = Record<string, string>;
export type HttpRequest<Q> = Request & {
    query: Q;
    url: string;
    search: string;
};
export type RouteHandler<Q> = (req: HttpRequest<Q>, res: Response) => Promise<void>;
import { HEADER } from './constants.js';
import { METHOD } from './constants.js';
import { MIME_TYPE } from './constants.js';
import { STATUS } from './constants.js';
import { IncomingMessage } from 'http';
import { ServerResponse } from 'http';
export { HEADER, METHOD, MIME_TYPE, STATUS };
