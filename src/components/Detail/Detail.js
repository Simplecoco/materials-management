import React from 'react';
import { Modal } from 'antd';
import styles from './Detail.css';

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

  const detailsLayout = () => {
    return Object.entries(props.reqItem).map((item, index) => {
      return <p key={index} >{ `${item[0]}: ${item[1]}` }</p>;
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
      >
        {detailsLayout()}
      </Modal>
    </div>
  );
}

export default Detail;
