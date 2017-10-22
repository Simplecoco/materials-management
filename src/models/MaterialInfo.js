import * as adminService from '../services/admin';

export default {
  namespace: 'MaterialInfo',
  state: {
    items: [],
    reqItem: {},
  },
  reducers: {
    save(state, { payload: { data: { items } } }) {
      return Object.assign({}, { ...state }, { items });
    },
    saveDetails(state, { payload: { data: { reqItem } } }) {
      return Object.assign({}, { ...state }, { reqItem });
    },
  },
  effects: {
    *fetch({ payload: { limit } }, { call, put }) {
      const { data } = yield call(adminService.fetchCards, { limit });
      yield put({ type: 'save', payload: { data } });
    },
    *fetchDetail({ payload: { url } }, { call, put }) {
      const { data } = yield call(adminService.fetchDetails, { url });
      yield put({ type: 'saveDetails', payload: { data } });
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
