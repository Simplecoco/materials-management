import React from 'react';
import { connect } from 'dva';
import { Carousel, notification, Icon, Row } from 'antd';
import styles from './Register.css';
import StuIdValidate from '../components/StuIdValidate/StuIdValidate';
import RegisterInfo from '../components/RegisterInfo/RegisterInfo';

class Register extends React.Component {

  constructor(props) {
    super(props);
    this.changeNext = true;
  }


  componentWillReceiveProps = (nextProps) => {
    if (nextProps.token !== '' && this.changeNext) {
      this.toNext();
      this.changeNext = false;
    }
  };

  toNext = () => {
    notification.open({
      message: 'Welcome Here !!!',
      description: '欢迎注册物资管理系统, 祝好~',
      icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />,
      duration: 1.8,
    });
    setTimeout(() => {
      this.slider.next();
    }, 1000);
  };

  stuIdValidate = ({ stuid, stupasswd }) => {
    this.props.dispatch({
      type: 'register/stuIdValidate',
      payload: {
        stuid,
        passwd: stupasswd,
      },
    });
  };

  telValidate = ({ tel }) => {
    this.props.dispatch({
      type: 'register/telValidate',
      payload: {
        tel,
        token: this.props.token,
      },
    });
  };

  register = (values) => {
    this.props.dispatch({
      type: 'register/register',
      payload: { ...values, token: this.props.token },
    });
  };

  render() {
    return (
      <div className={styles.normal}>
        <div>
          <Carousel effect="fade" ref={(c) => { this.slider = c; }} infinite={false} dots={false} >
            <div style={{ margin: 10 }}>
              <Row type="flex" justify="center" style={{ margin: '80px 0 0 -45px' }}>
                <StuIdValidate stuIdValidate={this.stuIdValidate} />
              </Row>
            </div>
            <div style={{ margin: 10 }}>
              <Row type="flex" justify="center" style={{ margin: '50px 0 0 -45px' }}>
                <RegisterInfo
                  telValidate={this.telValidate}
                  telCode={this.props.telCode}
                  dispatch={this.props.dispatch}
                  register={this.register}
                />
              </Row>
            </div>
          </Carousel>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { ...state.register };
}

export default connect(mapStateToProps)(Register);
