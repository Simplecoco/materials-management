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
      sideCollapsed: false,
      topTitle: '欢迎来到物资管理系统',
      topNavIcon: 'collapse',
    };
  }

  searchHandle = (key) => {
    this.props.dispatch({
      type: 'result/searchMaterial',
      payload: { key }
    });
  };

  logout = () => {
    this.props.dispatch({
      type: 'login/logout',
      payload: {},
    });
  };

  pageChangeHandler = ({ item, key }) => {
    if (item.props.type === 'tag') {
      this.props.dispatch(routerRedux.push('/user/result'));
      this.props.dispatch({
        type: 'result/fetchTagsMaterial',
        payload: { tid: item.props.tid }
      });
      return;
    }
    if (item.props.path) {
      this.props.dispatch(routerRedux.push(item.props.path));
      return;
    }
    if (key === 'logout') {
      this.logout();
    }
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
    const { tags } = this.props;
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
            applyCount={this.props.applyCount}
            tags={tags}
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
                pageChangeHandler={this.pageChangeHandler}
                tags={tags}
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

// function mapStateToProps() {
//   return {};
// }
const mapStateToProps = (state) => {
  const { tags } = state.result;
  const { applyListMid } = state.applyList;
  const applyCount = applyListMid.length;
  return { applyCount, tags };
};

export default connect(mapStateToProps)(User);
