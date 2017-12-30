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
      detailTitle: ''
    };
  }

  showDetail = ({ url, title }, e) => {
    e.preventDefault();
    this.setState({ detailTitle: title });
    this.changeDetailVisible(true);
    this.props.dispatch({
      type: 'MaterialInfo/fetchDetail',
      payload: { url },
    });
  };

  changeDetailVisible = (bool) => {
    this.setState({
      detailVisible: bool,
    });
  };

  addMaterial = (values) => {
    this.props.dispatch({
      type: 'MaterialInfo/addMaterial',
      payload: { values }
    });
  };

  resetReqItem = () => {
    this.props.dispatch({
      type: 'MaterialInfo/resetReqItem',
      payload: { data: {} },
    });
  };


//   changeEditVisible = (bool) => {
//   this.setState({
//     editVisible: bool,
//
// });
// };

  render() {
    const {
      items,
      reqItem,
      resultLoading,
      addLoading,
      detailLoading,
      addCode,
      addMsg
    } = this.props;

    const layout = items.map((item, index) => {
      return (
        <Col span={5} key={index} offset={index % 4 === 0 ? 2 : 0}>
          <ShowCard
            title={item.name}
            pic={item.pic}
            key={index}
            content={item.desc}
            loading={resultLoading}
            detail_url={item.detail_url}   //  传入给showCard作为回调函数, 点击showCard触发回调,
            showDetail={this.showDetail}   //  dispatch请求数据, 返回改变store状态后传入更新后的reqItem给Detail去展示
          />
        </Col>
      );
    });

    const detailLayout = () => {
      if (Object.keys(reqItem).length !== 0 && this.state.detailVisible) {
        return (
          <Detail
            type="admin"
            reqItem={reqItem}
            detailLoading={detailLoading}
            detailTitle={this.state.detailTitle}
            detailVisible={this.state.detailVisible}
            changeDetailVisible={this.changeDetailVisible}
            resetReqItem={this.resetReqItem}
          />
        );
      }
    };

    return (
      <div className={styles.normal}>
        <Row type="flex" gutter={24}>
          {layout}
        </Row>
        {detailLayout()}
        <InfoEditing
          addMaterial={this.addMaterial}
          addLoading={addLoading}
          addCode={addCode}
          addMsg={addMsg}
          dispatch={this.props.dispatch}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {
    items,
    reqItem,
    detailLoading,
    resultLoading,
    addLoading,
    addCode,
    addMsg
  } = state.MaterialInfo;
  return {
    items,
    reqItem,
    detailLoading,
    resultLoading,
    addLoading,
    addCode,
    addMsg
  };
}

export default connect(mapStateToProps)(MaterialInfo);
