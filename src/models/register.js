import { message, notification, Icon } from 'antd';
import { routerRedux } from 'dva/router';
import * as registerService from '../services/register';

export default {
  namespace: 'register',
  state: {
    token: '',
    tel: '',
    // telButton: true,
    telCode: ''
  },
  reducers: {
    save(state, { payload: { token } }) {
      return Object.assign({}, { ...state }, { token });
    },
    saveTelCode(state, { payload: { telCode } }) {
      return Object.assign({}, { ...state }, { telCode });
    },
  },
  effects: {
    *stuIdValidate({ payload }, { call, put }) {
      const { code, data: { token } } = yield call(registerService.stuIdValidate, payload);
      if (code === 0) {
        yield put({ type: 'save', payload: { token } });
      }
      else {
        message.error('验证不成功哦, 请重新输入用户名密码');
      }
    },
    *telValidate({ payload }, { call, put }) {
      const { code, msg } = yield call(registerService.telValidate, payload);
      if (code === 0) {
        yield put({ type: 'saveTelCode', payload: { telCode: code } });
      }
      else {
        message.error(msg);
        yield put({ type: 'saveTelCode', payload: { telCode: code } });
      }
    },
    *register({ payload }, { call, put }) {
      const { code, msg } = yield call(registerService.register, payload);
      if (code === 0) {
        notification.open({
          message: 'Success !!!',
          description: '注册成功啦, 祝好~',
          icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />,
          duration: 2,
          placement: 'topLeft'
        });
        yield put(routerRedux.push('/login'));
      }
      else {
        notification.open({
          message: 'Failed !!!',
          description: `注册失败哦, 再试试吧~, 错误信息: ${msg}`,
          icon: <Icon type="frown" style={{ color: 'pink' }} />,
          duration: 5,
          placement: 'topLeft'
        });
      }
    }
  },
  subscriptions: {},
};
