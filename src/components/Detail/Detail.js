import React from 'react';
import { Modal, Button, Icon } from 'antd';
import styles from './Detail.less';
import InfoEditing from '../InfoEditing/InfoEditing';

class Detail extends React.Component {
  static defaultProps = {
    reqItem: '',
  };

  handleOk = () => {
    this.props.changeDetailVisible(false);
  };
  handleCancel = () => {
    this.props.changeDetailVisible(false);
  };

  render() {
    const trans = {
      id: '物资编号',
      name: '名称',
      params: '参数',
      adminID: '所属者ID（管理员编号)',
      partners: '其他配件',
      state: '是否可借',
      location: '存放位置',
      keyName: '关键字',
    };

    const extraBt = this.props.type === 'user'
        ? <Button className={styles.extra}>点我申请</Button>
        : <InfoEditing showBtClassName="editButton" showBtTitle="编辑" btType="default" />;

    const okText = this.props.type === 'user' ? '加入借用清单' : '确定';

    const detailsLayout = () => {
      return Object.entries(this.props.reqItem).map((item, index) => {
        if (item[0] === 'pic' || item[0] === 'qrCode') {
          return false;
        }
        return (
          <li key={index}>
            <span className={styles.itemName}>{ `${trans[item[0]]}: ` }</span>
            <span className={styles.itemContent}>{item[1]}</span>
          </li>
        );
      });
    };
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
            <img src={this.props.reqItem.pic} alt="" className={styles.pic} />
            <img src={this.props.reqItem.qrCode} alt="" className={styles.qrCode} />
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
          title="Basic Modal"
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
