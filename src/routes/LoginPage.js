import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Tabs, Divider } from 'antd';
import styles from './LoginPage.css';
import Login from '../components/Login/Login';

const { TabPane } = Tabs;

class LoginPage extends React.Component {
  switchToRegister = () => {
    this.props.dispatch(routerRedux.push('/register'));
  };

  login = ({ userName, password }) => {
    this.props.dispatch({
      type: 'login/login',
      payload: {
        name: userName,
        passwd: password,
        device: 'device',
        type: 'user',
      },
    });
  };

  adminLogin = ({ userName, password }) => {
    this.props.dispatch({
      type: 'login/login',
      payload: {
        name: userName,
        passwd: password,
        device: 'device',
        type: 'admin',
      },
    });
  };

  render() {
    return (
      <div className={styles.loginPage}>
        <div className={styles.loginBox}>
          <div style={{ textAlign: 'center', fontSize: '25px' }}>
            物资管理系统
          </div>
          <Divider style={{ color: 'lightgray' }}>请登录</Divider>
          <Tabs defaultActiveKey="1" size="small">
            <TabPane tab="用户登录" key="1">
              <Login switchToRegister={this.switchToRegister} login={this.login} />
            </TabPane>
            <TabPane tab="管理员登录" key="2">
              <Login switchToRegister={this.switchToRegister} login={this.adminLogin} />
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { name, passwd, device } = state.login;
  return { name, passwd, device };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch, // 为什么要显示传入dispatch, 这就十分僵硬了。。。。。
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
