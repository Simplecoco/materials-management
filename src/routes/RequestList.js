import React from 'react';
import { connect } from 'dva';
import { Table, Popover, Button, Popconfirm, Tabs, Icon } from 'antd';
import { fetchOrderDetail } from '../services/admin';
// import styles from './RequestList.css';
const TabPane = Tabs.TabPane;

class RequestList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nowData: '',
    };
  }

  visibleChange = async (orderid, visible) => {
    console.log(visible);
    console.log(orderid);
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

  render() {
    const { to, done, mine } = this.props;
    console.log(this.props, 'this.props');
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
      },
      {
        title: '操作',
        key: 'action',
        render: (record) => {
          const details = this.state.nowData !== '' ? Object.entries(this.state.nowData).map((item, index) => (
            <div style={{ marginBottom: '0.5em' }} key={index}>
              <p style={{ borderBottom: '1px solid #eee', fontSize: 14 }}>{ `${item[0]}: ${item[1]}` }</p>
            </div>
          )) : <div style={{ textAlign: 'center' }}><Icon type="star" style={{ fontSize: 18 }} spin={true} /></div>;
          const peccancy = record.peccancy;
          const content = (
            <Tabs defaultActiveKey="1" size="small">
              <TabPane tab="详细信息" key="1">
                {details}
              </TabPane>
              <TabPane tab="违章记录" key="2">{peccancy}</TabPane>
            </Tabs>
          );

          return (
            <div>
              <Popover
                placement="leftTop"
                content={content}
                trigger="click"
                overlayStyle={{ width: 400 }}
                onVisibleChange={(visible) => { this.visibleChange(record.orderid, visible); }}
              >
                <Button type="primary">查看详细信息</Button>
              </Popover>
              <span className="ant-divider" />
              <Popconfirm title="确认同意？" okText="是" cancelText="否" placement="topRight">
                <Button>同意</Button>
              </Popconfirm>
              <span className="ant-divider" />
              <Popconfirm title="确认不同意？" okText="是" cancelText="否" placement="topRight">
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
      },
      {
        title: '操作',
        key: 'action',
        render: (record) => {
          const details = this.state.nowData !== '' ? Object.entries(this.state.nowData).map((item, index) => (
            <div style={{ marginBottom: '0.5em' }} key={index}>
              <p style={{ borderBottom: '1px solid #eee', fontSize: 14 }}>{ `${item[0]}: ${item[1]}` }</p>
            </div>
          )) : <div style={{ textAlign: 'center' }}><Icon type="star" style={{ fontSize: 18 }} spin={true} /></div>;
          const peccancy = record.peccancy;
          const content = (
            <Tabs defaultActiveKey="1" size="small">
              <TabPane tab="详细信息" key="1">
                {details}
              </TabPane>
              <TabPane tab="违章记录" key="2">{peccancy}</TabPane>
            </Tabs>
          );

          return (
            <div>
              <Popover
                placement="leftTop"
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

    const finalLayout = () => {
      if (to && done && mine) {
        return (
          <Tabs defaultActiveKey="1" size="small">
            <TabPane tab="我的借用记录" key="1">
              <Table columns={userColumns} dataSource={mine} size="small" rowKey={record => record.orderid} />
            </TabPane>
            <TabPane tab="未处理记录" key="2">
              <Table columns={adminColumns} dataSource={to} size="small" />
            </TabPane>
            <TabPane tab="已处理记录" key="3">
              <Table columns={adminColumns} dataSource={done} size="small" />
            </TabPane>
          </Tabs>
        );
      }
      if (mine) {
        return (
          <Tabs defaultActiveKey="1" size="small">
            <TabPane tab="我的借用记录" key="1">
              <Table columns={userColumns} dataSource={mine} size="small" />
            </TabPane>
          </Tabs>
        );
      }
    };

    return (
      <div>
        {finalLayout()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state.requestList);
  const { mine, to, done } = state.requestList;
  return { mine, to, done };
}

export default connect(mapStateToProps)(RequestList);
