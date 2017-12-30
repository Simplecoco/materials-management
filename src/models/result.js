import * as userService from '../services/user';

const fetchQuery = {
  from: 0,
  len: 20,
};

export default {
  namespace: 'result',
  state: {
    items: [],
    reqItem: {},
    detailLoading: false,
    resultLoading: false,
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
    detailLoadingChange(state, { payload: { loading } }) {
      return Object.assign({}, { ...state }, { detailLoading: loading });
    },
    resultLoadingChange(state, { payload: { loading } }) {
      return Object.assign({}, { ...state }, { resultLoading: loading });
    },
  },
  effects: {
    *fetch({ payload: { from = fetchQuery.from, len = fetchQuery.len } }, { call, put }) {
      yield put({ type: 'resultLoadingChange', payload: { loading: true } });
      const { data } = yield call(userService.fetchCards, { from, len });
      yield put({ type: 'save', payload: { data } });
      yield put({ type: 'resultLoadingChange', payload: { loading: false } });
    },
    *fetchDetail({ payload: { url } }, { call, put }) {
      yield put({ type: 'detailLoadingChange', payload: { loading: true } });
      const { data } = yield call(userService.fetchDetails, { url });
      yield put({ type: 'saveDetails', payload: { data } });
      yield put({ type: 'detailLoadingChange', payload: { loading: false } });
    },
    *resetReqItem({ payload: { data } }, { put }) {
      yield put({ type: 'saveDetails', payload: { data } });
    }
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
