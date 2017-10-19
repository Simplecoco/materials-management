import React from 'react';
import { Router, Route, IndexRoute } from 'dva/router';
import IndexPage from './routes/IndexPage';

// import Users from "./routes/Users.js";

import User from './routes/User.js';

import Test1 from './routes/Test1.js';

import Test2 from './routes/Test2.js';

import Result from './routes/Result.js';

import Admin from './routes/Admin.js';

import RequestList from './routes/RequestList.js';

import UserInfo from './routes/UserInfo.js';

import MaterialInfo from './routes/MaterialInfo.js';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={IndexPage} />
      <Route path="/user" component={User}>
        <IndexRoute component={Test1} />
        <Route path="result" component={Result} />
        <Route path="test2" component={Test2} />
      </Route>
      <Route path="/admin" component={Admin}>
        <IndexRoute component={Test1} />
        <Route path="requestList" component={RequestList} />
        <Route path="userInfo" component={UserInfo} />
        <Route path="materialInfo" component={MaterialInfo} />
      </Route>
    </Router>
  );
}

export default RouterConfig;
