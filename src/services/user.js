import request from '../utils/request';

function fetchCards({ limit = 20 }) {
  return request(`/api/1/supply/cards?limit=${limit}`);
}

function fetchDetails({ url }) {
  return request(url);
}

export { fetchCards, fetchDetails };
