import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import styles from './LoginPage.css';
import Login from '../components/Login/Login';

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
      },
    });
  };

  render() {
    return (
      <div className={styles.loginPage}>
        <Login switchToRegister={this.switchToRegister} login={this.login} />
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
