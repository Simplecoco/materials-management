import React from 'react';
import { connect } from 'dva';
import { Layout, Affix } from 'antd';
import SideNav from '../components/SideNav/SideNav.js';
import TopNav from '../components/TopNav/TopNav.js';

const { Sider, Header, Content } = Layout;
// function User() {
//   return (
//     <div>
//       <TopNav />
//       <SideNav />
//     </div>
//   );
// }

class User extends React.Component {
  constructor() {
    super();
    this.state = {
      sideCollapsed: true,
      topTitle: '欢迎来到物资管理系统',
    };
  }
  onCollapse = (sideCollapsed) => {
    console.log(sideCollapsed);
    this.setState({ sideCollapsed });
  };
  render() {
    // const titles = ['物资分类', '信息管理', '物资信息管理', '用户信息管理'];
    return (
      <div>
        <Layout>
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
            <SideNav userName="user" type="user" />
          </Sider>
          <Layout style={{ minWidth: '1000px', marginLeft: 64 }}>
            <Affix>
              <Header
                style={{ padding: 0, height: 'auto', lineHeight: '46px' }}
              >
                <TopNav title={this.state.topTitle} />
              </Header>
            </Affix>
            <Content style={{ padding: '20px' }}>{this.props.children}</Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(User);
