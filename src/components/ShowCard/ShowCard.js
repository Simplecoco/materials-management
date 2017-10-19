import React from 'react';
import { Card } from 'antd';
import styles from './ShowCard.css';

function ShowCard(props) {
  return (
    <Card
      loading={props.loading}
      title={props.title}
      style={{ width: '100%', margin: '0 1em 2em 0' }}
      bodyStyle={{ padding: 0 }}
      key={props.index}
    >
      <div className={styles.cardPic}>
        <a href="/">
          <img alt="example" width="100%" src={props.pic} />
        </a>
      </div>
      <div className={styles.cardContent}>
        <p>{props.content || 'content'}</p>
      </div>
    </Card>
  );
}

export default ShowCard;
