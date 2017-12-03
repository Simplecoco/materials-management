import * as userService from '../services/user';

export default {
  namespace: 'result',
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
      const { data } = yield call(userService.fetchCards, { limit });
      yield put({ type: 'save', payload: { data } });
    },
    *fetchDetail({ payload: { url } }, { call, put }) {
      const { data } = yield call(userService.fetchDetails, { url });
      yield put({ type: 'saveDetails', payload: { data } });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === ('/user/result')) {
          dispatch({ type: 'fetch', payload: query });
        }
      });
    },
  },
};
