import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Row, Col, Pagination, Alert, Breadcrumb, Icon } from 'antd';
import styles from './MaterialInfo.css';
import ShowCard from '../components/ShowCard/ShowCard';
import InfoEditing from '../components/InfoEditing/InfoEditing';
import Detail from '../components/Detail/Detail';

class MaterialInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      detailVisible: false,     // 暂时
      detailTitle: '',
      currentPage: 1,
    };
    this.type = 'admin';
    this.pageSize = 20;
  }

  componentDidUpdate = () => {
    // if (this.hide) {
    //   setTimeout(this.hide, 800);
    // }
  };

  showDetail = ({ url, title }, e) => {
    e.preventDefault();
    this.setState({ detailTitle: title });
    // this.hide = message.loading('正在努力加载~~~', 0);
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

  // edit = (values) => {
  //
  // };

  addMaterial = (values) => {
    this.props.dispatch({
      type: 'MaterialInfo/addMaterial',
      payload: { values }
    });
  };

  modifyMaterial = (values) => {
    console.log(values);
    this.props.dispatch({
      type: 'MaterialInfo/modifyMaterial',
      payload: { values }
    });
  };

  resetReqItem = () => {
    this.props.dispatch({
      type: 'MaterialInfo/resetReqItem',
      payload: { data: {} },
    });
  };

  backToHomepage = () => {
    this.setState({ currentPage: 1 });
  };

  fetch = (e) => {
    e.preventDefault();
    this.props.dispatch({
      type: 'MaterialInfo/fetch',
      payload: {
        from: (this.pageSize * (this.state.currentPage - 1)) + 1,
        len: this.pageSize,
      },
    });
  };

  pageHandle = (page, pageSize) => {
    this.props.dispatch(routerRedux.push({
      pathname: '/admin/materialInfo',
      query: {
        from: (pageSize * (page - 1)) + 1,
        len: pageSize,
      },
    }));
    this.setState({ currentPage: page });
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
      addMsg,
      total
    } = this.props;

    const layout = items ? items.map((item, index) => {
      return (
        <Col span={5} key={index} offset={index % 4 === 0 ? 2 : 0}>
          <ShowCard
            type={this.type}
            title={item.name}
            pic={item.attach[0]}
            key={index}
            cardId={item.id}
            sta={item.sta}
            content={item.desc}
            loading={resultLoading}
            eidt={this.edit}
            detail_url={item.detail_url}   //  传入给showCard作为回调函数, 点击showCard触发回调,
            showDetail={this.showDetail}   //  dispatch请求数据, 返回改变store状态后传入更新后的reqItem给Detail去展示
          />
        </Col>
      );
    }) : <Col><Alert message={<div>没有搜索到呃, 返回<a onClick={this.fetch}> 物品列表 </a>吧</div>} type="info" showIcon /></Col>;

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
            modifyMaterial={this.modifyMaterial}
          />
        );
      }
    };

    const breadLayout = (
      <Breadcrumb style={{ marginBottom: 15 }}>
        <Breadcrumb.Item href="" onClick={this.fetch}>
          <Icon type="home" />
          <span>所有物品</span>
        </Breadcrumb.Item>
      </Breadcrumb>
    );

    return (
      <div className={styles.normal}>
        {breadLayout}
        <Row type="flex" gutter={24} justify={items ? '' : 'center'}>
          {layout}
        </Row>
        <Pagination
          total={total}
          style={{ textAlign: 'center', marginTop: '20px' }}
          current={this.state.currentPage}
          onChange={this.pageHandle}
          pageSize={this.pageSize}
        />
        {detailLayout()}
        <InfoEditing
          addMaterial={this.addMaterial}
          addLoading={addLoading}
          addCode={addCode}
          addMsg={addMsg}
          dispatch={this.props.dispatch}
          backToHomepage
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
    addMsg,
    total
  } = state.MaterialInfo;
  return {
    items,
    reqItem,
    detailLoading,
    resultLoading,
    addLoading,
    addCode,
    addMsg,
    total
  };
}

export default connect(mapStateToProps)(MaterialInfo);
