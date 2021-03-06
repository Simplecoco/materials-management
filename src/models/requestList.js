import { message } from 'antd';
import * as adminService from '../services/admin';

// const fetchQuery = {
//   from: 0,
//   len: 20,
// };

const countOverdue = (arr) => {
  return arr.filter((item) => { return item.sta === 'overdue'; });
};

export default {
  namespace: 'requestList',
  state: {
    mine: [],
    to: [],
    done: [],
    overdue: []
  },
  reducers: {
    save(state, { payload: { data } }) {
      const { mine } = data;
      const overdue = countOverdue(mine);
      const newData = Object.assign({}, data, { overdue });
      return Object.assign({}, { ...state }, { ...newData });
    },
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      // yield put({ type: 'resultLoadingChange', payload: { loading: true } });
      const { data, code, msg } = yield call(adminService.fetchOrders);
      if (code === 0) {
        yield put({ type: 'save', payload: { data } });
      }
      else {
        message.error(`错误信息: ${msg}`);
      }
      // yield put({ type: 'resultLoadingChange', payload: { loading: false } });
    },
    *review({ payload }, { call, put }) {
      const { code, msg } = yield call(adminService.reviewOrder, payload);
      if (code === 0) {
        yield message.success('回复成功啦~');
        yield put({ type: 'fetch' });
      }
      else {
        yield message.error(`回复失败了呢~, 错误信息: ${msg}`);
      }
    },
    *recharge({ payload }, { call }) {
      const { code, msg } = yield call(adminService.rechargeOrder, payload);
      if (code === 0) {
        yield message.success('回复成功啦~');
        // yield put({ type: 'fetch' });
      }
      else {
        yield message.error(`回复失败了呢~, 错误信息: ${msg}`);
      }
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === ('/admin/requestList')) {
          dispatch({ type: 'fetch', payload: query });
        }
        if (pathname === ('/user/records')) {
          dispatch({ type: 'fetch', payload: query });
        }
      });
    },
  },
};
