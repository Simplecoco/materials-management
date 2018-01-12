import React from 'react';
import { Modal, Icon, Carousel, List, Button, Tabs } from 'antd';
import styles from './Detail.less';
import InfoEditing from '../InfoEditing/InfoEditing';
import ApplyForm from '../ApplyForm/ApplyForm';
import { transName } from '../../utils/trans';

const { TabPane } = Tabs;

class Detail extends React.Component {
  static defaultProps = {
    reqItem: '',
  };

  getInfo = () => {
    const item = this.props.reqItem;
    return {
      mid: item.id,
      pic: item.attach[0],
      title: item.name,
      content: item.desc,
    };
  };

  handleOk = () => {
    if (this.props.reqItem.sta !== 'order') {
      this.props.addToList && this.props.addToList(this.getInfo());
    }
    this.props.changeDetailVisible(false);
  };
  handleCancel = () => {
    this.props.changeDetailVisible(false);
    this.props.resetReqItem && this.props.resetReqItem();
  };

  applyIt = () => {
    const item = this.props.reqItem;
    this.props.addToList && this.props.addToList({
      mid: item.id,
      pic: item.attach[0],
      title: item.name,
      content: item.desc,
    });

    this.props.changeDetailVisible(false);
  };

  render() {
    const { changeDetailVisible, type, reqItem, detailLoading, detailVisible } = this.props;
    const selected = [this.getInfo()];

    const extraBtn = () => {
      if (type === 'user') {
        if (reqItem.sta === 'order') {
          return (
            <Button disabled>物品已被借用</Button>
          );
        }
        if (this.props.detailAddSta === 'ok') {
          return (
            <Button disabled>物品已添加到清单</Button>
          );
        }
        return (
          <ApplyForm
            selected={selected}
            className={styles.extra}
            changeDetailVisible={changeDetailVisible}
            BtnType="default"
            BtnTitle="点击申请"
            onClick={this.applyIt}
            afterApply={this.handleCancel}
            backToHomepage={this.props.backToHomepage}
          />
        );
      }
      if (type === 'admin') {
        return (
          <InfoEditing
            showBtClassName="editButton"
            showBtTitle="编辑"
            btType="default"
            onClick={this.applyIt}
            reqItem={reqItem}
            modifyMaterial={this.props.modifyMaterial}
          />
        );
      }
    };

    const okText = ((type === 'user') && (reqItem.sta !== 'order')) ? '加入借用清单' : '确定';

    const hiddenItem = ['pic', 'qrCode', 'attach', 'count', 'snum', 'sta', 'desc'];

    const detailsLayout = () => {
      const tmp = Object.entries(reqItem).map((item, index) => {
        if (hiddenItem.indexOf(item[0]) !== -1) {
          return undefined;
        }
        return (
          <li key={index}>
            <span className={styles.itemName}>{ `${transName[item[0]] || item[0]}: ` }</span>
            <span className={styles.itemContent}>{item[1]}</span>
          </li>
        );
      });
      return tmp.filter((item) => {
        return item !== undefined;
      });
    };

    const carouselLayout = () => (
      reqItem.attach.map((item, index) => {
        return (
          <div key={`attach${index}`} className={styles.slide}>
            <img src={item} alt="" style={{ lineHeight: 0 }} className={styles.pic} />
          </div>
        );
      })
    );

    const tabLayout = (
      <Tabs defaultActiveKey="1" size="small">
        <TabPane tab="详细信息" key="1">
          <List
            size="small"
            bordered
            dataSource={detailsLayout()}
            renderItem={item => (<List.Item>{item}</List.Item>)}
            className={styles.detailList}
            style={{ maxWidth: '350px' }}
          />
        </TabPane>
        <TabPane tab="物品描述" key="2" style={{ maxHeight: 400, minHeight: 235, overflow: 'auto' }}>{reqItem.desc}</TabPane>
      </Tabs>
    );

    const finalLayout = () => {
      if (detailLoading || Object.keys(reqItem).length === 0) {
        return (
          <div className={styles.loadingContainer}>
            <Icon type="loading" style={{ fontSize: 24 }} spin />
          </div>
        );
      }
      return (
        <div className="clearfix">
          <div className={styles.leftWrap}>
            <div className={styles.picWrap}>
              <Carousel className={styles.carousel} autoplay effect="scrollx">
                {carouselLayout()}
              </Carousel>
            </div>
            <div className={styles.extraWrap}>
              {extraBtn()}
            </div>
          </div>
          {tabLayout}
        </div>
      );
    };

    return (
      <div className={styles.normal}>
        <Modal
          title={reqItem.name}
          visible={detailVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width={650}
          className={styles.modal}
          okText={okText}
        >
          {finalLayout()}
        </Modal>
      </div>
    );
  }
}

export default Detail;
