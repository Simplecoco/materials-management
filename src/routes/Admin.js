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
      sideCollapsed: false,
      topTitle: '欢迎来到物资管理系统',
      topNavIcon: 'collapse',
    };
  }

  componentDidMount = () => {
    this.props.dispatch({ type: 'requestList/fetch' });
    // this.props.dispatch({ type: 'requestList/fetch' });
  };

  searchHandle = (key) => {
    this.props.dispatch({
      type: 'MaterialInfo/searchMaterial',
      payload: { key }
    });
  };

  pageChangeHandler = ({ item, key }) => {
    if (item.props.type === 'tag') {
      this.props.dispatch(routerRedux.push('/admin/materialInfo'));
      this.props.dispatch({
        type: 'MaterialInfo/fetchTagsMaterial',
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

  logout = () => {
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
    const { tags, requestCount, overdueCount } = this.props;
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
            requestCount={requestCount}
            overdueCount={overdueCount}
            pageChangeHandler={this.pageChangeHandler}
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

function mapStateToProps(state) {
  const { tags } = state.MaterialInfo;
  const { to, overdue } = state.requestList;
  const requestCount = to ? to.length : 0;
  const overdueCount = overdue ? overdue.length : 0;
  return { tags, requestCount, overdueCount };
}

// function mapDispatchToProps(dispatch) {
//   return {
//     dispatch, // 为什么要显示传入dispatch, 这就十分僵硬了。。。。。
//   };
// }

export default connect(mapStateToProps)(Admin);
// export default Admin;
