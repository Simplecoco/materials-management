import React from 'react';
import { connect } from 'dva';
import { Row, Col } from 'antd';
import styles from './MaterialInfo.css';
import ShowCard from '../components/ShowCard/ShowCard';
import InfoEditing from '../components/InfoEditing/InfoEditing';

// function MaterialInfo() {
//   return (
//     <div className={styles.normal}>
//       Route Component: MaterialInfo
//     </div>
//   );
// }

class MaterialInfo extends React.Component {
  static defaultProps = {
    // itemNum: 10,
    // result: [1,2,3,4,5,6,7,8,9,10],
    result: [
      {
        title: 'str1',
        pic:
          'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1508175242898&di=1c0c79bcc887bf5670e185d8b458d8c8&imgtype=0&src=http%3A%2F%2Fscimg.jb51.net%2Fallimg%2F160319%2F10-16031913552U10.jpg',
      },
      {
        title: 'str2',
        pic:
          'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1508175448922&di=0bfc5bc42a8cdda8251921eddc216123&imgtype=0&src=http%3A%2F%2Fimg.lanrentuku.com%2Fimg%2Fallimg%2F1706%2F14988285702530.jpg',
      },
      {
        title: 'str3',
        pic:
          'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1508175448922&di=0bfc5bc42a8cdda8251921eddc216123&imgtype=0&src=http%3A%2F%2Fimg.lanrentuku.com%2Fimg%2Fallimg%2F1706%2F14988285702530.jpg',
      },
      {
        title: 'str4',
        pic:
          'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1508175503432&di=62f45a171986032f821c829ae85ece45&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3Dd377c32b9d0a304e462fa8b9b9a1cdf3%2F241f95cad1c8a786e77ffd216d09c93d70cf5043.jpg',
      },
      {
        title: 'str5',
        pic:
          'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1508175448922&di=0bfc5bc42a8cdda8251921eddc216123&imgtype=0&src=http%3A%2F%2Fimg.lanrentuku.com%2Fimg%2Fallimg%2F1706%2F14988285702530.jpg',
      },
      {
        title: 'str1',
        pic:
          'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1508175242898&di=1c0c79bcc887bf5670e185d8b458d8c8&imgtype=0&src=http%3A%2F%2Fscimg.jb51.net%2Fallimg%2F160319%2F10-16031913552U10.jpg',
      },
      {
        title: 'str2',
        pic:
          'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1508175448922&di=0bfc5bc42a8cdda8251921eddc216123&imgtype=0&src=http%3A%2F%2Fimg.lanrentuku.com%2Fimg%2Fallimg%2F1706%2F14988285702530.jpg',
      },
      {
        title: 'str3',
        pic:
          'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1508175503432&di=62f45a171986032f821c829ae85ece45&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3Dd377c32b9d0a304e462fa8b9b9a1cdf3%2F241f95cad1c8a786e77ffd216d09c93d70cf5043.jpg',
      },
      {
        title: 'str4',
        pic:
          'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1508175448922&di=0bfc5bc42a8cdda8251921eddc216123&imgtype=0&src=http%3A%2F%2Fimg.lanrentuku.com%2Fimg%2Fallimg%2F1706%2F14988285702530.jpg',
      },
      {
        title: 'str5',
        pic:
          'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1508175242898&di=1c0c79bcc887bf5670e185d8b458d8c8&imgtype=0&src=http%3A%2F%2Fscimg.jb51.net%2Fallimg%2F160319%2F10-16031913552U10.jpg',
      },
      {
        title: 'str1',
        pic:
          'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1508175503432&di=62f45a171986032f821c829ae85ece45&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3Dd377c32b9d0a304e462fa8b9b9a1cdf3%2F241f95cad1c8a786e77ffd216d09c93d70cf5043.jpg',
        loading: true,
      },
      {
        title: 'str2',
        pic:
          'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1508175503432&di=62f45a171986032f821c829ae85ece45&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3Dd377c32b9d0a304e462fa8b9b9a1cdf3%2F241f95cad1c8a786e77ffd216d09c93d70cf5043.jpg',
      },
      {
        title: 'str3',
        pic:
          'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1507644191619&di=08d7ee672f034ce54e1a9cca74a5cb01&imgtype=0&src=http%3A%2F%2Fimg.sc115.com%2Fhb%2Fyl2%2F18%2F881606365616848.jpg',
      },
      {
        title: 'str4',
        pic:
          'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1508175503432&di=62f45a171986032f821c829ae85ece45&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3Dd377c32b9d0a304e462fa8b9b9a1cdf3%2F241f95cad1c8a786e77ffd216d09c93d70cf5043.jpg',
      },
      {
        title: 'str5',
        pic:
          'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1508175448922&di=0bfc5bc42a8cdda8251921eddc216123&imgtype=0&src=http%3A%2F%2Fimg.lanrentuku.com%2Fimg%2Fallimg%2F1706%2F14988285702530.jpg',
      },
    ],
  };

  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { result } = this.props;
    // const loading = false;
    // console.log(this.props);
    const layout = result.map((item, index) => {
      return (
        <Col span={6} key={index}>
          <ShowCard
            title={item.title}
            pic={item.pic}
            key={index}
            loading={item.loading || false}
          />
        </Col>
      );
    });
    console.log(layout);
    return (
      <div className={styles.normal}>
        <Row type="flex" gutter={24}>
          {layout}
        </Row>
        <InfoEditing />
      </div>
    );
  }
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(MaterialInfo);
