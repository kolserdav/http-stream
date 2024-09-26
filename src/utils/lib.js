import { URL_DEFAULT } from './constants.js';

/**
 * @template T
 * @param {any} data
 * @returns {T}
 */
export function as(data) {
  return data;
}

/**
 * Remove url query string and hash
 * @param {string | undefined} url
 * @returns
 */
export function cleanUrl(url) {
  if (!url) {
    return URL_DEFAULT;
  }
  return url.replace(/[\?#].*$/, '');
}
