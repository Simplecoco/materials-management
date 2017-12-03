import React from 'react';
import { connect } from 'dva';
import styles from './PersonalInfo.css';

function PersonalInfo() {
  return (
    <div className={styles.normal}>
      Route Component: PersonalInfo
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(PersonalInfo);
