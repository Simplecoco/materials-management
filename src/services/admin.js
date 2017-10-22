import request from '../utils/request';

function fetchCards({ limit = 20 }) {
  return request(`http://www.easy-mock.com/mock/59eaf2e3784f01172f35c5e7/api/cards?limit=${limit}`);
}

function fetchUsers({ limit = 10 }) {
  return request(`http://www.easy-mock.com/mock/59eaf2e3784f01172f35c5e7/api/users?limit=${limit}`);
}

function fetchDetails({ url }) {
  return request(url);
}

export { fetchCards, fetchUsers, fetchDetails };
