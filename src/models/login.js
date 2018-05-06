import { routerRedux } from 'dva/router';
import { notification, Icon, message } from 'antd';
import * as loginService from '../services/login';
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
    *login({ payload: { type, ...payload } }, { call, put }) {
      const { data, code, msg } = yield call(loginService.login, payload);
      if (code !== 0) {
        notification.open({
          message: 'Failed !!!',
          description: `看看用户名密码又没有搞错吧~, 错误信息: ${msg}`,
          icon: <Icon type="frown" style={{ color: 'pink' }} />,
          duration: 3.5,
          placement: 'topLeft'
        });
        return;
      }
      yield put({ type: 'setLoginState', payload: { data, type } });
    },
    *setLoginState({ payload: { data, type } }, { put }) {
      yield Object.keys(data).forEach((dataName) => {
        cookie.setCookie(dataName, data[dataName]);
        cookie.setCookie('type', type);
      });
      yield put({ type: 'switchPage', payload: { type } });
    },
    *switchPage({ payload: { type } }, { put }) {
      if (type === 'user') {
        yield put(routerRedux.push('/user'));
      }
      if (type === 'admin') {
        yield put(routerRedux.push('/admin'));
      }
    },
    *logout({ payload }, { put, call }) {
      const { code, msg } = yield call(loginService.logout);
      if (code === 0 || code === 604 || code === 606) {
        const infoArr = ['name', 'uid', 'avatar', 'token'];
        yield infoArr.forEach((item) => {
          cookie.clearCookie(item);
        });
        yield put(routerRedux.push('/login'));
      }
      else {
        message.error(`错误啦~,错误信息: ${msg}`);
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/login' && cookie.getCookie('token')) {
          if (cookie.getCookie('type') === 'user') {
            dispatch(routerRedux.push('/user'));    // 用户进入首页时自动跳转到result
          }
          if (cookie.getCookie('type') === 'admin') {
            dispatch(routerRedux.push('/admin'));    // 用户进入首页时自动跳转到MaterialInfo
          }
        }
      });
    },
  },
};
