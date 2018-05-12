import request from '../utils/request';
import * as cookie from '../utils/cookie';

function fetchCards({ from = 0, len = 20 }) {
  return request(`/v1/supply/materials/list?from=${from}&len=${len}`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      token: cookie.getCookie('token'),
    },
  });
}

function fetchUsers() {
  return request('/v1/supply/user/list', {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      token: cookie.getCookie('token'),
    },
  });
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
  return request('/v1/supply/materials/add', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      token: cookie.getCookie('token'),
    },
    body: JSON.stringify(values),
  });
}

function modifyMaterial({ values }) {
  return request('/v1/supply/materials/mod', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      token: cookie.getCookie('token'),
    },
    body: JSON.stringify(values),
  });
}

function deleteMaterial({ values }) {
  return request('/v1/supply/materials/del', {
    method: 'POST',
    headers: {
      'Contet-type': 'application/json',
      token: cookie.getCookie('token'),
    },
    body: JSON.stringify(values),
  });
}

function searchMaterial({ key }) {
  return request('/v1/supply/materials/search', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      token: cookie.getCookie('token'),
    },
    body: JSON.stringify({ key }),
  });
}

function fetchOrders() {
  return request('/v1/supply/orders/mine', {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      token: cookie.getCookie('token'),
    },
  });
}

function fetchOrderDetail({ orderid }) {
  return request(`/v1/supply/orders/${orderid}`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      token: cookie.getCookie('token'),
    },
  });
}

function reviewOrder({ orderid, pass, reply, uid = cookie.getCookie('uid') }) {
  return request('/v1/supply/orders/review', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      token: cookie.getCookie('token'),
    },
    body: JSON.stringify({ orderid, pass, reply, uid }),
  });
}

export {
  fetchCards,
  fetchUsers,
  fetchDetails,
  addMaterial,
  modifyMaterial,
  deleteMaterial,
  searchMaterial,
  fetchOrders,
  fetchOrderDetail,
  reviewOrder
};
