/**
 * microCMS API SDK
 * https://github.com/microcmsio/microcms-js-sdk
 */
import fetch from 'node-fetch';
import https from 'https';
import { parseQuery } from './utils/parseQuery';
import { isString } from './utils/isCheckValue';
import {
  MicroCMSClient,
  MakeRequest,
  GetRequest,
  GetListRequest,
  GetListDetailRequest,
  GetObjectRequest,
  MicroCMSListResponse,
  MicroCMSListContent,
  MicroCMSObjectContent,
} from './types';

const BASE_DOMAIN = 'microcms.io';
const API_VERSION = 'v1';

const httpsAgent = new https.Agent({
  keepAlive: true,
});

/**
 * Initialize SDK Client
 */
export const createClient = ({ serviceDomain, apiKey }: MicroCMSClient) => {
  if (!serviceDomain || !apiKey) {
    throw new Error('parameter is required (check serviceDomain and apiKey)');
  }

  if (!isString(serviceDomain) || !isString(apiKey)) {
    throw new Error('parameter is not string');
  }

  /**
   * Defined microCMS base URL
   */
  const baseUrl = `https://${serviceDomain}.${BASE_DOMAIN}/api/${API_VERSION}`;

  /**
   * Make request
   */
  const makeRequest = async <T>({
    endpoint,
    contentId,
    queries = {},
  }: MakeRequest): Promise<T> => {
    const queryString = parseQuery(queries);

    const baseOptions = {
      headers: {
        'X-MICROCMS-API-KEY': apiKey,
      },
      agent: httpsAgent,
    };


    const url = `${baseUrl}/${endpoint}${contentId ? `/${contentId}` : ''}${
      queryString ? `?${queryString}` : ''
    }`;

    try {
      const response = await fetch(url, baseOptions);

      if (!response.ok) {
        throw new Error(`fetch API response status: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      if (error.data) {
        throw error.data;
      }

      if (error.response?.data) {
        throw error.response.data;
      }

      return Promise.reject(
        new Error(`serviceDomain or endpoint may be wrong.\n Details: ${error}`)
      );
    }
  };

  /**
   * Get list and object API data for microCMS
   */
  const get = async <T = any>({
    endpoint,
    contentId,
    queries = {},
  }: GetRequest): Promise<T> => {
    if (!endpoint) {
      return Promise.reject(new Error('endpoint is required'));
    }
    return await makeRequest<T>({ endpoint, contentId, queries });
  };

  /**
   * Get list API data for microCMS
   */
  const getList = async <T = any>({
    endpoint,
    queries = {},
  }: GetListRequest): Promise<MicroCMSListResponse<T>> => {
    if (!endpoint) {
      return Promise.reject(new Error('endpoint is required'));
    }
    return await makeRequest<MicroCMSListResponse<T>>({ endpoint, queries });
  };

  /**
   * Get list API detail data for microCMS
   */
  const getListDetail = async <T = any>({
    endpoint,
    contentId,
    queries = {},
  }: GetListDetailRequest): Promise<T & MicroCMSListContent> => {
    if (!endpoint) {
      return Promise.reject(new Error('endpoint is required'));
    }
    return await makeRequest<T & MicroCMSListContent>({
      endpoint,
      contentId,
      queries,
    });
  };

  /**
   * Get object API data for microCMS
   */
  const getObject = async <T = any>({
    endpoint,
    queries = {},
  }: GetObjectRequest): Promise<T & MicroCMSObjectContent> => {
    if (!endpoint) {
      return Promise.reject(new Error('endpoint is required'));
    }
    return await makeRequest<T & MicroCMSObjectContent>({
      endpoint,
      queries,
    });
  };

  return {
    get,
    getList,
    getListDetail,
    getObject,
  };
};
