import request from '../utils/request';
import * as cookie from '../utils/cookie';

function fetchCards({ from = 0, len = 20 }) {
  return request(`/api/materials/list?from=${from}&len=${len}`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      token: cookie.getCookie('token'),
    },
  });
}

function fetchDetails({ url }) {
  console.log(url);
  return request(url, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      token: cookie.getCookie('token'),
    },
  });
}

export { fetchCards, fetchDetails };
