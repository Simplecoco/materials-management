import React from 'react';
import { connect } from 'dva';
import { Row, Col } from 'antd';
import styles from './MaterialInfo.css';
import ShowCard from '../components/ShowCard/ShowCard';
import InfoEditing from '../components/InfoEditing/InfoEditing';

class MaterialInfo extends React.Component {
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
        <InfoEditing />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { items } = state.MaterialInfo;
  return { items };
}

export default connect(mapStateToProps)(MaterialInfo);
