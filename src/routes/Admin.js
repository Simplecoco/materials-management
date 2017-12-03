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
    };
  }

  onCollapse = (sideCollapsed) => {
    this.setState({ sideCollapsed });
  };

  pageChangeHandler = (arg) => {
    this.props.dispatch(routerRedux.push(arg.item.props.path));
  };

  render() {
    return (
      <Layout style={{ minHeight: '100%' }}>
        <Sider
          collapsed={this.state.sideCollapsed}
          onCollapse={this.onCollapse}
          collapsible
          style={{
            minHeight: '100vh',
            position: 'fixed',
            zIndex: 100,
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.7)',
          }}
        >
          <SideNav
            userName="admin"
            type="admin"
            pageChangeHandler={this.pageChangeHandler}
          />
        </Sider>
        <Layout style={{ minWidth: '1100px', marginLeft: 64 }}>
          <Affix>
            <Header
              style={{ padding: 0, height: 'auto', lineHeight: '46px' }}
            >
              <TopNav title={this.state.topTitle} />
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
