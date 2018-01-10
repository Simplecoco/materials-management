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
      if (state.applyListMid.indexOf(mid) !== -1) {    // 如果购物车中已存在此物品则不能再添加
        message.info('清单中已经添加过该物品啦~');
        return state;
      }
      const arr1 = state.applyListMid.slice(0);
      const arr2 = state.applyList.slice(0);
      arr1.push(mid);
      arr2.push(listInfo);
      message.success('添加成功!');
      return Object.assign({}, { ...state }, { applyListMid: arr1, applyList: arr2 });
    },
    saveNewApply(state, { payload: { data } }) {
      console.log(data);
      return Object.assign({}, { ...state }, { ...data });
    },
    deleteIt(state, { payload: { key, mid } }) {
      console.log(key, mid);
      return Object.assign({}, { ...state }, {
        applyList: state.applyList.filter((item) => {
          return item.key !== key;
        }),
        applyListMid: state.applyListMid.filter((item) => {
          return item !== mid;
        }),
      });
    },
    deleteSuccess(state, { payload: { mids } }) {
      return Object.assign({}, { ...state }, {
        applyList: state.applyList.filter((item) => {
          console.log(mids, item.mid, mids.indexOf(item.mid));
          return mids.indexOf(item.mid) === -1;
        }),
        applyListMid: state.applyListMid.filter((item) => {
          return mids.indexOf(item) === -1;
        }),
      });
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
        yield message.error(`出错啦!, 错误信息: ${msg}` || `出错啦!, 错误信息: ${mes}` || '出错啦!');
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
