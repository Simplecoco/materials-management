import * as userService from '../services/user';
// import { message } from 'antd';

export default {
  namespace: 'applyList',
  state: {
    applyListMid: [],
    applyList: [],
    mail: '1@163.com',
    name: 'joker',
    orderid: '20171226162827d978',
    stunum: '',
    tel: '15631863231',
  },
  reducers: {
    addToList(state, { payload: listInfo, payload: { mid } }) {
      console.log({ mid });
      console.log(listInfo);
      const arr1 = state.applyListMid.slice(0);
      const arr2 = state.applyList.slice(0);
      arr1.push(mid);
      arr2.push(listInfo);
      console.log(arr1, arr2);
      return Object.assign({}, { ...state }, { applyListMid: arr1, applyList: arr2 });
    },
    saveNewApply(state, { payload: { data } }) {
      console.log(data);
      return Object.assign({}, { ...state }, { ...data });
    },
  },
  effects: {
    *newApply({ payload }, { call, put }) {
      // console.log(payload);
      const { data } = yield call(userService.newApply);
      console.log(data);
      yield put({ type: 'saveNewApply', payload: { data } });
    },

    *submitApply({ payload }, { call }) {
      console.log(payload);
      const { data } = yield call(userService.submitApply, payload);
      console.log(data);
    },
  },
  subscriptions: {
    // setup({ dispatch, history }) {
    //   return history.listen(({ pathname, query }) => {
    //     if (pathname === ('/user/applyList')) {
    //       dispatch({ type: 'fetch', payload: query });
    //     }
    //   });
    // },
  },
};
