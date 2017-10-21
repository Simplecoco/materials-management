import React from 'react';
import { connect } from 'dva';
import { Row, Col } from 'antd';
import styles from './Result.css';
import ShowCard from '../components/ShowCard/ShowCard';

class Result extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    console.log(this.props);
    const { items } = this.props;
    const layout = items.map((item, index) => {
      return (
        <Col span={5} key={index} offset={index % 4 === 0 ? 2 : 0}>
          <ShowCard
            title={item.title}
            pic={item.pic}
            key={index}
            loading={item.loading || false}
          />
        </Col>
      );
    });
    return (
      <div className={styles.normal}>
        <Row type="flex" gutter={24}>
          {layout}
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { items } = state.result;
  return { items };
}

export default connect(mapStateToProps)(Result);
