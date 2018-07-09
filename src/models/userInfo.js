import * as adminService from '../services/admin';

const fetchQuery = {
  from: 0,
  len: 10,
};

export default {
  namespace: 'userInfo',
  state: {
    items: [],
    total: 0,
  },
  reducers: {
    save(state, { payload: { data: { list: items, total } } }) {
      return Object.assign({}, { ...state }, { items, total });
    },
  },
  effects: {
    *fetch({ payload: { from, len } }, { call, put }) {
      const { data } = yield call(adminService.fetchUsers, { from, len });
      yield put({ type: 'save', payload: { data } });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (Object.keys(query).length === 0) {
          query = fetchQuery;
        }
        if (pathname === '/admin/userInfo') {
          dispatch({ type: 'fetch', payload: query });
        }
      });
    },
  },
};
