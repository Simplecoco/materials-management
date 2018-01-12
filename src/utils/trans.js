const transInfo = {
  'desc is invalid, ': '输入的描述不合法, 不能有空格哦',
};

const transName = {
  id: '物资编号',
  count: '剩余数量',
  desc: '描述',
  name: '名称',
  price: '价格',
  params: '参数',
  manufacturer: '所属者ID（管理员编号)',
  partners: '其他配件',
  state: '是否可借',
  location: '存放位置',
  keyName: '关键字',
  create_time: '创建日期',
  begtime: '借用开始时间',
  endtime: '借用结束时间',
  addtime: '申请时间',
  r1: '一级管理员回复',
  r2: '二级管理员回复',
  remark: '备注',
  orderid: '订单号',
  content: '借用原因',
  title: '标题',
  username: '用户名',
  sta: '状态',
};

const transValue = {
  submit: '已提交',
  fyes: '一级管理同意',
  fno: '一级管理不同意',
  syes: '借用中',
  sno: '二级管理不同意',
  overdue: '逾期',
  done: '借用结束',
  order: '借用中',
  can: '可借用'
};

const transColor = {
  submit: 'blue',
  fyes: 'lime',
  fno: 'volcano',
  syes: 'green',
  sno: 'red',
  overdue: '#f50',
  done: 'orange',
  order: 'volcano',
  can: 'green'
};

export { transInfo, transName, transValue, transColor };
