import React from 'react';
import { Modal, Button, Icon, Carousel } from 'antd';
import styles from './Detail.less';
import InfoEditing from '../InfoEditing/InfoEditing';
import { transName } from '../../utils/trans';

class Detail extends React.Component {
  static defaultProps = {
    reqItem: '',
  };

  handleOk = () => {
    this.props.changeDetailVisible(false);
  };
  handleCancel = () => {
    this.props.changeDetailVisible(false);
    this.props.resetReqItem();
  };

  render() {
    const extraBt = this.props.type === 'user'
        ? <Button className={styles.extra} onClick={this.test} >点我申请</Button>
        : <InfoEditing showBtClassName="editButton" showBtTitle="编辑" btType="default" />;

    const okText = this.props.type === 'user' ? '加入借用清单' : '确定';

    const detailsLayout = () => {
      return Object.entries(this.props.reqItem).map((item, index) => {
        if (item[0] === 'pic' || item[0] === 'qrCode' || item[0] === 'attach') {
          return false;
        }
        return (
          <li key={index}>
            <span className={styles.itemName}>{ `${transName[item[0]]}: ` }</span>
            <span className={styles.itemContent}>{item[1]}</span>
          </li>
        );
      });
    };

    const carouselLayout = () => (
      this.props.reqItem.attach.map((item, index) => {
        return (
          <div key={`attach${index}`} className={styles.slide}>
            <img src={item} alt="" style={{ lineHeight: 0 }} className={styles.pic} />
          </div>
        );
      })
    );

    const finalLayout = () => {
      if (this.props.detailLoading) {
        return (
          <div className={styles.loadingContainer}>
            <Icon type="loading" style={{ fontSize: 24 }} spin />
          </div>
        );
      }
      return (
        <div className="clearfix">
          {extraBt}
          <div className={styles.picWrap}>
            <Carousel className={styles.carousel} autoplay effect="scrollx">
              {carouselLayout()}
            </Carousel>
          </div>
          <ul className={styles.detailList}>
            {detailsLayout()}
          </ul>
        </div>
      );
    };

    return (
      <div className={styles.normal}>
        <Modal
          title={this.props.reqItem.name}
          visible={this.props.detailVisible}
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
