// @flow
import { createLogger } from 'redux-logger';
import axios from 'axios';
import createAxiosMiddleware from 'redux-axios-middleware';

export const axiosClient = (
  clientConfig = { baseURL: 'http://localhost:8081' }
) =>
  axios.create({
    responseType: 'json',
    ...clientConfig,
  });

export const logger = (options = {}) =>
  createLogger({
    collapsed: true,
    diff: true,
    ...options,
  });

export const axiosMiddleware = (clientConfig = {}, options = {}) => {
  const client = axiosClient(clientConfig);
  return createAxiosMiddleware(client, options);
};

/* eslint-disable */
export default [__DEV__ && logger(), axiosMiddleware()].filter(Boolean);
/* eslint-enable */

export const withAxios = (client = {}, options = {}) => (middlewares = []) =>
  middlewares.concat([axiosMiddleware(client, options)]);

export const withLogger = (options = {}) => (middlewares = []) =>
  middlewares.concat([logger(options)]);

export const configureMiddlewares = (...fns) => (middlewares = []) =>
  fns.reduce((acc, fn) => fn(acc), middlewares);
