import React from 'react';
import { connect } from 'dva';
import styles from './Test2.css';

function Test2() {
  return <div className={styles.normal}>Route Component: Test2</div>;
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Test2);
