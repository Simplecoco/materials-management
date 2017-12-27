import React from 'react';
import { Router, Route, IndexRoute } from 'dva/router';
import IndexPage from './routes/IndexPage';

import User from './routes/User';

import Test1 from './routes/Test1';

import Test2 from './routes/Test2';

import Result from './routes/Result';

import Admin from './routes/Admin';

import RequestList from './routes/RequestList';

import UserInfo from './routes/UserInfo';

import MaterialInfo from './routes/MaterialInfo';

import Records from './routes/Records.js';


import PersonalInfo from './routes/PersonalInfo.js';


import Message from './routes/Message.js';


import Register from './routes/Register.js';


import Login from './routes/LoginPage.js';


function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={IndexPage} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route path="/user" component={User}>
        <IndexRoute component={Test1} />
        <Route path="personalInfo" component={PersonalInfo} />
        <Route path="result" component={Result} />
        <Route path="records" component={Records} />
        <Route path="message" component={Message} />
      </Route>
      <Route path="/admin" component={Admin}>
        <IndexRoute component={Test2} />
        <Route path="personalInfo" component={PersonalInfo} />
        <Route path="requestList" component={RequestList} />
        <Route path="userInfo" component={UserInfo} />
        <Route path="materialInfo" component={MaterialInfo} />
        <Route path="records" component={Records} />
        <Route path="message" component={Message} />
      </Route>
    </Router>
  );
}

export default RouterConfig;
