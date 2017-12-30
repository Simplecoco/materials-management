import React from 'react';
import { connect } from 'dva';
import { Layout, Affix } from 'antd';
import { routerRedux } from 'dva/router';
import SideNav from '../components/SideNav/SideNav.js';
import TopNav from '../components/TopNav/TopNav.js';

const { Sider, Header, Content } = Layout;

class User extends React.Component {
  constructor() {
    super();
    this.state = {
      sideCollapsed: true,
      topTitle: '欢迎来到物资管理系统',
      topNavIcon: 'collapse',
    };
  }

  pageChangeHandler = (arg) => {
    this.props.dispatch(routerRedux.push(arg.item.props.path));
  };

  toggle = () => {
    this.setState({
      sideCollapsed: !this.state.sideCollapsed,
    });
  };

  changeIcon = (affixed) => {
    console.log(affixed);
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
            userName="user"
            type="user"
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

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(User);
