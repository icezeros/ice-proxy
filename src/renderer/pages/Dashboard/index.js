import React, { PureComponent } from 'react';
import { Empty, Button } from 'antd';
export default class Index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <Empty description="Dashboard还未完成" />;
  }
}
