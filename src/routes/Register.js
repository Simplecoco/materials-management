import React from 'react';
import { connect } from 'dva';
import styles from './Register.css';
import StuIdValidate from '../components/StuIdValidate/StuIdValidate';
import TelValidate from '../components/TelValidate/TelValidate';

function Register() {
  return (
    <div className={styles.normal}>
      <StuIdValidate />
      <TelValidate />
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Register);
