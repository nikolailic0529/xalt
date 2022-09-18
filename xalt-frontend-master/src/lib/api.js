import axios from 'axios';
import qs from 'qs';

import {store} from '../index';

const makeRequest = (method, url, query, body, headers) => {
  const {accessToken, accessClient, accessUID} = store.getState().auth;
  return axios({
    method,
    url: `${process.env.API_URL}${url}?${qs.stringify(query)}`,
    data: body,
    headers: {
      'access-token': accessToken,
      client: accessClient,
      uid: accessUID,
      ...headers,
    },
  });
};

const api = {
  get: (url, {query = {}, headers = {}} = {}) =>
    makeRequest('GET', url, query, null, headers),
  post: (url, {query = {}, body = {}, headers = {}} = {}) =>
    makeRequest('POST', url, query, body, headers),
  put: (url, {query = {}, body = {}, headers = {}} = {}) =>
    makeRequest('PUT', url, query, body, headers),
  delete: (url, {query = {}, body = {}, headers = {}} = {}) =>
    makeRequest('DELETE', url, query, body, headers),
};

export default api;
