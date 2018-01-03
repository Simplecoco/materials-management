import React from 'react';
import { connect } from 'dva';
import { Table } from 'antd';
import ApplyForm from '../components/ApplyForm/ApplyForm';
// import styles from './ApplyList.css';

class ApplyList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: []
    };
  }

  getNewApply = () => {
    this.props.dispatch({
      type: 'applyList/newApply',
    });
  };

  submitApply = (values) => {
    console.log(values, 'values');
    this.props.dispatch({
      type: 'applyList/submitApply',
      payload: {
        ...values,
        orderid: this.props.orderid
      },
    });
  };

  render() {
    console.log(this.props);
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
      }];
    const data = this.props.applyList.map((item, index) => {
      item.key = index;
      return item;
    });
    // const pager =  ;

// rowSelection object indicates the need for row selection
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        this.setState({ selected: selectedRows });
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
      }),
    };

    return (
      <div>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
          size="small"
        />
        <ApplyForm
          selected={this.state.selected}
          submitApply={this.submitApply}
          getNewApply={this.getNewApply}
          tel={this.props.tel}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state.applyList);
  const { applyList, orderid, tel } = state.applyList;
  return { applyList, orderid, tel };
}


export default connect(mapStateToProps)(ApplyList);
