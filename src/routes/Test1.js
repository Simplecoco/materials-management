import React from 'react';
import { connect } from 'dva';
import styles from './Test1.css';

function Test1() {
  return <div className={styles.normal}>Route Component: Test1</div>;
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Test1);
