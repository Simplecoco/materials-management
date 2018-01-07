import React from 'react';
import { connect } from 'dva';
import { Table, Popover, Button, Popconfirm, Tabs } from 'antd';
// import { fetchOrderDetail } from '../services/admin';
// import styles from './RequestList.css';
const TabPane = Tabs.TabPane;

class RequestList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // details: {}
    };
  }

  // componentDidMount = () => {
  //   this.fetchOrderDetail();
  // };

  // fetchIt = async ({ orderId }) => {
  //   console.log(orderId);
  //   const { data } = await fetchOrderDetail({ orderId });
  //   console.log({ data });
  //   return { data };
    // this.setState({ details: {} });
  // };

  render() {
    console.log(this.props.mine);
    const columns = [
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
        // render: text => <a href="/">{text}</a>,
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
          // console.log(fetchOrderDetail);
          // console.log(record.orderid);
          // const { data } = this.fetchIt({ orderId: record.orderid });
          // console.log({ data });
          const details = Object.entries(record).map((item, index) => (
            <div style={{ marginBottom: '0.5em' }} key={index}>
              <p style={{ borderBottom: '1px solid #eee', fontSize: 14 }}>{ `${item[0]}: ${item[1]}` }</p>
            </div>
          ));
          const peccancy = record.peccancy;
          const callback = (key) => {
            console.log(key);
          };
          const content = (
            <Tabs defaultActiveKey="1" onChange={callback} size="small">
              <TabPane tab="详细信息" key="1">
                {details}
              </TabPane>
              <TabPane tab="违章记录" key="2">{peccancy}</TabPane>
            </Tabs>
          );

          return (
            <div>
              <Popover placement="leftTop" content={content} trigger="click" overlayStyle={{ width: 400 }}>
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

    const data = this.props.mine;
    return <Table columns={columns} dataSource={data} size="small" />;
  }
}

function mapStateToProps(state) {
  console.log(state.requestList);
  const { mine } = state.requestList;
  return { mine };
}

export default connect(mapStateToProps)(RequestList);
