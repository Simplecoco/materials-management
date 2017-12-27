import request from '../utils/request';

function fetchCards() {
  // return request(`/api/1/supply/cards?limit=${limit}`);
  return request('/api/materials/list?from=1&len=2', {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      token: 'ff9dd5e3-2eeb-4430-a16b-22af69d738c3',
    },
  });
}

function fetchUsers({ limit = 10 }) {
  return request(`/api/1/supply/users?limit=${limit}`);
}

function fetchDetails({ url }) {
  return request(url);
}

export { fetchCards, fetchUsers, fetchDetails };
