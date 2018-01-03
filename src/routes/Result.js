import React from 'react';
import { connect } from 'dva';
import { Row, Col, message, Pagination } from 'antd';
import styles from './Result.css';
import ShowCard from '../components/ShowCard/ShowCard';
import Detail from '../components/Detail/Detail';

class Result extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      detailVisible: false,
      detailTitle: '',
    };
    this.type = 'user';
  }

  componentDidUpdate = () => {
    if (this.hide) {
      setTimeout(this.hide, 800);
    }
  };

  pageHandle = (page, pageSize) => {
    console.log(page, pageSize);
    this.props.dispatch({
      type: 'result/fetch',
      payload: {
        from: (pageSize * (page - 1)) + 1,
        len: pageSize,
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
    // console.log(props);
    this.props.dispatch({
      type: 'applyList/addToList',
      payload: { mid, pic, title, content },
    });
  };

  render() {
    const { items, reqItem, detailLoading, resultLoading } = this.props;
    const layout = items.map((item, index) => {
      return (
        <Col span={5} key={index} offset={index % 4 === 0 ? 2 : 0}>
          <ShowCard
            type={this.type}
            title={item.name}
            pic={item.attach[0]}
            key={index}
            mid={item.id}
            content={item.desc}
            loading={resultLoading}
            addToList={this.addToList}
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
            type="user"
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
        <Pagination
          total={40}
          style={{ textAlign: 'center' }}
          current={1}
          onChange={this.pageHandle}
          pageSize={20}
          hideOnSinglePage={true}
        />
        {detailLayout()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { items, reqItem, detailLoading, resultLoading } = state.result;
  return { items, reqItem, detailLoading, resultLoading };
}

export default connect(mapStateToProps)(Result);
