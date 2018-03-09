import React from 'react';
import { Form, Icon, Input, Button, Row, Col, Divider } from 'antd';
import styles from './RegisterInfo.css';

const FormItem = Form.Item;

class RegisterInfo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      telButton: false,
      telButtonContent: '点击发送',
    };
    this.second = 60;
    this.timer = '';
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.timer === '' && nextProps.telCode === 0) {
      this.startIt();
    }
    else {
      this.setState({ telButtonContent: '点击发送', telButton: false });
    }
  };

  componentDidUpdate = () => {
    if (this.second <= 0 && this.timer !== '') {
      const timeClear = async () => {
        await clearInterval(this.timer);
        this.clearIt();
      };
      timeClear();
    }
  };

  startIt = () => {
    this.timer = setInterval(() => {
      this.setState({ second: this.second-- });
      this.setState({ telButtonContent: `请在${this.second}秒后重试`, telButton: true });
    }, 1000);
  };

  clearIt = () => {
    if (this.second <= 0) {
      this.props.dispatch({
        type: 'register/saveTelCode',
        payload: { telCode: '' },
      });
      this.setState({ telButtonContent: '点击发送', telButton: false });
      this.timer = '';
      this.second = 60;
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.register(values);
      }
    });
  };

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  telValidate = () => {
    this.props.form.validateFields(['tel'], (err, value) => {
      if (!err) {
        this.props.telValidate(value);
        this.setState({ telButtonContent: '请稍后...', telButton: true });
      }
    });
  };

  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('passwd')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className={styles.RegisterInfoForm}>
        <FormItem style={{ textAlign: 'center', fontSize: '25px' }}>
          物资管理系统
        </FormItem>
        <Divider style={{ color: 'lightgray' }}>请完善您的注册信息</Divider>
        <FormItem>
          {getFieldDecorator('name', {
            rules: [{ required: true, message: '请输入您的用户名!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入您的用户名" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('passwd', {
            rules: [{
              required: true, message: '请输入密码!',
            }, {
              validator: this.checkConfirm,
            }],
          })(
            <Input type="password" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入密码" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: '请再次输入密码!',
            }, {
              validator: this.checkPassword,
            }],
          })(
            <Input type="password" onBlur={this.handleConfirmBlur} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请再次输入密码" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('mail', {
            rules: [{
              type: 'email', message: '邮箱格式不正确哦!',
            }, {
              required: true, message: '请输入您的邮箱!',
            }],
          })(
            <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入您的邮箱" />
          )}
        </FormItem>
        <FormItem>
          <Row gutter={14}>
            <Col span={14}>
              {getFieldDecorator('tel', {
                rules: [{ required: true, message: '请输入您的手机号码' }],
              })(
                <Input prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入您的手机号码" />,
              )}
            </Col>
            <Col span={10}>
              <Button style={{ width: '100%' }} type="primary" onClick={this.telValidate} loading={this.state.telButton}>{this.state.telButtonContent}</Button>
            </Col>
          </Row>
        </FormItem>
        <FormItem>
          {getFieldDecorator('code', {
            rules: [{ required: true, message: '请输入发送至手机的验证码' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入发送至手机的验证码" />,
          )}
        </FormItem>
        <Button type="primary" htmlType="submit" className={styles.RegisterInfoFormButton}>
          点我验证
        </Button>
      </Form>
    );
  }
}

const WrappedRegisterInfoForm = Form.create()(RegisterInfo);

export default WrappedRegisterInfoForm;
