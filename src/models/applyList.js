import { message } from 'antd';
// import { routerRedux } from 'dva/router';
import * as userService from '../services/user';

export default {
  namespace: 'applyList',
  state: {
    applyListMid: [],
    applyList: [],
    selected: [],
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
    deleteIt(state, { payload: { key } }) {
      console.log(key);
      return Object.assign({}, { ...state }, { applyList: state.applyList.filter((item) => {
        return item.key !== key;
      }) });
    },
    deleteSuccess(state, { payload: { mids } }) {
      return Object.assign({}, { ...state }, { applyList: state.applyList.filter((item) => {
        console.log(mids, item.mid, mids.indexOf(item.mid));
        return mids.indexOf(item.mid) === -1;
      }) });
    },
  },
  effects: {
    *newApply({ payload }, { call, put }) {
      const { data } = yield call(userService.newApply);
      console.log(data);
      yield put({ type: 'saveNewApply', payload: { data } });
    },

    *submitApply({ payload, payload: { mids, okCallback } }, { call, put }) {
      console.log(payload, mids, 'mids');
      const { data, code, msg, mes } = yield call(userService.submitApply, payload);
      console.log({ data, msg }, 'data', 'msg');
      if (code === 0) {
        yield message.success('提交申请成功啦~');
        yield put({ type: 'deleteSuccess', payload: { mids } });
        yield okCallback && okCallback();
      }
      else {
        yield message.error(msg || mes || '出错啦!');
      }
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
