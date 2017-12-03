import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Layout, Affix } from 'antd';
import SideNav from '../components/SideNav/SideNav.js';
import TopNav from '../components/TopNav/TopNav.js';

const { Sider, Header, Content } = Layout;

class User extends React.Component {
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
    // const titles = ['物资分类', '信息管理', '物资信息管理', '用户信息管理'];
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
            userName="user"
            type="user"
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
          <Content style={{ padding: '20px', minHeight: '95%', background: 'white' }}>{this.props.children}</Content>
        </Layout>
      </Layout>
    );
  }
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(User);
