import { message } from 'antd';
import * as adminService from '../services/admin';
import * as commonService from '../services/common';

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
    tags: [],
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
    saveAllTags(state, { payload: { data: { list: tags } } }) {
      return Object.assign({}, { ...state }, { tags });
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
    *fetchAllTags({ payload }, { call, put }) {
      const { data, code, msg } = yield call(commonService.fetchAllTags);
      if (code !== 0) {
        message.error(`出错啦, 错误信息: ${msg}`);
      }
      else {
        yield put({ type: 'saveAllTags', payload: { data } });
      }
    },
    *addMaterial({ payload: { values } }, { call, put }) {
      yield put({ type: 'addLoadingChange', payload: { loading: true } });
      const { code, msg } = yield call(adminService.addMaterial, { values });
      if (code === 0) {
        yield put({ type: 'saveAddCode', payload: { code, msg } });
        yield put({ type: 'addLoadingChange', payload: { loading: false } });
        yield put({ type: 'fetch', payload: {} });
      } else if (code !== 0) {
        yield put({ type: 'saveAddCode', payload: { code, msg } });
        yield put({ type: 'addLoadingChange', payload: { loading: false } });
      }
    },
    *modifyMaterial({ payload: { values, changeDetailVisible, fetch } }, { call }) {
      const { code, msg, mes } = yield call(adminService.modifyMaterial, { values });
      if (code === 0) {
        message.success('修改成功~');
        changeDetailVisible();
        fetch();
      }
      else {
        message.error(`出错啦, 错误信息: ${msg || mes}`);
        changeDetailVisible();
        fetch();
      }
    },
    *deleteMaterial({ payload: { values, changeDetailVisible, fetch } }, { call }) {
      const { code, msg } = yield call(adminService.deleteMaterial, { values });
      if (code === 0) {
        message.success('删除成功~');
        changeDetailVisible();
        fetch();
      } else {
        message.error(`出错啦, 错误信息: ${msg || mes}`);
        changeDetailVisible();
        fetch();
      }
    },
    *resetReqItem({ payload: { data } }, { put }) {
      yield put({ type: 'saveDetails', payload: { data } });
    },
    *searchMaterial({ payload: { key } }, { put, call }) {
      hide = message.loading('请稍等哇~~~', 0);
      const { data, code, msg } = yield call(adminService.searchMaterial, { key });
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
    },
    *fetchTagsMaterial({ payload: { tid } }, { call, put }) {
      const { data, code, msg } = yield call(commonService.fetchTagsMaterial, { tid });
      if (code === 0) {
        yield put({ type: 'save', payload: { data } });
        return;
      }
      if (code === 611) {
        message.info('不好意思, 我们没有找到您需要的物品~');
        yield put({ type: 'save', payload: { data } });
        return;
      }
      message.error(`出错啦~, 错误信息: ${msg}`);
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/admin/materialInfo') {
          dispatch({ type: 'fetch', payload: query });
          dispatch({ type: 'fetchAllTags', payload: {} });
          // dispatch({ type: 'admin/saveAllTags', payload: {} });
        }
      });
    },
  },
};
