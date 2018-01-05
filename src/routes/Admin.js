import React from 'react';
import { connect } from 'dva';
import { Layout, Affix } from 'antd';
import { routerRedux } from 'dva/router';
import SideNav from '../components/SideNav/SideNav.js';
import TopNav from '../components/TopNav/TopNav.js';

const { Sider, Header, Content } = Layout;

class Admin extends React.Component {
  constructor() {
    super();
    this.state = {
      sideCollapsed: true,
      topTitle: '欢迎来到物资管理系统',
      topNavIcon: 'collapse',
    };
  }

  searchHandle = (key) => {
    this.props.dispatch({
      type: 'MaterialInfo/searchMaterial',
      payload: { key }
    });
  };

  pageChangeHandler = ({ item, key }) => {
    console.log(key);
    if (item.props.path) {
      this.props.dispatch(routerRedux.push(item.props.path));
    }
    if (key === 'logout') {
      this.logout();
    }
  };

  logout = () => {
    console.log('2');
    this.props.dispatch({
      type: 'login/logout',
      payload: {},
    });
  };

  toggle = () => {
    this.setState({
      sideCollapsed: !this.state.sideCollapsed,
    });
  };

  changeIcon = (affixed) => {
    if (affixed) {
      this.setState({ topNavIcon: 'goTop' });
    }
    else {
      this.setState({ topNavIcon: 'collapse' });
    }
  };

  render() {
    return (
      <Layout style={{ minHeight: '100%' }}>
        <Sider
          collapsed={this.state.sideCollapsed}
          collapsible
          trigger={null}
          style={{
            minHeight: '100vh',
            zIndex: 100,
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
            background: '#fff'
          }}
        >
          <SideNav
            userName="admin"
            type="admin"
            pageChangeHandler={this.pageChangeHandler}
          />
        </Sider>
        <Layout style={{ minWidth: '1100px' }}>
          <Affix onChange={this.changeIcon}>
            <Header style={{ padding: 0, height: 'auto', background: '#fff', borderBottom: '1px solid #e9e9e9' }}>
              <TopNav
                title={this.state.topTitle}
                sideToggle={this.toggle}
                sideCollapsed={this.state.sideCollapsed}
                topNavIcon={this.state.topNavIcon}
                searchHandle={this.searchHandle}
              />
            </Header>
          </Affix>
          <Content style={{ padding: '20px', background: 'white', minHeight: '95%' }}>
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return {
    admin: state.admin,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch, // 为什么要显示传入dispatch, 这就十分僵硬了。。。。。
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
// export default Admin;
