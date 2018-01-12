import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Row, Col, message, Pagination, Alert, Breadcrumb, Icon } from 'antd';
import styles from './Result.css';
import ShowCard from '../components/ShowCard/ShowCard';
import Detail from '../components/Detail/Detail';

class Result extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      detailVisible: false,
      detailTitle: '',
      currentPage: 1,
    };
    this.type = 'user';
    this.pageSize = 20;
  }

  componentDidUpdate = () => {
    if (this.hide) {
      setTimeout(this.hide, 800);
    }
  };

  pageHandle = (page, pageSize) => {
    console.log(page, pageSize);
    this.props.dispatch(routerRedux.push({
      pathname: '/user/result',
      query: {
        from: (pageSize * (page - 1)) + 1,
        len: pageSize,
      },
    }));
    this.setState({ currentPage: page });
  };

  backToHomepage = () => {
    this.props.dispatch(routerRedux.push('/user/result'));
    this.setState({ currentPage: 1 });
  };

  fetch = (e) => {
    e.preventDefault();
    this.props.dispatch({
      type: 'result/fetch',
      payload: {
        from: (this.pageSize * (this.state.currentPage - 1)) + 1,
        len: this.pageSize,
      },
    });
  };

  showDetail = ({ url, title }, e) => {
    e.preventDefault();
    this.setState({ detailTitle: title });
    this.hide = message.loading('正在努力加载~~~', 0);
    this.changeDetailVisible(true);
    this.props.dispatch({
      type: 'result/fetchDetail',
      payload: { url },
    });
  };

  changeDetailVisible = (bool) => {
    this.setState({
      detailVisible: bool,
    });
  };

  resetReqItem = () => {
    this.props.dispatch({
      type: 'result/resetReqItem',
      payload: { data: {} },
    });
  };

  addToList = ({ mid, pic, title, content }) => {
    this.props.dispatch({
      type: 'applyList/addToList',
      payload: { mid, pic, title, content },
    });
  };

  render() {
    const { items, reqItem, detailLoading, resultLoading, total } = this.props;
    console.log(items);
    const layout = items ? items.map((item, index) => {
      return (
        <Col span={5} key={index} offset={index % 4 === 0 ? 2 : 0}>
          <ShowCard
            type={this.type}
            title={item.name}
            pic={item.attach[0]}
            key={index}
            mid={item.id}
            sta={item.sta}
            content={item.desc}
            loading={resultLoading}
            addToList={this.addToList}
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
            type="user"
            reqItem={reqItem}
            detailLoading={detailLoading}
            detailTitle={this.state.detailTitle}
            detailVisible={this.state.detailVisible}
            changeDetailVisible={this.changeDetailVisible}
            resetReqItem={this.resetReqItem}
            addToList={this.addToList}
            backToHomepage={this.backToHomepage}
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
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { items, reqItem, detailLoading, resultLoading, total } = state.result;
  return { items, reqItem, detailLoading, resultLoading, total };
}

export default connect(mapStateToProps)(Result);
