import React, { useState, useEffect } from 'react';
import { Table, Input, InputNumber, Popconfirm, Form } from 'antd';
import { connect } from 'dva';
import './index.css';
const { ipcRenderer, remote } = require('electron');
console.log('============ connect =============');
console.log(connect);
const originData = [];

for (let i = 0; i < 15; i++) {
  originData.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    from: 32,
    to: `London Park no. ${i}`,
  });
}

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  //   const inputNode = <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          <Input />
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const Rule = ({ rule, dispatch }) => {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState('');
  useEffect(() => {
    console.log('============ 11111 =============');
    console.log(11111);
    ipcRenderer.send('sync-rules-list');

    ipcRenderer.on('async-rules', (event, rules) => {
      console.log('============ rules1111 =============');
      console.log(rules);
      rules.forEach((rule, key) => {
        rule.key = key;
      });
      setData(rules);
    });
    return function cleanup() {
      ipcRenderer.removeAllListeners(['async-rules']);
    };
  }, [true]);

  const isEditing = record => record.key === editingKey;

  const deleteRule = record => {
    console.log('============ record =============');
    console.log(record);
    console.log('============ data[record.key] =============');
    console.log(data[record.key]);

    ipcRenderer.send('async-rules-delete', record._id);
  };
  const edit = record => {
    form.setFieldsValue({
      name: '',
      from: '',
      to: '',
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async key => {
    try {
      const row = await form.validateFields();
      console.log('============ row =============');
      console.log(row);
      console.log('============ key    =============');
      console.log(key);
      const newData = [...data];
      const index = newData.findIndex(item => key === item.key);
      console.log('============ index =============');
      console.log(newData[index]);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        console.log('============ newData =============');
        console.log(newData);
        ipcRenderer.send('rules-edit', newData);

        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
      title: 'name',
      dataIndex: 'name',
      width: '15%',
      editable: true,
    },
    {
      title: 'from',
      dataIndex: 'from',
      width: '35%',
      editable: true,
    },
    {
      title: 'to',
      dataIndex: 'to',
      width: '35%',
      editable: true,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      align: 'center',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span className="">
            <a
              href="javascript:;"
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              确定
            </a>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>取消</a>
            </Popconfirm>
          </span>
        ) : (
          <span>
            <a disabled={editingKey !== ''} onClick={() => edit(record)}>
              编辑
            </a>

            <a disabled={editingKey !== ''} onClick={() => deleteRule(record)}>
              删除
            </a>
          </span>
        );
      },
    },
  ];

  const mergedColumns = columns.map(col => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: record => ({
        record,
        inputType: col.dataIndex === 'from' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={false}
      />
    </Form>
  );
};
// export default Set;
export default connect(({ rule }) => ({
  rule,
}))(Rule);
