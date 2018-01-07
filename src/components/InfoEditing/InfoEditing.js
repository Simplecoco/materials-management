import React from 'react';
import { Modal, Button, Upload, Input, Icon, Form, message } from 'antd';
import styles from './InfoEditing.less';
import { transInfo } from '../../utils/trans';

const { TextArea } = Input;
const FormItem = Form.Item;

class InfoEditing extends React.Component {
  static defaultProps = {
    showBtClassName: 'addButton',
    showBtTitle: '+Add',
    btType: 'primary',
    Operator: 'xxxxx',
  };
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      previewVisible: false,
      previewImage: '',
      fileList: [],
    };
  }

  componentWillReceiveProps = (nextProps) => {
    message.config({
      duration: 2,
      top: 45,
    });
    if (this.props.addLoading === true && nextProps.addLoading === false) {
      console.log(this.props.addCode);
      if (this.props.addCode !== 0) {
        // this.props.dispatch({ type: 'addLoadingChange', payload: { loading: false } });
        message.error(`添加物品失败啦! 错误信息: ${transInfo[this.props.addMsg] || this.props.addMsg}`);
        return;
      }
      message.success('添加物品成功啦!');
      setTimeout(() => {
        console.log(this);  // this指向infoEditing
        this.resetForm();
        this.props.backToHomepage && this.props.backToHomepage();
      }, 1500);
    }
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  resetForm = () => {
    this.props.form.resetFields();
    this.setState({
      visible: false,
      fileList: [],
    });
  };
  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };
  handlePreviewCancel = (e) => {
    console.log(e);
    this.setState({
      previewVisible: false,
    });
  };
  handlePreview = (file) => {
    console.log(this.state.fileList);
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  };

  handleChange = ({ fileList }) => this.setState({ fileList });

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.addMaterial(values);
      }
    });
  };

  normFile = (e) => {
    console.log('Upload event:', e);
    return e.fileList.map((item) => {
      console.log(item);
      try {
        return item.response.data;
      } catch (error) {
        return '';
      }
    });
  };

  render() {
    const { showBtClassName, showBtTitle, btType, Operator, addLoading } = this.props;
    const { previewVisible, previewImage, fileList, visible } = this.state;
    const { getFieldDecorator } = this.props.form;

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
          visible={visible}
          onOk={this.handleSubmit}
          onCancel={this.handleCancel}
          confirmLoading={addLoading}
          style={{ marginTop: '-50px' }}
        >
          <div className="clearfix">
            <Form onSubmit={this.handleSubmit} className={styles.infoEditingForm}>
              <FormItem className={styles.infoEditingFormItem}>
                {getFieldDecorator('attach', {
                  rules: [{ required: true, message: '请上传物资图片' }],
                  getValueFromEvent: this.normFile,
                })(
                  <Upload
                    action="http://cdn.stuhome.com/upload/"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                  >
                    {fileList.length >= 3 ? null : uploadButton}
                  </Upload>,
                )}
                <Modal visible={previewVisible} footer={null} onCancel={this.handlePreviewCancel}>
                  <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
              </FormItem>
              <FormItem className={styles.infoEditingFormItem}>
                <Input
                  placeholder="操作者名称"
                  prefix={<Icon type="user" />}
                  addonBefore="操作者"
                  defaultValue={Operator}
                  disabled
                />
              </FormItem>
              <FormItem className={styles.infoEditingFormItem}>
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: '请输入物资名称' }],
                })(
                  <Input
                    placeholder="请输入物资名称"
                    addonBefore="物资名称"
                    prefix={<Icon type="tag" />}
                  />
                )}
              </FormItem>
              <FormItem className={styles.infoEditingFormItem}>
                {getFieldDecorator('location', {
                  rules: [{ required: true, message: '请输入存放位置' }],
                })(
                  <Input
                    placeholder="请输入存放位置"
                    addonBefore="存放位置"
                    prefix={<Icon type="compass" />}
                  />
                )}
              </FormItem>
              <FormItem className={styles.infoEditingFormItem}>
                {getFieldDecorator('price', {
                  rules: [{ required: true, message: '请输入价格' }],
                })(
                  <Input
                    placeholder="请输入价格"
                    addonBefore="价格"
                    prefix={<Icon type="pay-circle-o" />}
                  />
                )}
              </FormItem>
              <FormItem className={styles.infoEditingFormItem}>
                {getFieldDecorator('snum', {
                  rules: [{ required: true, message: '请输入snum' }],
                })(
                  <Input
                    placeholder="请输入snum"
                    addonBefore="snum"
                    prefix={<Icon type="tag" />}
                  />
                )}
              </FormItem>
              <FormItem className={styles.infoEditingFormItem}>
                {getFieldDecorator('manufacturer', {
                  rules: [{ required: true, message: '请输入物资所有者' }],
                })(
                  <Input
                    placeholder="请输入物资所有者"
                    addonBefore="所有者"
                    prefix={<Icon type="user" />}
                  />
                )}
              </FormItem>
              <FormItem className={styles.infoEditingFormItem}>
                {getFieldDecorator('desc', {
                  rules: [{ required: true, message: '请输入没有空格的物资描述哦', whitespace: true, }],
                })(
                  <TextArea
                    placeholder="请输入详细物资描述"
                    autosize={{ minRows: 2, maxRows: 5 }}
                  />
                )}
              </FormItem>
            </Form>
          </div>
        </Modal>
      </div>
    );
  }
}

// {
//   <FormItem className={styles.infoEditingFormItem}>
//     {getFieldDecorator('amount', {
//       rules: [{ required: true, message: '请输入物资数量' }],
//     })(
//       <Input
//         placeholder="请输入物资数量"
//         addonBefore="物资数量"
//         prefix={<Icon type="bar-chart" />}
//       />
//     )}
//   </FormItem>
// }


const WrappedNormalInfoEditingForm = Form.create()(InfoEditing);

export default WrappedNormalInfoEditingForm;
