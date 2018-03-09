import request from '../utils/request';
import * as cookie from '../utils/cookie';

function fetchAllTags() {
  return request('/v1/supply/tags/all', {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      token: cookie.getCookie('token'),
    },
  });
}

function fetchTagsMaterial({ tid }) {
  return request('/v1/supply/tags/list', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      token: cookie.getCookie('token'),
    },
    body: JSON.stringify({ tid }),
  });
}

export { fetchAllTags, fetchTagsMaterial };
