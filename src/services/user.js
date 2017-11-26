import request from '../utils/request';

export function fetchCards({ limit = 10 }) {
  return request(`/api/cards?limit=${limit}`);
}
