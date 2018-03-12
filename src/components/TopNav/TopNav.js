import React from 'react';
import { Menu, Icon, Input, Row, Col, BackTop } from 'antd';
import styles from './TopNav.css';

const SubMenu = Menu.SubMenu;
const Search = Input.Search;

class TopNav extends React.Component {

  render() {
    const { title, sideCollapsed, sideToggle, topNavIcon, tags, pageChangeHandler } = this.props;
    const tagsLayout = () => {
      return tags.map((item) => {
        return (
          <Menu.Item key={item.id} tid={item.id} type="tag">{item.name}</Menu.Item>
        );
      });
    };
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
            onClick={pageChangeHandler}
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
                  <span>请选择物品分类</span>
                </div>
              }
            >
              {tagsLayout()}
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
