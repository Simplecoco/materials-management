import * as adminService from '../services/admin';

export default {
  namespace: 'MaterialInfo',
  state: {
    items: [],
  },
  reducers: {
    save(state, { payload: { data: { items } } }) {
      return Object.assign({}, { ...state }, { items });
    },
  },
  effects: {
    *fetch({ payload: { limit } }, { call, put }) {
      const { data } = yield call(adminService.fetch, { limit });
      yield put({ type: 'save', payload: { data } });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/admin/materialInfo') {
          dispatch({ type: 'fetch', payload: query });
        }
      });
    },
  },
};
