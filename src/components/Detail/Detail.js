import React from 'react';
import { Modal, Icon, Carousel, List, Button } from 'antd';
import styles from './Detail.less';
import InfoEditing from '../InfoEditing/InfoEditing';
import ApplyForm from '../ApplyForm/ApplyForm';
import { transName } from '../../utils/trans';

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
      this.props.addToList(this.getInfo());
    }
    this.props.changeDetailVisible(false);
  };
  handleCancel = () => {
    this.props.changeDetailVisible(false);
    this.props.resetReqItem();
  };

  applyIt = () => {
    const item = this.props.reqItem;
    this.props.addToList({
      mid: item.id,
      pic: item.attach[0],
      title: item.name,
      content: item.desc,
    });

    this.props.changeDetailVisible(false);
  };

  render() {
    console.log(this.props.reqItem);
    const { changeDetailVisible, type, reqItem, detailLoading, detailVisible } = this.props;
    const selected = [this.getInfo()];
    // const startBtn = (
    //   <Button type="default" onClick={this.showModal}>
    //     点我直接申请
    //   </Button>
    // );

    const extraBtn = () => {
      if (reqItem.sta === 'order') {
        return (
          <Button disabled>物品已被借用</Button>
        );
      }
      if (type === 'user') {
        return (
          <ApplyForm
            selected={selected}
            className={styles.extra}
            changeDetailVisible={changeDetailVisible}
            BtnType="default"
            BtnTitle="点击申请"
          />
        );
      }
      if (type === 'admin') {
        return (
          <InfoEditing showBtClassName="editButton" showBtTitle="编辑" btType="default" onClick={this.applyIt} />
        );
      }
    };

    const okText = ((type === 'user') && (reqItem.sta !== 'order')) ? '加入借用清单' : '确定';

    const hiddenItem = ['pic', 'qrCode', 'attach', 'count', 'snum', 'sta'];

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
          <List
            size="small"
            bordered
            dataSource={detailsLayout()}
            renderItem={item => (<List.Item>{item}</List.Item>)}
            className={styles.detailList}
            style={{ maxWidth: '350px' }}
          />

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
