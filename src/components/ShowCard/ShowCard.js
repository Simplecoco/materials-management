import React from 'react';
import { Card, Icon, Tooltip } from 'antd';
import styles from './ShowCard.css';

class ShowCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      iconStatus: 'plus'
    };
  }

  addIt = () => {
    this.props.addToList({ ...this.props });
    this.setState({ iconStatus: 'ok' });
  };

  mouseLeaveHandle = () => {
    this.state.iconStatus === 'ok' && this.setState({ iconStatus: 'plus' });
  };

  render() {
    return (
      <Card
        loading={this.props.loading}
        title={this.props.title}
        style={{ width: '100%', margin: '0 1em 2em 0' }}
        bodyStyle={{ padding: 0 }}
        key={this.props.index}
        hoverable={true}
        actions={
          this.props.type === 'user'
            ? [
              <Tooltip title={this.state.iconStatus === 'plus' ? '添加到清单' : '添加成功!'} onVisibleChange={this.mouseLeaveHandle}>
                <Icon
                  type={this.state.iconStatus === 'plus' ? 'plus-square-o' : 'check'}
                  onClick={this.state.iconStatus === 'plus' ? this.addIt : ''}
                  style={{ fontSize: '18px' }}
                />
              </Tooltip>,
              <Tooltip title="查看更多">
                <Icon
                  type="ellipsis"
                  style={{ fontSize: '18px' }}
                  onClick={this.props.showDetail.bind(this, {
                    url: this.props.detail_url, title: this.props.title
                  })}
                />
              </Tooltip>
            ] : [
              <Tooltip title="编辑">
                <Icon
                  type="edit"
                  style={{ fontSize: '18px' }}
                  onClick={this.props.edit}
                />,
              </Tooltip>,
              <Tooltip title="查看更多">
                <Icon
                  type="ellipsis"
                  onClick={this.props.showDetail.bind(this, {
                    url: this.props.detail_url, title: this.props.title
                  })}
                  style={{ fontSize: '18px' }}
                />
              </Tooltip>
            ]
        }
      >
        <div className={styles.cardPic}>
          <a
            href={this.props.detail_url}
            onClick={this.props.showDetail.bind(this, {
              url: this.props.detail_url, title: this.props.title
            })}
          >
            <img alt="example" width="100%" src={this.props.pic} />
          </a>
        </div>
        <div className={styles.cardContent}>
          <p>{this.props.content || this.props.title}</p>
        </div>
      </Card>
    );
  }
}

export default ShowCard;
