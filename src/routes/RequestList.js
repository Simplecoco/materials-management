import React from 'react';
import { connect } from 'dva';
import { Table, Popover, Button, Popconfirm, Tabs, Icon, Modal, Input, List, Collapse, Tag, Divider } from 'antd';
import { fetchOrderDetail } from '../services/admin';
import { transName, transValue, transColor } from '../utils/trans';
// import styles from './RequestList.css';

const { TabPane } = Tabs;
const { TextArea } = Input;
const { Panel } = Collapse;

class RequestList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nowData: '',
      modalVisible: false,
      reason: '',
      iconLoading: false,
    };
  }

  setReason = (e) => {
    this.setState({ reason: e.target.value });
  };

  showModal = () => {
    this.setState({
      modalVisible: true,
    });
  };

  handleOk = () => {
    this.props.dispatch({
      type: 'requestList/review',
      payload: {
        orderid: this.state.orderid,
        pass: this.state.pass,
        reply: this.state.reason,
      }
    });
    this.setState({
      reason: '',
      modalVisible: false,
    });
  };

  handleCancel = () => {
    this.setState({
      reason: '',
      modalVisible: false,
    });
  };

  visibleChange = async (orderid, visible) => {
    if (visible === true) {
      const { data } = await fetchOrderDetail({ orderid });
      setTimeout(() => {
        this.setState({ nowData: data });
      }, 300);
    }
    if (visible === false) {
      this.setState({ nowData: '' });
    }
  };

  reviewIt = ({ orderid, pass }) => {
    this.setState({ orderid, pass });
    this.showModal();
  };

  refresh = () => {
    this.setState({ iconLoading: true });
    this.props.dispatch({ type: 'requestList/fetch', payload: {} });
    setTimeout(() => {
      this.setState({ iconLoading: false });
    }, 1500);
  };

  render() {
    const { to, done, mine, type } = this.props;
    const adminColumns = [
      {
        title: '订单号',
        dataIndex: 'orderid',
        key: 'orderid',
      },
      {
        title: '标题',
        dataIndex: 'title',
        key: 'title',
      },
      {
        title: '申请人',
        dataIndex: 'username',
        key: 'username',
      },
      {
        title: '申请日期',
        dataIndex: 'addtime',
        key: 'addtime',
      },
      {
        title: '状态',
        dataIndex: 'sta',
        key: 'sta',
        render: text => (
          <Tag color={transColor[text] || 'darkgray'}>{transValue[text] || text}</Tag>
        ),
      },
      {
        title: '操作',
        key: 'action',
        render: (record) => {
          const hiddenItem = ['mids', 'attach', 'r1', 'r2', 'remark', 'content'];
          const { r1, r2, remark, content: reason, mids } = this.state.nowData;
          const tmpDetailsArr = Object.entries(this.state.nowData).map((item, index) => {
            if (hiddenItem.indexOf(item[0]) === -1) {
              return (
                <li key={index}>
                  <span style={{ color: '#314659', fontWeight: 500 }}>{ `${transName[item[0]] || item[0]}: ` }</span>
                  <span>{`${transValue[item[1]] || item[1]}` }</span>
                </li>
              );
            }
            return false;
          });
          const tmpDetails = tmpDetailsArr.filter((item) => {
            return item;
          });
          const detailItems = (
            <List
              size="small"
              bordered
              dataSource={tmpDetails}
              renderItem={item => (<List.Item>{item}</List.Item>)}
              style={{ maxWidth: '350px' }}
            />
          );
          const otherItems = (
            <Collapse accordion>
              <Panel header="借用原因" key="1">
                <p>{reason}</p>
              </Panel>
              <Panel header="一级管理员回复" key="2">
                <p>{r1}</p>
              </Panel>
              <Panel header="二级管理员回复" key="3">
                <p>{r2}</p>
              </Panel>
              <Panel header="备注" key="4">
                <p>{remark}</p>
              </Panel>
            </Collapse>
          );
          const materialItems = (
            <List
              itemLayout="vertical"
              size="large"
              dataSource={mids}
              renderItem={item => (
                <List.Item
                  key={item.id}
                  extra={<img width={100} alt="logo" src={item.attach[0]} />}
                >
                  <List.Item.Meta
                    title={<a href={item.detail_url}>{item.name}</a>}
                    description={
                      <Tag color={transColor[item.sta] || '#d9d9d9'}>
                        {transValue[item.sta] || item.sta}
                      </Tag>
                    }
                  />
                  {item.desc}
                </List.Item>
              )}
            />
          );

          const details = this.state.nowData !== ''
            ? detailItems
            : <div style={{ textAlign: 'center' }}><Icon type="star" style={{ fontSize: 18 }} spin={true} /></div>;

          const others = this.state.nowData !== ''
            ? otherItems
            : <div style={{ textAlign: 'center' }}><Icon type="star" style={{ fontSize: 18 }} spin={true} /></div>;

          const materials = this.state.nowData !== ''
            ? materialItems
            : <div style={{ textAlign: 'center' }}><Icon type="star" style={{ fontSize: 18 }} spin={true} /></div>;

          const content = (
            <Tabs defaultActiveKey="1" size="small">
              <TabPane tab="详细信息" key="1" style={{ maxHeight: 350, overflow: 'auto' }}>{details}</TabPane>
              <TabPane tab="其他详情" key="2" style={{ maxHeight: 350, overflow: 'auto' }}>{others}</TabPane>
              <TabPane tab="物品详情" key="3" style={{ maxHeight: 350, overflow: 'auto' }}>{materials}</TabPane>
            </Tabs>
          );

          return (
            <div>
              <Popover
                placement="leftBottom"
                content={content}
                trigger="click"
                overlayStyle={{ width: 390 }}
                onVisibleChange={(visible) => { this.visibleChange(record.orderid, visible); }}
              >
                <Button type="primary">查看详细信息</Button>
              </Popover>
              <span className="ant-divider" />
              <Popconfirm title="确认同意？" okText="是" cancelText="否" placement="topRight" onConfirm={() => { this.reviewIt({ ...record, pass: 'yes' }); }}>
                <Button>同意</Button>
              </Popconfirm>
              <span className="ant-divider" />
              <Popconfirm title="确认不同意？" okText="是" cancelText="否" placement="topRight" onConfirm={() => { this.reviewIt({ ...record, pass: 'no' }); }}>
                <Button type="danger">不同意</Button>
              </Popconfirm>
            </div>
          );
        },
      },
    ];
    const userColumns = [
      {
        title: '订单号',
        dataIndex: 'orderid',
        key: 'orderid',
      },
      {
        title: '标题',
        dataIndex: 'title',
        key: 'title',
      },
      {
        title: '申请人',
        dataIndex: 'username',
        key: 'username',
      },
      {
        title: '申请日期',
        dataIndex: 'addtime',
        key: 'addtime',
      },
      {
        title: '状态',
        dataIndex: 'sta',
        key: 'sta',
        render: text => (
          <Tag color={transColor[text] || '#d9d9d9'}>{transValue[text] || text}</Tag>
        ),
      },
      {
        title: '操作',
        key: 'action',
        render: (record) => {
          const hiddenItem = ['mids', 'attach', 'r1', 'r2', 'remark', 'content'];
          const { r1, r2, remark, content: reason, mids } = this.state.nowData;
          const tmpDetailsArr = Object.entries(this.state.nowData).map((item, index) => {
            if (hiddenItem.indexOf(item[0]) === -1) {
              return (
                <li key={index}>
                  <span style={{ color: '#314659', fontWeight: 500 }}>{ `${transName[item[0]] || item[0]}: ` }</span>
                  <span>{`${transValue[item[1]] || item[1]}` }</span>
                </li>
              );
            }
            return false;
          });
          const tmpDetails = tmpDetailsArr.filter((item) => {
            return item;
          });

          const otherItems = (
            <Collapse accordion>
              <Panel header="借用原因" key="1">
                <p>{reason}</p>
              </Panel>
              <Panel header="一级管理员回复" key="2">
                <p>{r1}</p>
              </Panel>
              <Panel header="二级管理员回复" key="3">
                <p>{r2}</p>
              </Panel>
              <Panel header="备注" key="4">
                <p>{remark}</p>
              </Panel>
            </Collapse>
          );
          const detailItems = (
            <div>
              <List
                size="small"
                bordered
                dataSource={tmpDetails}
                renderItem={item => (<List.Item>{item}</List.Item>)}
              />
            </div>
          );
          const materialItems = (
            <List
              itemLayout="vertical"
              size="large"
              dataSource={mids}
              renderItem={(item) => {
                if (Object.keys(item).length === 0) {
                  return (
                    <List.Item key={item.id}>暂时没有相关信息</List.Item>
                  );
                }
                return (
                  <List.Item
                    key={item.id}
                    extra={<img width={100} alt="logo" src={item.attach[0]} />}
                  >
                    <List.Item.Meta
                      title={<a href={item.detail_url}>{item.name}</a>}
                      description={
                        <Tag color={transColor[item.sta]}>
                          {transValue[item.sta] || item.sta}
                        </Tag>
                      }
                    />
                    {item.desc}
                  </List.Item>
                );
              }}
            />
          );

          const details = this.state.nowData !== ''
            ? detailItems
            : <div style={{ textAlign: 'center' }}><Icon type="star" style={{ fontSize: 18 }} spin={true} /></div>;

          const others = this.state.nowData !== ''
            ? otherItems
            : <div style={{ textAlign: 'center' }}><Icon type="star" style={{ fontSize: 18 }} spin={true} /></div>;

          const materials = this.state.nowData !== ''
            ? materialItems
            : <div style={{ textAlign: 'center' }}><Icon type="star" style={{ fontSize: 18 }} spin={true} /></div>;

          const content = (
            <Tabs defaultActiveKey="1" size="small">
              <TabPane tab="详细信息" key="1" style={{ maxHeight: 350, overflow: 'auto' }}>
                {details}
              </TabPane>
              <TabPane tab="其他详情" key="2" style={{ maxHeight: 350, overflow: 'auto' }}>
                {others}
              </TabPane>
              <TabPane tab="物品详情" key="3" style={{ maxHeight: 350, overflow: 'auto' }}>
                {materials}
              </TabPane>
            </Tabs>
          );

          return (
            <div>
              <Popover
                placement="leftBottom"
                content={content}
                trigger="click"
                overlayStyle={{ width: 400 }}
                onVisibleChange={(visible) => { this.visibleChange(record.orderid, visible); }}
              >
                <Button type="primary">查看详细信息</Button>
              </Popover>
            </div>
          );
        },
      },
    ];

    const refreshButton = (
      <Divider style={{ color: 'lightgray' }}>
        <Button
          type="default"
          size="small"
          icon="poweroff"
          style={{ color: 'inherit' }}
          loading={this.state.iconLoading}
          onClick={this.refresh}
        >
          刷新消息
        </Button>
      </Divider>
    );

    const finalLayout = () => {
      if (type === 'user') {
        return (
          <Tabs defaultActiveKey="1" size="small">
            <TabPane tab="我的借用记录" key="1">
              <Table columns={userColumns} dataSource={mine} size="small" />
            </TabPane>
          </Tabs>
        );
      }
      if (to && done && mine) {
        return (
          <Tabs defaultActiveKey="1" size="small">
            <TabPane tab="未处理记录" key="1">
              {refreshButton}
              <Table columns={adminColumns} dataSource={to} size="small" />
            </TabPane>
            <TabPane tab="已处理记录" key="2">
              {refreshButton}
              <Table columns={userColumns} dataSource={done} size="small" />
            </TabPane>
          </Tabs>
        );
      }
    };

    return (
      <div>
        {finalLayout()}
        <Modal
          title="请输入您的回复"
          visible={this.state.modalVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <TextArea placeholder="请输入您的回复" value={this.state.reason} rows={4} onChange={(e) => { this.setReason(e); }} />
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { mine, to, done } = state.requestList;
  return { mine, to, done };
}

export default connect(mapStateToProps)(RequestList);
