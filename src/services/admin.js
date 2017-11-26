import request from '../utils/request';

function fetchCards({ limit = 20 }) {
  return request(`/api/cards?limit=${limit}`);
}

function fetchUsers({ limit = 10 }) {
  return request(`/api/users?limit=${limit}`);
}

function fetchDetails({ url }) {
  return request(url);
}

export { fetchCards, fetchUsers, fetchDetails };
