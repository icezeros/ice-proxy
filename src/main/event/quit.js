/**
 * 程序退出监控
 */
import { app, BrowserWindow, dialog, ipcMain } from 'electron';
let hasQuit = false;
function checkQuit(mainWindow, event) {
  const options = {
    type: 'info',
    title: '关闭确认',
    message: '确认要最小化程序到托盘吗？',
    buttons: ['确认', '关闭程序'],
  };
  console.log('============ process.platform =============');
  console.log(process.platform);
  dialog.showMessageBox(options, index => {
    if (index === 0) {
      event.preventDefault();
      mainWindow.hide();
    } else {
      //   global.engine.stop();
      hasQuit = true;
      mainWindow = null;
      app.exit(0);
    }
  });
}
export default function handleQuit() {
  //   const mainWindow = BrowserWindow.fromId(global.mainId);
  const mainWindow = global.application.windowManager.getWindow('main');
  const mainWindows = global.application.windowManager.getWindows();
  mainWindow.on('close', event => {
    event.preventDefault();
    // checkQuit(mainWindow, event);
    global.proxy.close();
    app.exit(0);
  });
  app.on('window-all-closed', () => {
    event.preventDefault();
    console.log('============ window-all-closed =============');
    console.log();
    checkQuit(mainWindow, event);
    if (!hasQuit) {
      if (process.platform !== 'darwin') {
        hasQuit = true;
        ipcMain.removeAllListeners();
        app.quit();
      }
    }
  });

  app.on('will-quit', () => {
    if (!hasQuit) {
      if (process.platform !== 'darwin') {
        global.application.stop();
        hasQuit = true;
        ipcMain.removeAllListeners();
        app.quit();
      }
    }
  });
}
