import { message } from 'antd';
import * as adminService from '../services/admin';

// const fetchQuery = {
//   from: 0,
//   len: 20,
// };

export default {
  namespace: 'requestList',
  state: {
    mine: [],
  },
  reducers: {
    save(state, { payload: { data } }) {
      return Object.assign({}, { ...state }, { ...data });
    },
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      // yield put({ type: 'resultLoadingChange', payload: { loading: true } });
      const { data, code, msg } = yield call(adminService.fetchOrders);
      console.log({ data });
      if (code === 0) {
        yield put({ type: 'save', payload: { data } });
      }
      else {
        message.error(`错误信息${msg}`);
      }
      // yield put({ type: 'resultLoadingChange', payload: { loading: false } });
    },
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
