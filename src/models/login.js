import { routerRedux } from 'dva/router';
import loginService from '../services/login';
import * as cookie from '../utils/cookie';

export default {
  namespace: 'login',
  state: {
    name: '',
    passwd: '',
    device: '',
  },
  reducers: {},
  effects: {
    *login({ payload }, { call, put }) {
      const { data, code, msg } = yield call(loginService, payload);
      if (code !== 0) {
        throw msg;
      }
      yield put({ type: 'setLoginState', payload: data });
    },
    *setLoginState({ payload: data }, { put }) {
      yield Object.keys(data).forEach((dataName) => {
        cookie.setCookie(dataName, data[dataName]);
      });
      yield put({ type: 'switchPage' });
    },
    *switchPage({ payload }, { put }) {
      yield put(routerRedux.push('/user'));
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/login' && cookie.getCookie('token')) {
          dispatch(routerRedux.push('/user'));    // 用户进入首页时自动跳转到result
        }
      });
    },
  },
};
