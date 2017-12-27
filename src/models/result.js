import * as userService from '../services/user';

export default {
  namespace: 'result',
  state: {
    items: [],
    reqItem: {},
    detailLoading: false,
    resultLoading: false,
    query: {
      from: 0,
      len: 20,
    },
    userData: {
      avatar: 'http://asset.starstudio.org/static/img/avatar.jpg',
      name: '',
      uid: '',
    },
  },
  reducers: {
    save(state, { payload: { data: { list: items } } }) {
      return Object.assign({}, { ...state }, { items });
    },
    saveDetails(state, { payload: { data: reqItem } }) {
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
    *fetch({ payload: { from = 0, len = 20 } }, { call, put }) {
      yield put({ type: 'resultLoadingChange' });
      const { data } = yield call(userService.fetchCards, { from, len });
      console.log(data, 222);
      yield put({ type: 'save', payload: { data } });
      yield put({ type: 'resultLoadingChange' });
    },
    *fetchDetail({ payload: { url } }, { call, put }) {
      console.log(23232);
      yield put({ type: 'detailLoadingChange' });
      console.log(2323277);
      const { data } = yield call(userService.fetchDetails, { url });
      console.log(data, 333);
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
