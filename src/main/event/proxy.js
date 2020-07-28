import { ipcMain } from 'electron';
import { v4 as uuidv4 } from 'uuid';

export default function handleProxyMessage() {
  ipcMain.on('get-proxy-status', event => {
    console.log('============ global.proxy.status =============');
    console.log(global.proxy.status);
    event.sender.send('proxy-status', global.proxy.status);
  });

  ipcMain.on('proxy-start', event => {
    console.log('============ start =============');
    console.log(11111);
    global.proxy.start();
  });

  ipcMain.on('proxy-close', event => {
    console.log('============ end =============');
    console.log(2222);
    global.proxy.close();
  });

  ipcMain.on('rules-add', (event, rule) => {
    // Object.assign(global, rule);
    const rules = global.application.configManager.getUserConfig('rules') || [];
    rules.push({
      ...rule,
      _id: uuidv4(),
    });
    global.application.configManager.setUserConfig('rules', rules);
  });

  ipcMain.on('rules-edit', (event, data) => {
    global.application.configManager.setUserConfig('rules', data);
  });

  ipcMain.on('async-rules-delete', (event, uid) => {
    // Object.assign(global, data);
    let rules = global.application.configManager.getUserConfig('rules') || [];
    rules = rules.filter(rule => rule._id !== uid);
    global.application.configManager.setUserConfig('rules', rules);
    event.sender.send('async-rules', rules);
  });

  ipcMain.on('sync-rules-list', (event, data) => {
    const rules = global.application.configManager.getUserConfig('rules') || [];
    event.sender.send('async-rules', rules);
  });
}
