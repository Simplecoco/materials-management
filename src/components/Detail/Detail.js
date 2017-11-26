import React from 'react';
import { Modal, Button } from 'antd';
import styles from './Detail.less';

function Detail(props) {
  // const showModal = () => {
  //   this.setState({
  //     visible: true,
  //   });
  // };
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

  const detailsLayout = () => {
    return Object.entries(props.reqItem).map((item, index) => {
      if (item[0] === 'pic' || item[0] === 'qrCode') {
        return false;
      }
      return <li key={index} >{ `${item[0]}: ${item[1]}` }</li>;
    });
  };
  return (
    <div className={styles.normal}>
      <Modal
        title="Basic Modal"
        visible={props.visible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={650}
        className={styles.modal}
      >
        <div className="clearfix">
          <Button className={styles.edit} >编辑</Button>
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
