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

function fetchUsers({ limit = 10 }) {
  return request(`/api/1/supply/users?limit=${limit}`);
}

function fetchDetails({ url }) {
  return request(url, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      token: cookie.getCookie('token'),
    },
  });
}

function addMaterial({ values }) {
  console.log(values);
  return request('/api/materials/add', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      token: cookie.getCookie('token'),
    },
    body: JSON.stringify(values),
  });
}

function searchMaterial({ key }) {
  return request('/api/materials/search', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      token: cookie.getCookie('token'),
    },
    body: JSON.stringify({ key }),
  });
}

export { fetchCards, fetchUsers, fetchDetails, addMaterial, searchMaterial };
