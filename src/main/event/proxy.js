export default function handleWindowMessage() {
  ipcMain.on('window-inited', (event, data) => {
    Object.assign(global, data);
  });
}
