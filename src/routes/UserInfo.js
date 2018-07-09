import React from 'react';
import { connect } from 'dva';
import { Table } from 'antd';
// import InfoEditing from '../components/InfoEditing/InfoEditing';
import styles from './UserInfo.css';

class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pagination: {
        total: 0,
        pageSize: 10,
      }
    };
  }

  componentWillReceiveProps = (props) => {
    if (this.state.pagination.total === 0 && props.total) {
      const pagination = { ...this.state.pagination };
      pagination.total = props.total;
      this.setState({ pagination });
    }
  }

  handleTableChange = (pagination) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager
    });
    this.props.dispatch({
      type: 'userInfo/fetch',
      payload: {
        from: ((pagination.current - 1) * pagination.pageSize) + 1,
        len: pagination.pageSize
      }
    });
  }

  render() {
    const { items } = this.props;
    const { pagination } = this.state;
    const columns = [
      {
        title: '用户编号',
        dataIndex: 'uid',
        key: 'uid',
      },
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '等级',
        dataIndex: 'level',
        key: 'level',
      },
      {
        title: '邮箱',
        dataIndex: 'mail',
        key: 'mail',
      },
      // {
      //   title: '操作',
      //   key: 'action',
      //   render: (record) => {
      //     // const content = (    //这种比较常用
      //     //   <div>
      //     //     <p>{record.name}</p>
      //     //     <p>{record.studentID}</p>
      //     //   </div>
      //     // );
      //     const details = Object.entries(record).map((item, index) => (
      //       <div style={{ marginBottom: '0.5em' }} key={index}>
      //         <p style={{ borderBottom: '1px solid #eee', fontSize: 14 }}>
      //           { `${item[0]}: ${item[1]}` }
      //         </p>
      //       </div>
      //     ));
      //     const peccancy = record.peccancy;
      //     const callback = (key) => {
      //       console.log(key);
      //     };
      //     const content = (
      //       <Tabs defaultActiveKey="1" onChange={callback} size="small">
      //         <TabPane tab="详细信息" key="1">
      //           {details}
      //         </TabPane>
      //         <TabPane tab="违章记录" key="2">{peccancy}</TabPane>
      //       </Tabs>
      //     );
      //
      //     return (
      //       <div>
      //         <Popover
      //           placement="leftTop"
      //           content={content}
      //           trigger="click"
      //           overlayStyle={{ width: 400 }}
      //         >
      //           <Button type="primary">查看详细信息</Button>
      //         </Popover>
      //         <span className="ant-divider" />
      //         <Button>编辑</Button>
      //         <span className="ant-divider" />
      //         <Popconfirm title="确认删除？" okText="是" cancelText="否" placement="topRight">
      //           <Button type="danger">删除</Button>
      //         </Popconfirm>
      //       </div>
      //     );
      //   },
      // },
    ];

    return (
      <div className={styles.normal}>
        <Table
          columns={columns}
          dataSource={items}
          size="small"
          pagination={pagination}
          onChange={this.handleTableChange}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { items, total } = state.userInfo;
  return { items, total };
}

export default connect(mapStateToProps)(UserInfo);
