import { routerRedux } from 'dva/router';
import { notification, Icon, message } from 'antd';
import * as commonService from '../services/common';

export default {
  namespace: 'user',
  state: {
    tags: []
  },
  reducers: {
    saveAllTags(state, { payload: { data: { list: tags } } }) {
      return Object.assign({}, { ...state }, { tags });
    }
  },
  effects: {
    *fetchAllTags({ payload }, { call, put }) {
      const { data, code, msg } = yield call(commonService.fetchAllTags);
      console.log({ data }, '2222');
      if (code !== 0) {
        message.error(`出错啦, 错误信息: ${msg}`);
      }
      else {
        yield put({ type: 'saveAllTags', payload: { data } });
      }
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/user') {
          notification.open({
            message: 'Hello, My Friend!!!',
            description: '欢迎您来到物资管理系统~',
            icon: <Icon type="smile-circle" style={{ color: '#03c463' }} />,
            duration: 3,
            placement: 'topRight'
          });
          dispatch({ type: 'fetchAllTags', payload: {} });
          dispatch(routerRedux.push('/user/result'));    // 用户进入用户首页时自动跳转到result
        }
      });
    },
  },
};
