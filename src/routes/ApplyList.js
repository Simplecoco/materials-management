import React from 'react';
import { connect } from 'dva';
import { Table, Popconfirm, Icon } from 'antd';
import ApplyForm from '../components/ApplyForm/ApplyForm';
import styles from './ApplyList.css';

class ApplyList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: []
    };
  }

  deleteIt = ({ key }) => {
    console.log(key);
    this.props.dispatch({
      type: 'applyList/deleteIt',
      payload: { key }
    });
  };

  render() {
    console.log(this.props.applyList);
    const columns = [
      {
        title: '图片',
        dataIndex: 'pic',
        render: url => <img src={url} style={{ height: 50 }} alt="" />,
      }, {
        title: '名称',
        dataIndex: 'title',
        render: text => <span>{text}</span>,
      }, {
        title: '描述',
        dataIndex: 'content',
      }, {
        title: '物资编号',
        dataIndex: 'mid',
      }, {
        title: '操作',
        key: 'action',
        render: (record) => {
          console.log(record);
          return (
            <div>
              <Popconfirm title="确认删除？" okText="是" cancelText="否" placement="topRight" onConfirm={() => { this.deleteIt(record); }}>
                <Icon type="close-circle" className={styles.close} />
              </Popconfirm>
            </div>
          );
        },
      }];
    const data = this.props.applyList.map((item, index) => {
      item.key = index;
      return item;
    });

// rowSelection object indicates the need for row selection
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        this.setState({ selected: selectedRows });
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
      }),
      type: true,
    };

    return (
      <div>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
          size="small"
          title={() =>
            <div style={{ paddingLeft: 25, color: 'darkGray' }}>
              <Icon type="smile-o" style={{ marginRight: 10 }} />
              <span>请选择您需要申请物品</span>
            </div>}
        />
        <div style={{ margin: '30px 15px 0 0' }}>
          <ApplyForm selected={this.state.selected} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { applyList } = state.applyList;
  return { applyList };
}

export default connect(mapStateToProps)(ApplyList);
