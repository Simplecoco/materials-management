import React from 'react';
import { Modal, Button, Upload, Input, Icon } from 'antd';
import styles from './InfoEditing.less';

const { TextArea } = Input;

class InfoEditing extends React.Component {
  static defaultProps = {
    showBtClassName: 'addButton',
    showBtTitle: '+add',
    btType: 'primary',
    Operator: 'xxxxx',
  };
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      previewVisible: false,
      previewImage: '',
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
  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  };

  handleChange = ({ fileList }) => this.setState({ fileList });

  render() {
    const { showBtClassName, showBtTitle, btType, Operator } = this.props;
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className={styles.infoEditing}>
        <Button
          type={btType}
          onClick={this.showModal}
          className={styles[showBtClassName]}
        >
          {showBtTitle}
        </Button>
        <Modal
          title="添加物品"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <div className="clearfix">
            <Upload
              action="//jsonplaceholder.typicode.com/posts/"
              listType="picture-card"
              fileList={fileList}
              onPreview={this.handlePreview}
              onChange={this.handleChange}
            >
              {fileList.length >= 3 ? null : uploadButton}
            </Upload>
            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
              <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
          </div>
          <Input
            placeholder="操作者名称"
            prefix={<Icon type="user" />}
            addonBefore="操作者"
            style={{ marginBottom: 10 }}
            defaultValue={Operator}
            disabled
          />
          <Input
            placeholder="请输入物资名称"
            addonBefore="物资名称"
            style={{ marginBottom: 10 }}
            prefix={<Icon type="tag" />}
          />
          <Input
            placeholder="请输入物资所有者"
            addonBefore="所有者"
            style={{ marginBottom: 10 }}
            prefix={<Icon type="user" />}
          />
          <Input
            placeholder="请输入物资数量"
            addonBefore="物资数量"
            style={{ marginBottom: 10 }}
            prefix={<Icon type="bar-chart" />}
          />
          <TextArea
            placeholder="请输入详细物资描述"
            style={{ marginBottom: 10 }}
            autosize={{ minRows: 2, maxRows: 5 }}
          />
        </Modal>
      </div>
    );
  }
}

export default InfoEditing;
