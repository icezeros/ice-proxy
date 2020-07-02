import React from 'react';
import { Form, Input, Button, Alert } from 'antd';
import styles from './index.css';
// import { ipcRenderer, remote } from 'electron';

// const { getGlobal } = remote;
// const electron = window.require('electron');
const { ipcRenderer, remote } = require('electron');
const { getGlobal } = remote;

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 4,
    span: 8,
  },
};

class IPC extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: '',
      mainId: '',
      dirname: '',
      deviecMac: '',
      myField: null,
    };
  }

  componentDidMount() {
    ipcRenderer.on('main-msg', (event, msg) => {
      this.setState({ msg });
    });
  }

  handleSendSync = () => {
    ipcRenderer.send('sync-render', '我是来自渲染进程的异步消息');
  };

  handleSendAsync = () => {
    const msg = ipcRenderer.sendSync(
      'async-render',
      '我是来自渲染进程的同步消息'
    );
    this.setState({ msg });
  };

  handleStart = () => {
    ipcRenderer.send('start-msg');
  };

  handleEnd = () => {
    ipcRenderer.send('end-msg');
  };

  handleRemote = () => {
    remote.dialog.showErrorBox(
      '主进程才有的dialog模块',
      '我是使用remote调用的'
    );
  };

  handleReadGlobal = () => {
    const mainId = getGlobal('mainId') || 10;
    const dirname = getGlobal('__dirname') || 11;
    // const deviecMac = getGlobal('device').mac || 12;
    const deviecMac2 = getGlobal('device');
    console.log('============ deviecMac2 =============');
    console.log(deviecMac2);
    const deviecMac = 12;
    const myField = getGlobal('myField') || 13;
    this.setState({ mainId, dirname, deviecMac, myField });
  };

  changeGloable = () => {
    getGlobal('myField').name = 'code秘密花园';
    this.setState({ myField: getGlobal('myField') });
  };
  onFinish = values => {
    console.log('Success:', values);
  };

  onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  render() {
    const { msg, mainId, dirname, deviecMac, myField } = this.state;
    return (
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={this.onFinish}
        onFinishFailed={this.onFinishFailed}
      >
        <Form.Item
          label="名称"
          name="name"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="from"
          name="from"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input addonBefore="http://" defaultValue="mysite" />
        </Form.Item>
        <Form.Item
          label="to"
          name="to"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input addonBefore="http://" defaultValue="mysite" />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            确定
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default IPC;
