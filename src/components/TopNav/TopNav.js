import React from 'react';
import { Menu, Icon, Input, Row, Col, BackTop } from 'antd';
import styles from './TopNav.css';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const Search = Input.Search;

class TopNav extends React.Component {

  render() {
    const { title, sideCollapsed, sideToggle, topNavIcon } = this.props;
    const iconLayout = () => {
      if (topNavIcon === 'goTop') {
        return (
          <BackTop
            style={{ position: 'static', height: 'auto', width: 'auto' }}
            visibilityHeight={0}
          >
            <Icon type="to-top" style={{ lineHeight: '64px', fontSize: '20px', padding: '0 24px' }} />
          </BackTop>
        );
      }
      if (topNavIcon === 'collapse') {
        return (
          <Icon
            className={styles.trigger}
            type={sideCollapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={sideToggle}
            style={{ fontSize: '20px' }}
          />
        );
      }
    };

    return (
      <Row type="flex" align="stretch">
        <Col span={15}>
          <Menu
            onClick={this.handleClick}
            mode="horizontal"
            theme="light"
            className={styles.topNav}
            selectable={false}
          >
            <Menu.Item key="trigger">
              {iconLayout()}
            </Menu.Item>
            <Menu.Item key="mail">
              <div style={{ fontSize: '20px' }}>
                <Icon type="mail" style={{ lineHeight: '64px' }} />
                <span>
                  {title}
                </span>
              </div>
            </Menu.Item>
            <SubMenu
              title={
                <div style={{ fontSize: '14px' }}>
                  <Icon type="setting" style={{ lineHeight: '64px' }} />
                  <span>选择排序规则</span>
                </div>
              }
            >
              <MenuItemGroup title="Item 1">
                <Menu.Item key="setting:1">Option 1</Menu.Item>
                <Menu.Item key="setting:2">Option 2</Menu.Item>
              </MenuItemGroup>
              <MenuItemGroup title="Item 2">
                <Menu.Item key="setting:3">Option 3</Menu.Item>
                <Menu.Item key="setting:4">Option 4</Menu.Item>
              </MenuItemGroup>
            </SubMenu>
          </Menu>
        </Col>
        <Col span={9}>
          <Search
            style={{ lineHeight: 'none', width: '90%' }}
            size="large"
            onSearch={this.props.searchHandle}
            placeholder="请输入你想查询的物品"
          />
        </Col>
      </Row>
    );
  }
}

export default TopNav;
