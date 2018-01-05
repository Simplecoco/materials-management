import request from '../utils/request';
import * as cookie from '../utils/cookie';

function login(payload) {
  if (!payload) {
    return;
  }

  return request('/v1/supply/user/login', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
}

function logout() {
  return request('/v1/supply/user/logout', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      token: cookie.getCookie('token'),
    },
    body: JSON.stringify({ uid: cookie.getCookie('uid') }),
  });
}

export { login, logout };
