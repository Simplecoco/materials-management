import React from 'react';
import { connect } from 'dva';
import { Table, Popover, Button, Popconfirm, Tabs } from 'antd';
// import InfoEditing from '../components/InfoEditing/InfoEditing';
import styles from './UserInfo.css';

const TabPane = Tabs.TabPane;
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
        // render: text => <a href="/">{text}</a>,
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
        title: '专业',
        dataIndex: 'profession',
        key: 'profession',
      },
      {
        title: '操作',
        key: 'action',
        render: (record) => {
          // const content = (    //这种比较常用
          //   <div>
          //     <p>{record.name}</p>
          //     <p>{record.studentID}</p>
          //   </div>
          // );
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
              <Button>编辑</Button>
              <span className="ant-divider" />
              <Popconfirm title="确认删除？" okText="是" cancelText="否" placement="topRight">
                <Button type="danger">删除</Button>
              </Popconfirm>
            </div>
          );
        },
      },
    ];

    const { items } = this.props;
    return (
      <div className={styles.normal}>
        <Table columns={columns} dataSource={items} size="small" />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { items } = state.userInfo;
  return { items };
}

export default connect(mapStateToProps)(UserInfo);
