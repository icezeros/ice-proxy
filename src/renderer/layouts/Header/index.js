import React, { Component } from 'react';
import { Layout, Button, Row, Col } from 'antd';
import './index.css';
const { ipcRenderer, remote } = require('electron');

const { Header } = Layout;

class HeaderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { status: false };
  }

  componentDidMount() {
    ipcRenderer.send('get-proxy-status');

    ipcRenderer.on('proxy-status', (event, data) => {
      this.setState({ status: data });
    });
  }
  proxyStart = () => {
    ipcRenderer.send('proxy-start');
  };

  proxyClose = () => {
    ipcRenderer.send('proxy-close');
  };
  render() {
    const { status } = this.state;
    return (
      <Header className="header">
        <Row>
          <Col span={16} />
          <Col span={8}>
            {status ? (
              <Button type="primary" onClick={this.proxyClose}>
                结束
              </Button>
            ) : (
              <Button type="primary" onClick={this.proxyStart}>
                开始
              </Button>
            )}
          </Col>
        </Row>
      </Header>
    );
  }
}

export default HeaderComponent;
