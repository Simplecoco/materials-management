import React from 'react';
import { Menu, Icon, Input, Row, Col } from 'antd';
import styles from './TopNav.css';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const Search = Input.Search;

class TopNav extends React.Component {
  constructor() {
    super();
    this.state = {
      current: 'mail',
    };
  }

  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };

  render() {
    const { title } = this.props;
    return (
      <Row type="flex" align="stretch">
        <Col span={15}>
          <Menu
            onClick={this.handleClick}
            selectedKeys={[this.state.current]}
            mode="horizontal"
            theme="dark"
            className={styles.topNav}
          >
            <Menu.Item key="mail">
              <Icon type="mail" />
              {title}
            </Menu.Item>
            <SubMenu
              title={
                <span>
                  <Icon type="setting" />选择排序规则
                </span>
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
            placeholder="请输入你想查询的物品"
          />
        </Col>
      </Row>
    );
  }
}

export default TopNav;
