import React from 'react';
import { Modal, Button, Upload, Input, Icon, Form, message, Select } from 'antd';
import styles from './InfoEditing.less';
import { transInfo } from '../../utils/trans';
import * as cookie from '../../utils/cookie';

const { TextArea } = Input;
const FormItem = Form.Item;
const Option = Select.Option;

class InfoEditing extends React.Component {
  static defaultProps = {
    showBtClassName: 'addButton',
    showBtTitle: '+',
    btType: 'primary',
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
    if (this.props.addLoading === true && nextProps.addLoading === false) {
      message.config({
        duration: 2,
        top: 45,
      });
      if (this.props.addCode !== 0) {
        // this.props.dispatch({ type: 'addLoadingChange', payload: { loading: false } });
        message.error(`添加物品失败啦! 错误信息: ${transInfo[this.props.addMsg] || this.props.addMsg}`);
        return;
      }
      message.success('添加物品成功啦!');
      setTimeout(() => {
        // console.log(this);  // this指向infoEditing
        this.resetForm();
        this.props.backToHomepage && this.props.backToHomepage();
      }, 1500);
    }
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
    if (this.props.reqItem) {
      const reqItemAttach = this.props.reqItem.attach.map((item, index) => {
        return {
          uid: index,
          status: 'done',
          url: item,
        };
      });
      this.setState({ fileList: reqItemAttach });
    }
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
  handlePreviewCancel = () => {
    this.setState({
      previewVisible: false,
    });
  };
  handlePreview = (file) => {
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
        console.log(values);
        const { name, location, price, attach, desc } = values;
        this.props.addMaterial && this.props.addMaterial(values);
        this.props.modifyMaterial && this.props.modifyMaterial({
          moddata: { name, location, price, attach, desc },
          mid: this.props.reqItem.id,
          uid: cookie.getCookie('uid'),
        });
      }
    });
  };

  normFile = (e) => {
    return e.fileList.map((item) => {
      try {
        return item.response.data;
      } catch (error) {
        return item.url;
      }
    });
  };

  // getAllTag = () => {
    // this.props.getAllTag();
  // };

  render() {
    const { showBtClassName, showBtTitle, btType, addLoading, reqItem } = this.props;
    const { previewVisible, previewImage, fileList, visible } = this.state;
    const { getFieldDecorator } = this.props.form;

    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    const tagsLayout = () => {
      return this.props.tags.map((item) => {
        return (
          <Option value={item.id} key={item.id}>{item.name}</Option>
        );
      });
    };

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
          style={{ marginTop: '-90px' }}
        >
          <div className="clearfix">
            <Form onSubmit={this.handleSubmit} className={styles.infoEditingForm}>
              <FormItem className={styles.infoEditingFormItem}>
                {getFieldDecorator('attach', {
                  rules: [{ required: true, message: '请上传物资图片' }],
                  getValueFromEvent: this.normFile,
                  initialValue: reqItem ? reqItem.attach : '',
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
                  addonBefore={<span style={{ width: 56, display: 'inline-block' }}>操作者</span>}
                  defaultValue={cookie.getCookie('uid')}
                  disabled
                />
              </FormItem>
              <FormItem className={styles.infoEditingFormItem}>
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: '请输入物资名称' }],
                  initialValue: reqItem ? reqItem.name : '',
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
                  initialValue: reqItem ? reqItem.location : '',
                })(
                  <Input
                    placeholder="请输入存放位置"
                    addonBefore={<span style={{ width: 56, display: 'inline-block' }}>存放位置</span>}
                    prefix={<Icon type="compass" />}
                  />
                )}
              </FormItem>
              <FormItem className={styles.infoEditingFormItem}>
                {getFieldDecorator('tid', {
                  rules: [{ required: true, message: '请选择物品分类标签' }],
                  initialValue: reqItem ? reqItem.tag.id : undefined,
                })(
                  <Select placeholder={reqItem ? reqItem.tag.name : '请选择物品分类标签'}>
                    {tagsLayout()}
                  </Select>
                )}
              </FormItem>
              <FormItem className={styles.infoEditingFormItem}>
                {getFieldDecorator('price', {
                  rules: [{ required: true, message: '请输入价格' }],
                  initialValue: reqItem ? reqItem.price : '',
                })(
                  <Input
                    placeholder="请输入价格"
                    addonBefore={<span style={{ width: 56, display: 'inline-block' }}>价格</span>}
                    prefix={<Icon type="pay-circle-o" />}
                  />
                )}
              </FormItem>
              <FormItem className={styles.infoEditingFormItem}>
                {getFieldDecorator('snum', {
                  rules: [{ required: true, message: '请输入snum' }],
                  initialValue: reqItem ? reqItem.snum : '',
                })(
                  <Input
                    placeholder="请输入snum"
                    addonBefore={<span style={{ width: 56, display: 'inline-block' }}>snum</span>}
                    prefix={<Icon type="tag" />}
                  />
                )}
              </FormItem>
              <FormItem className={styles.infoEditingFormItem}>
                {getFieldDecorator('manufacturer', {
                  rules: [{ required: true, message: '请输入物资所有者' }],
                  initialValue: reqItem ? reqItem.manufacturer : '',
                })(
                  <Input
                    placeholder="请输入物资所有者"
                    addonBefore={<span style={{ width: 56, display: 'inline-block' }}>所有者</span>}
                    prefix={<Icon type="user" />}
                  />
                )}
              </FormItem>
              <FormItem className={styles.infoEditingFormItem}>
                {getFieldDecorator('desc', {
                  rules: [{ required: true, message: '请输入没有空格的物资描述哦', whitespace: true, }],
                  initialValue: reqItem ? reqItem.desc : '',
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
