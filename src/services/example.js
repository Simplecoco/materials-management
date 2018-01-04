import request from '../utils/request';

export function query() {
  return request('/v1/supply/users');
}
