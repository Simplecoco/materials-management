import { routerRedux } from 'dva/router';
import { notification, Icon } from 'antd';
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
    *login({ payload }, { call, put }) {
      const { data, code } = yield call(loginService.login, payload);
      console.log(code);
      if (code !== 0) {
        notification.open({
          message: 'Failed !!!',
          description: '登录失败哦, 看看用户名密码又没有搞错吧~',
          icon: <Icon type="frown" style={{ color: 'pink' }} />,
          duration: 2,
          placement: 'topLeft'
        });
        return;
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
    *logout({ payload }, { put, call }) {
      console.log('4');
      const { data, code } = yield call(loginService.logout);
      console.log(data, code);
      if (code === 0) {
        const infoArr = ['name', 'uid', 'avatar', 'token'];
        yield infoArr.forEach((item) => {
          cookie.clearCookie(item);
        });
        yield put(routerRedux.push('/'));
      }
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
