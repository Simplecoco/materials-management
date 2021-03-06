import request from '../utils/request';
// import * as cookie from '../utils/cookie';

function stuIdValidate({ stuid, passwd }) {
  return request('/v1/supply/user/stu', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ stuid, passwd }),
  });
}

function telValidate({ tel, token }) {
  return request('/v1/supply/user/tel', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      token,
    },
    body: JSON.stringify({ tel }),
  });
}

function register({ name, mail, passwd, tel, code, device = 'device', token }) {
  return request('/v1/supply/user/register', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      token,
    },
    body: JSON.stringify({ name, mail, passwd, tel, code, device }),
  });
}

export { stuIdValidate, telValidate, register };
