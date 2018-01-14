import React from 'react';
import { Form, Icon, Input, Button, Divider } from 'antd';
import styles from './StuIdValidate.css';

const FormItem = Form.Item;

class StuIdValidate extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.stuIdValidate(values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className={styles.stuForm}>
        <FormItem style={{ textAlign: 'center', fontSize: '25px' }}>
          物资管理系统
        </FormItem>
        <Divider style={{ color: 'lightgray' }}>请验证您的身份信息</Divider>
        <FormItem>
          {getFieldDecorator('stuid', {
            rules: [{ required: true, message: '请输入您的信息门户账号' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入您的信息门户账号" />,
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('stupasswd', {
            rules: [{ required: true, message: '请输入您的信息门户密码' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入您的信息门户密码" />,
          )}
        </FormItem>
        <Button type="primary" htmlType="submit" className={styles.stuFormButton}>
          点我验证
        </Button>
      </Form>
    );
  }
}

const WrappedStuForm = Form.create()(StuIdValidate);

export default WrappedStuForm;
