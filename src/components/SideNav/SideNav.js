import React from 'react';
import { Menu, Icon, Badge, Avatar } from 'antd';
import * as cookie from '../../utils/cookie';

import styles from './SideNav.css';

const SubMenu = Menu.SubMenu;

class SideNav extends React.Component {
  static defaultProps = {
    type: 'user',
  };
  constructor() {
    super();
    this.state = {
      openKeys: ['sub1'],
      name: 'user',
      avatar: '',
    };
  }

  componentDidMount = () => {
    this.setState({
      name: cookie.getCookie('name'),
      avatar: cookie.getCookie('avatar'),
      uid: cookie.getCookie('uid'),
    });
  };

  onOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  };

  // submenu keys of first level
  rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

  render() {
    const { pageChangeHandler, type, tags, applyCount, requestCount, overdueCount } = this.props;
    console.log(overdueCount);
    const { name } = this.state;
    const tagsLayout = () => {
      return tags.map((item) => {
        return (
          <Menu.Item key={item.id} tid={item.id} type="tag">{item.name}</Menu.Item>
        );
      });
    };

    const userLayout = () => (                                // 这里layout待处理,想通过传入数据去自动构造
      <Menu
        mode="inline"
        theme="light"
        onOpenChange={this.onOpenChange}
        onClick={pageChangeHandler}
      >
        <Menu.Item key="1" path="/user/personalInfo" disabled>
          <Icon type="user" />
          <span>{name}</span>
        </Menu.Item>
        <Menu.Item key="2" path="/user/result">
          <Icon type="appstore" />
          <span>物资借用</span>
        </Menu.Item>
        <Menu.Item key="3" path="/user/records">
          <Badge count={overdueCount} style={{ position: 'absolute', top: -20, left: -18 }} />
          <Icon type="folder" />
          <span>我的借用记录</span>
        </Menu.Item>
        <Menu.Item key="4" path="/user/message">
          <Icon type="notification" />
          <span>我的消息</span>
        </Menu.Item>
        <Menu.Item key="5" path="/user/applyList" style={{ overflow: 'visible' }}>
          <Badge count={applyCount} style={{ position: 'absolute', top: -20, left: -18 }} />
          <Icon type="shopping-cart" />
          <span>申请清单</span>
        </Menu.Item>
        <SubMenu
          key="sub2"
          title={
            <span>
              <Icon type="appstore-o" />
              <span>物资分类</span>
            </span>
          }
        >
          {tagsLayout()}
        </SubMenu>
        <Menu.Item key="logout">
          <Icon type="logout" />
          <span>退出登录</span>
        </Menu.Item>
      </Menu>
    );
    const adminLayout = () => ((
      <Menu
        mode="inline"
        theme="light"
        onOpenChange={this.onOpenChange}
        defaultOpenKeys={['sub1']}
        onClick={pageChangeHandler}
      >
        <Menu.Item key="1" path="/admin/personalInfo" disabled>
          <Icon type="user" />
          <span>{name}</span>
        </Menu.Item>
        <SubMenu
          key="sub1"
          title={
            <span>
              <Icon type="appstore" />
              <span>信息管理</span>
            </span>
          }
        >
          <Menu.Item key="2" path="/admin/materialInfo">
            物资信息管理
          </Menu.Item>
          <Menu.Item key="3" path="/admin/userInfo">
            用户信息管理
          </Menu.Item>
        </SubMenu>
        <Menu.Item key="4" path="/admin/requestList">
          <Badge count={requestCount} style={{ position: 'absolute', top: -20, left: -18 }} />
          <Icon type="notification" />
          <span>物资申请</span>
        </Menu.Item>
        <Menu.Item key="5" path="/admin/records">
          <Badge count={overdueCount} style={{ position: 'absolute', top: -20, left: -18 }} />
          <Icon type="folder" />
          <span>借用记录</span>
        </Menu.Item>
        <SubMenu
          key="sub2"
          title={
            <span>
              <Icon type="appstore-o" />
              <span>物资分类</span>
            </span>
          }
        >
          {tagsLayout()}
        </SubMenu>
        <Menu.Item key="logout">
          <Icon type="logout" />
          <span>退出登录</span>
        </Menu.Item>
      </Menu>
    ));
    return (
      <div className={styles.sideNav}>
        <div className={styles.logo}>
          <Avatar src={this.state.avatar} style={{ border: '2px solid #d9d9d9' }} size="large" />
        </div>
        {type === 'admin' ? adminLayout() : userLayout()}
      </div>
    );
  }
}

// <Menu.Item key="10">
//   <Icon type="setting" />
//   <span>设置</span>
// </Menu.Item>

export default SideNav;
