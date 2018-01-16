import { message } from 'antd';
import * as userService from '../services/user';

const fetchQuery = {
  from: 0,
  len: 20,
};

let hide;

export default {
  namespace: 'result',
  state: {
    items: [],
    total: 0,
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
    save(state, { payload: { data: { list: items, total } } }) {
      return Object.assign({}, { ...state }, { items }, { total });
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
    },
    *searchMaterial({ payload: { key } }, { put, call }) {
      hide = message.loading('请稍等哇~~~', 0);
      const { data, code, msg } = yield call(userService.searchMaterial, { key });
      if (code === 0) {
        yield put({ type: 'save', payload: { data } });
        setTimeout(hide, 800);
        return;
      }
      if (code === 610) {
        setTimeout(hide, 0);
        message.info('不好意思, 我们没有搜索到您需要的物品~');
        yield put({ type: 'save', payload: { data } });
        return;
      }
      setTimeout(hide, 0);
      message.info(`出错啦~, 错误信息: ${msg}`);
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
