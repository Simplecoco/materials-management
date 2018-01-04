import request from '../utils/request';

export default function login(payload) {
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
