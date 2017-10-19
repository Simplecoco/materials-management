import React from 'react';
import { Menu, Icon } from 'antd';
import styles from './SideNav.css';

const SubMenu = Menu.SubMenu;

class SideNav extends React.Component {
  static defaultProps = {
    userName: 'admin',
  };
  constructor() {
    super();
    this.state = {
      openKeys: ['sub1'],
    };
  }
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
    const { pageChangeHandler, userName, type } = this.props;
    const userLayout = () => (                                // 这里layout待处理,想通过传入数据去自动构造
      <Menu mode="inline" theme="dark" onOpenChange={this.onOpenChange}>
        <Menu.Item key="1">
          <Icon type="user" />
          <span>{userName}</span>
        </Menu.Item>
        <SubMenu
          key="sub1"
          title={
            <span>
              <Icon type="mail" />
              <span>我的借用记录</span>
            </span>
          }
        >
          <Menu.Item key="2">Option 2</Menu.Item>
          <Menu.Item key="3">Option 3</Menu.Item>
          <Menu.Item key="4">Option 4</Menu.Item>
          <Menu.Item key="5">Option 5</Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub2"
          title={
            <span>
              <Icon type="appstore" />
              <span>我的申请</span>
            </span>
          }
        >
          <Menu.Item key="6">Option 6</Menu.Item>
          <Menu.Item key="7">Option 7</Menu.Item>
          <SubMenu key="sub3" title="Submenu">
            <Menu.Item key="8">Option 8</Menu.Item>
            <Menu.Item key="9">Option 9</Menu.Item>
          </SubMenu>
        </SubMenu>
        <SubMenu
          key="sub4"
          title={
            <span>
              <Icon type="setting" />
              <span>设置</span>
            </span>
          }
        >
          <Menu.Item key="10">Option 10</Menu.Item>
          <Menu.Item key="11">Option 11</Menu.Item>
          <Menu.Item key="12">Option 12</Menu.Item>
          <Menu.Item key="13">Option 13</Menu.Item>
        </SubMenu>
      </Menu>
    );
    const adminLayout = () => ((
      <Menu
        mode="inline"
        theme="dark"
        onOpenChange={this.onOpenChange}
        onClick={pageChangeHandler}
      >
        <Menu.Item key="1">
          <Icon type="user" />
          <span>{userName}</span>
        </Menu.Item>
        <SubMenu
          key="sub1"
          title={
            <span>
              <Icon type="mail" />
              <span>物资分类</span>
            </span>
          }
        >
          <Menu.Item key="2">Option 2</Menu.Item>
          <Menu.Item key="3">Option 3</Menu.Item>
          <SubMenu key="sub2" title="Submenu">
            <Menu.Item key="4">Option 4</Menu.Item>
            <Menu.Item key="5">Option 5</Menu.Item>
          </SubMenu>
        </SubMenu>
        <SubMenu
          key="sub3"
          title={
            <span>
              <Icon type="appstore" />
              <span>信息管理</span>
            </span>
          }
        >
          <Menu.Item key="6" path="/admin/materialInfo">
            物资信息管理
          </Menu.Item>
          <Menu.Item key="7" path="/admin/userInfo">
            用户信息管理
          </Menu.Item>
        </SubMenu>
        <Menu.Item key="8">
          <Icon type="notification" />
          <span>物资申请</span>
        </Menu.Item>
        <SubMenu
          key="sub4"
          title={
            <span>
              <Icon type="setting" />
              <span>设置</span>
            </span>
          }
        >
          <Menu.Item key="9">Option 9</Menu.Item>
          <Menu.Item key="10">Option 10</Menu.Item>
          <Menu.Item key="11">Option 11</Menu.Item>
        </SubMenu>
      </Menu>
    ));
    return (
      <div className={styles.sideNav}>
        <div className={styles.logo}>LOGO</div>
        {type === 'admin' ? adminLayout() : userLayout()}
      </div>
    );
  }
}

// ReactDOM.render(<Sider />, mountNode);

// const mapStateToProps = (state) => {
//   return {};
// };

// export default connect(mapStateToProps)(SideNav);
export default SideNav;
