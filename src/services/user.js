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

function fetchDetails({ url }) {
  return request(url, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      token: cookie.getCookie('token'),
    },
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

function newApply() {
  return request('/v1/supply/orders/new', {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      token: cookie.getCookie('token'),
    },
  });
}

function submitApply({ orderid, uid, tel, title, mids, begtime, endtime, reason, remark }) {
  return request('/v1/supply/orders/add', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      token: cookie.getCookie('token'),
    },
    body: JSON.stringify({ orderid, uid, tel, title, mids, begtime, endtime, reason, remark }),
  });
}


export { fetchCards, fetchDetails, searchMaterial, newApply, submitApply };
