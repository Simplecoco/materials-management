import { message } from 'antd';
import * as adminService from '../services/admin';

const fetchQuery = {
  from: 0,
  len: 20,
};

let hide;

export default {
  namespace: 'MaterialInfo',
  state: {
    items: [],
    total: 0,
    reqItem: {},
    detailLoading: false,
    resultLoading: false,
    addLoading: false,
    addCode: '',
    addMsg: '',
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
    addLoadingChange(state, { payload: { loading } }) {
      return Object.assign({}, { ...state }, { addLoading: loading });
    },
    saveAddCode(state, { payload: { code, msg } }) {
      return Object.assign({}, { ...state }, { addCode: code, addMsg: msg });
    }
  },
  effects: {
    *fetch({ payload: { from = fetchQuery.from, len = fetchQuery.len } }, { call, put }) {
      console.log(from, len);
      yield put({ type: 'resultLoadingChange', payload: { loading: true } });
      const { data } = yield call(adminService.fetchCards, { from, len });
      yield put({ type: 'save', payload: { data } });
      yield put({ type: 'resultLoadingChange', payload: { loading: false } });
    },
    *fetchDetail({ payload: { url } }, { call, put }) {
      yield put({ type: 'detailLoadingChange', payload: { loading: true } });
      const { data } = yield call(adminService.fetchDetails, { url });
      yield put({ type: 'saveDetails', payload: { data } });
      yield put({ type: 'detailLoadingChange', payload: { loading: false } });
    },
    *addMaterial({ payload: { values } }, { call, put }) {
      yield put({ type: 'addLoadingChange', payload: { loading: true } });
      const { data, code, msg } = yield call(adminService.addMaterial, { values });
      if (code === 0) {
        console.log(data, 'data added');
        yield put({ type: 'saveAddCode', payload: { code, msg } });
        yield put({ type: 'addLoadingChange', payload: { loading: false } });
        yield put({ type: 'fetch', payload: {} });
      } else if (code !== 0) {
        console.log(code, 'code');
        yield put({ type: 'saveAddCode', payload: { code, msg } });
        yield put({ type: 'addLoadingChange', payload: { loading: false } });
      }
    },
    *modifyMaterial({ payload: { values } }, { call }) {
      const { data, code, msg } = yield call(adminService.modifyMaterial, { values });
      console.log({ data, code, msg });
    },
    *resetReqItem({ payload: { data } }, { put }) {
      yield put({ type: 'saveDetails', payload: { data } });
    },
    *searchMaterial({ payload: { key } }, { put, call }) {
      hide = message.loading('请稍等哇~~~', 0);
      const { data, code, msg } = yield call(adminService.searchMaterial, { key });
      console.log({ data });
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
      message.error(`出错啦~, 错误信息: ${msg}`);
    }
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
