import React from 'react';
import { connect } from 'dva';
import styles from './Records.css';

function Records() {
  return (
    <div className={styles.normal}>
      Route Component: Records
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Records);
