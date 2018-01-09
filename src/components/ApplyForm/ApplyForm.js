import React from 'react';
import { Modal, Button, Input, Icon, Form, DatePicker, Tag } from 'antd';
import { connect } from 'dva';
import styles from './ApplyForm.css';
import * as cookie from '../../utils/cookie';

const { TextArea } = Input;
const FormItem = Form.Item;
const { RangePicker } = DatePicker;

class ApplyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  getMids = () => {
    if (this.props.selected) {
      return this.props.selected.map((item) => {
        return item.mid;
      });
    }
  };

  getNewApply = () => {
    this.props.dispatch({
      type: 'applyList/newApply',
    });
  };

  submitApply = (values) => {
    console.log(values, 'values');
    this.props.dispatch({
      type: 'applyList/submitApply',
      payload: {
        ...values,
        orderid: this.props.orderid,
        okCallback: this.handleOk,
      },
    });
  };

  showModal = () => {
    // this.props.changeDetailVisible && this.props.changeDetailVisible(false);
    this.getNewApply();
    this.setState({
      visible: true,
    });
  };
  handleOk = () => {
    this.setState({
      visible: false,
    });
    this.props.cancelSelected && this.props.cancelSelected();
    this.props.afterApply && this.props.afterApply();
  };
  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const rangeValue = values['range-picker'];
        const begtime = new Date(rangeValue[0].format('YYYY-MM-DD')).valueOf();
        const endtime = new Date(rangeValue[1].format('YYYY-MM-DD')).valueOf();
        console.log(begtime, endtime);
        console.log('Received values of form: ', { ...values, begtime, endtime, mids: this.getMids() });
        this.submitApply({ ...values, begtime, endtime, mids: this.getMids() });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { BtnType, BtnTitle } = this.props;
    const dateFormat = 'YYYY/MM/DD';
    const startBtn = (
      <Button type={BtnType} onClick={this.showModal} disabled={this.props.disabled || false}>
        {BtnTitle}
      </Button>
      );

    const tagLayout = () => {
      if (this.props.selected) {
        return this.props.selected.map((item) => {
          return (
            <Tag color="cyan">{item.title}</Tag>
          );
        });
      }
    };

    return (
      <div>
        {startBtn}
        <Modal
          title="填写订单"
          visible={this.state.visible}
          onOk={this.handleSubmit}
          onCancel={this.handleCancel}
          style={{ marginTop: '-35px' }}
        >
          <Form onSubmit={this.handleSubmit} className={styles.ApplyForm}>
            <FormItem className={styles.ApplyFormItem}>
              {tagLayout()}
            </FormItem>
            <FormItem className={styles.ApplyFormItem} initialValue={cookie.getCookie('uid')}>
              {getFieldDecorator('uid', {
                rules: [{ required: true, message: '请输入用户id' }],
                initialValue: cookie.getCookie('uid'),
              })(
                <Input
                  placeholder="用户id"
                  addonBefore={<span style={{ width: 56, display: 'inline-block' }}>用户id</span>}
                  prefix={<Icon type="user" />}
                  disabled
                />
              )}
            </FormItem>
            <FormItem className={styles.ApplyFormItem}>
              {getFieldDecorator('tel', {
                rules: [{ required: true, message: '请输入手机号码' }],
                initialValue: this.props.tel,
              })(
                <Input
                  placeholder="请输入手机号码"
                  addonBefore={<span style={{ width: 56, display: 'inline-block' }}>手机号码</span>}
                  prefix={<Icon type="phone" />}
                  disabled
                />
              )}
            </FormItem>
            <FormItem className={styles.ApplyFormItem}>
              {getFieldDecorator('title', {
                rules: [{ required: true, message: '请输入标题' }],
              })(
                <Input
                  placeholder="请输入标题"
                  addonBefore={<span style={{ width: 56, display: 'inline-block' }}>标题</span>}
                  prefix={<Icon type="tag-o" />}
                />
              )}
            </FormItem>
            <FormItem className={styles.ApplyFormItem} label="起始时间">
              {getFieldDecorator('range-picker', {
                rules: [{ required: true, message: '请选择借用起止时间' }],
              })(
                <RangePicker
                  format={dateFormat}
                  addonBefore="借用结束时间"
                  style={{ width: '100%' }}
                />
              )}
            </FormItem>
            <FormItem className={styles.ApplyFormItem}>
              {getFieldDecorator('reason', {
                rules: [{ required: true, message: '请输入借用原因', whitespace: true, }],
              })(
                <TextArea
                  placeholder="请输入借用原因"
                  autosize={{ minRows: 2, maxRows: 5 }}
                />
              )}
            </FormItem>
            <FormItem className={styles.ApplyFormItem}>
              {getFieldDecorator('remark', {
                rules: [{ required: true, message: '请输入备注', whitespace: true, }],
              })(
                <TextArea
                  placeholder="备注"
                  autosize={{ minRows: 2, maxRows: 5 }}
                />
              )}
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}

const WrappedNormalApplyForm = Form.create()(ApplyForm);

function mapStateToProps(state) {
  console.log(state.applyList);
  const { tel, orderid } = state.applyList;
  return { tel, orderid };
}

export default connect(mapStateToProps)(WrappedNormalApplyForm);
