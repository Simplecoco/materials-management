import { routerRedux } from 'dva/router';
import { notification, Icon } from 'antd';

export default {
  namespace: 'user',
  state: {},
  reducers: {},
  effects: {},
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/user') {
          notification.open({
            message: 'Hello, My Friend!!!',
            description: '欢迎您来到物资管理系统~',
            icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />,
            duration: 2,
            placement: 'topRight'
          });
          dispatch(routerRedux.push('/user/result'));    // 用户进入用户首页时自动跳转到result
        }
      });
    },
  },
};
