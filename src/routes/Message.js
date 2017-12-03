import React from 'react';
import { connect } from 'dva';
import styles from './Message.css';

function Message() {
  return (
    <div className={styles.normal}>
      Route Component: Message
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Message);
