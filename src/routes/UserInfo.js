import React from 'react';
import { connect } from 'dva';
import { Table, Icon } from 'antd';
import InfoEditing from '../components/InfoEditing/InfoEditing';

// import styles from './UserInfo.css';

// function UserInfo() {
//   return (
//     <div className={styles.normal}>
//       Route Component: UserInfo
//     </div>
//   );
// }

class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const columns = [
      {
        title: '用户编号',
        dataIndex: 'number',
        key: 'number',
        render: text => <a href="/">{text}</a>,
      },
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '学号',
        dataIndex: 'studentID',
        key: 'studentID',
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
            <a href="/">Action 一 {record.name}</a>
            <span className="ant-divider" />
            <a href="/">编辑</a>
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
        number: '001',
        name: 'John Brown',
        studentID: 'xxxxxxxxxx',
      },
      {
        key: '2',
        number: '002',
        name: 'Jim Green',
        studentID: 'xxxxxxxxx',
      },
      {
        key: '3',
        number: '003',
        name: 'Joe Black',
        studentID: 'xxxxxxxxx',
      },
    ];
    return (
      <div>
        <Table columns={columns} dataSource={data} />
        <InfoEditing />
      </div>
    );
  }
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(UserInfo);
