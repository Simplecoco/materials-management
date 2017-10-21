import React from 'react';
import { Modal, Button, Upload, Input, Icon } from 'antd';
import styles from './InfoEditing.css';

// function InfoEditing() {
//   return (
//     <div className={styles.normal}>
//       Component: InfoEditing
//     </div>
//   );
// }

class InfoEditing extends React.Component {
  static defaultProps = {
    fileList: [
      {
        uid: -1,
        name: 'xxx.png',
        status: 'done',
        url:
          'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
    ],
  };
  constructor(props) {
    super(props);
    this.state = { visible: false };
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };
  render() {
    const { fileList } = this.props;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div>
        <Button
          type="primary"
          onClick={this.showModal}
          className={styles.addButton}
        >
          +Add
        </Button>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Upload
            action="//jsonplaceholder.typicode.com/posts/"
            listType="picture-card"
            fileList={fileList}
          >
            {fileList.length >= 3 ? null : uploadButton}
          </Upload>
          <Input
            placeholder="Enter your userName"
            prefix={<Icon type="user" />}
            style={{ marginBottom: 10 }}
          />
          <Input
            placeholder="Enter your userName"
            prefix={<Icon type="user" />}
          />
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </div>
    );
  }
}

// ReactDOM.render(<App />, mountNode);

export default InfoEditing;
