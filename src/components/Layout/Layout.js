import React from 'react';
import styles from './Layout.css';

function Layout(props) {
  console.log(props);
  return <div className={styles.normal}>Component: Layout</div>;
}

export default Layout;
