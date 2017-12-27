import React from 'react';
import { Form, Icon, Input, Button, Row, Col } from 'antd';
import styles from './TelValidate.css';

const FormItem = Form.Item;

class telValidate extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className={styles.telForm}>
        <FormItem>
          <Row gutter={14}>
            <Col span={18}>
              {getFieldDecorator('phone', {
                rules: [{ required: true, message: '请输入您的手机号码' }],
              })(
                <Input prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入您的手机号码" />,
              )}
            </Col>
            <Col span={6}>
              <Button type="primary" htmlType="submit">点击发送</Button>
            </Col>
          </Row>
        </FormItem>
        <FormItem>
          {getFieldDecorator('verificationCode', {
            rules: [{ required: true, message: '请输入发送至手机的验证码' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入发送至手机的验证码" />,
          )}
        </FormItem>
        <Button type="primary" htmlType="submit" className={styles.telFormButton}>
          点我验证
        </Button>
      </Form>
    );
  }
}

const WrappedTelForm = Form.create()(telValidate);

export default WrappedTelForm;
