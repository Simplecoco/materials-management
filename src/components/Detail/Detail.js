import React from 'react';
import { Modal, Button } from 'antd';
import styles from './Detail.less';
import InfoEditing from '../InfoEditing/InfoEditing';

function Detail(props) {
  // const showModal = () => {
  //   this.setState({
  //     visible: true,
  //   });
  // };
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
  const handleOk = () => {
    // this.setState({
    //   visible: false,
    // });
    props.changeDetailVisible(false);
  };
  const handleCancel = () => {
    // this.setState({
    //   visible: false,
    // });
    props.changeDetailVisible(false);
  };
  // console.log(props.reqItem);
  // const { pic, qrCode } = props.reqItem;

  const extraBt = props.type === 'user'
    ? <Button className={styles.extra}>点我申请</Button>
    : <InfoEditing showBtClassName="editButton" showBtTitle="编辑" btType="default" />;

  const okText = props.type === 'user' ? '加入借用清单' : '确定';

  const detailsLayout = () => {
    return Object.entries(props.reqItem).map((item, index) => {
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
  return (
    <div className={styles.normal}>
      <Modal
        title="Basic Modal"
        visible={props.detailVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={650}
        className={styles.modal}
        okText={okText}
      >
        <div className="clearfix">
          {extraBt}
          <div className={styles.picWrap}>
            <img src={props.reqItem.pic} alt="" className={styles.pic} />
            <img src={props.reqItem.qrCode} alt="" className={styles.qrCode} />
          </div>
          <ul className={styles.detailList}>
            {detailsLayout()}
          </ul>
        </div>
      </Modal>
    </div>
  );
}

export default Detail;
