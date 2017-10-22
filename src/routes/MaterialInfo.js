import React from 'react';
import { connect } from 'dva';
import { Row, Col } from 'antd';
import styles from './MaterialInfo.css';
import ShowCard from '../components/ShowCard/ShowCard';
import InfoEditing from '../components/InfoEditing/InfoEditing';
import Detail from '../components/Detail/Detail';

class MaterialInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      detailVisible: false,     // 暂时
    };
  }

  showDetail = (url, e) => {
    e.preventDefault();
    this.props.dispatch({
      type: 'MaterialInfo/fetchDetail',
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
    const { items, reqItem } = this.props;
    const layout = items.map((item, index) => {
      return (
        <Col span={5} key={index} offset={index % 4 === 0 ? 2 : 0}>
          <ShowCard
            title={item.name}
            pic={item.pic}
            key={index}
            loading={item.loading || false}
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
        <InfoEditing />
        <Detail
          reqItem={reqItem}
          visible={this.state.detailVisible}
          changeDetailVisible={this.changeDetailVisible}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { items, reqItem } = state.MaterialInfo;
  return { items, reqItem };
}

// function mapDispatchToProps(dispatch) {
//   return {
//     dispatch,
//   };
// }

export default connect(mapStateToProps)(MaterialInfo);
