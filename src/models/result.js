import * as userService from '../services/user';

export default {
  namespace: 'result',
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
      const { data } = yield call(userService.fetchCards, { limit });
      yield put({ type: 'save', payload: { data } });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/user/result') {
          dispatch({ type: 'fetch', payload: query });
        }
      });
    },
  },
};
