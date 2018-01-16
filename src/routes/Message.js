import React from 'react';
import { connect } from 'dva';
import styles from './Message.css';

function Message() {
  return (
    <div className={styles.normal}>
      您还没有任何消息哦~
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Message);
