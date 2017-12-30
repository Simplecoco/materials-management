import { routerRedux } from 'dva/router';

export default {
  namespace: 'user',
  state: {},
  reducers: {},
  effects: {},
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/user') {
          dispatch(routerRedux.push('/user/result'));    // 用户进入用户首页时自动跳转到result
        }
      });
    },
  },
};
