import React from 'react';
import { connect } from 'dva';
import { Row, Col } from 'antd';
import styles from './Result.css';
import ShowCard from '../components/ShowCard/ShowCard';
import Detail from '../components/Detail/Detail';

class Result extends React.Component {

  showDetail = (url, e) => {
    e.preventDefault();
    // this.setState({detailLoading: true});
    this.props.dispatch({
      type: 'result/fetchDetail',
      payload: { url },
    });
    this.changeDetailVisible(true);
  };

  changeDetailVisible = (bool) => {
    this.setState({
      detailVisible: bool,
    });       // 暂时
  };

  render() {
    const { items, reqItem, detailLoading, resultLoading } = this.props;
    const layout = items.map((item, index) => {
      return (
        <Col span={5} key={index} offset={index % 4 === 0 ? 2 : 0}>
          <ShowCard
            title={item.name}
            pic={item.pic}
            key={index}
            loading={resultLoading}
            detail_url={item.detail_url}   //  传入给showCard作为回调函数, 点击showCard触发回调,
            showDetail={this.showDetail}   //  dispatch请求数据, 返回改变store状态后传入更新后的reqItem给Detail去展示
          />
        </Col>
      );
    });
    return (
      <div className={styles.normal}>
        <Row type="flex" gutter={24}>
          {layout}
        </Row>
        <Detail
          type="user"
          reqItem={reqItem}
          detailLoading={detailLoading}
          detailVisible={this.state.detailVisible}
          changeDetailVisible={this.changeDetailVisible}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { items, reqItem, detailLoading, resultLoading } = state.result;
  return { items, reqItem, detailLoading, resultLoading };
}

export default connect(mapStateToProps)(Result);
