import request from '../utils/request';

export function fetch({ limit = 10 }) {
  return request(`http://www.easy-mock.com/mock/59eaf2e3784f01172f35c5e7/api/cards?limit=${limit}`);
}
