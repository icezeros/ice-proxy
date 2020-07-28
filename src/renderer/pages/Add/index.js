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

  onFinish = values => {
    ipcRenderer.send('rules-add', values);
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
          <Input defaultValue="mysite" />
        </Form.Item>
        <Form.Item
          label="to"
          name="to"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input defaultValue="mysite" />
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
