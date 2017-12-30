import { routerRedux } from 'dva/router';

export default {
  namespace: 'IndexPage',
  state: {},
  reducers: {},
  effects: {},
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/') {
          dispatch(routerRedux.push('/login'));    // 用户进入首页时自动跳转到result
        }
      });
    },
  },
};
