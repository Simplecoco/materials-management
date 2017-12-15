import * as userService from '../services/user';

export default {
  namespace: 'result',
  state: {
    items: [],
    reqItem: {},
    detailLoading: false,
    resultLoading: false,
  },
  reducers: {
    save(state, { payload: { data: { items } } }) {
      return Object.assign({}, { ...state }, { items });
    },
    saveDetails(state, { payload: { data: { reqItem } } }) {
      return Object.assign({}, { ...state }, { reqItem });
    },
    detailLoadingChange(state) {
      return Object.assign({}, { ...state }, { detailLoading: !state.detailLoading });
    },
    resultLoadingChange(state) {
      return Object.assign({}, { ...state }, { resultLoading: !state.resultLoading });
    },
  },
  effects: {
    *fetch({ payload: { limit } }, { call, put }) {
      yield put({ type: 'resultLoadingChange' });
      const { data } = yield call(userService.fetchCards, { limit });
      yield put({ type: 'save', payload: { data } });
      yield put({ type: 'resultLoadingChange' });
    },
    *fetchDetail({ payload: { url } }, { call, put }) {
      yield put({ type: 'detailLoadingChange' });
      const { data } = yield call(userService.fetchDetails, { url });
      yield put({ type: 'saveDetails', payload: { data } });
      yield put({ type: 'detailLoadingChange' });
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
