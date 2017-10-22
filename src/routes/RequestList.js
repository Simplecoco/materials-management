import React from 'react';
import { connect } from 'dva';
import { Table, Icon } from 'antd';
// import styles from './RequestList.css';

// function RequestList() {
//   return (
//     <div className={styles.normal}>
//       Route Component: RequestList
//     </div>
//   );
// }

class RequestList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const columns = [
      {
        title: '申请人',
        dataIndex: 'name',
        key: 'name',
        // render: text => <a href="/">{text}</a>,
      },
      {
        title: '申请日期',
        dataIndex: 'date',
        key: 'date',
      },
      {
        title: '申请物品',
        dataIndex: 'material',
        key: 'material',
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
            <a href="/">Action 一 {record.name}</a>
            <span className="ant-divider" />
            <a href="/">删除</a>
            <span className="ant-divider" />
            <a href="/" className="ant-dropdown-link">
              更多操作 <Icon type="down" />
            </a>
          </span>
        ),
      },
    ];

    const data = [
      {
        key: '1',
        name: 'John Brown',
        date: '2017.1.1',
        material: 'xxxxxxxxxx',
      },
      {
        key: '2',
        name: 'Jim Green',
        date: '2017.1.1',
        material: 'xxxxxxxxx',
      },
      {
        key: '3',
        name: 'Joe Black',
        date: '2017.1.1',
        material: 'xxxxxxxxx',
      },
    ];
    return <Table columns={columns} dataSource={data} />;
  }
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(RequestList);
