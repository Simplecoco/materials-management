import React from 'react';
import { Form, Icon, Input, Button } from 'antd';
import styles from './Login.css';

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.login(values);
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { switchToRegister } = this.props;
    return (
      <Form onSubmit={this.handleSubmit} className={styles.loginForm}>
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: '请输入您的用户名' }],
          })(
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="请输入您的用户名" />,
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入您的密码' }],
          })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="请输入您的密码" />,
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className={styles.loginFormButton}>
            点我登录
          </Button>
          还没账号? <a onClick={switchToRegister}>点我马上注册!</a>
        </FormItem>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

export default WrappedNormalLoginForm;

// ReactDOM.render(<WrappedNormalLoginForm />, mountNode);
// <a className={styles.loginFormForgot} href="">忘记密码</a>

