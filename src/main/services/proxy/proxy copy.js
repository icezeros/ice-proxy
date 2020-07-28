const AnyProxy = require('anyproxy');

export class IAnyProxy {
  constructor(config = {}) {
    this.options = {
      port: config.port || 8001,
      rule: require('./rule.js'),
      webInterface: {
        enable: true,
        webPort: 8022,
      },
      throttle: 10000,
      forceProxyHttps: false,
      wsIntercept: false, // 不开启websocket代理
      silent: false,
    };
    this.status = false;
    // this.init();
  }
  init() {
    this.proxyServer = new AnyProxy.ProxyServer(this.options);
    this.proxyServer.on('ready', () => {
      this.status = true;
      const mainWindow = global.application.windowManager.getWindow('main');
      mainWindow.webContents.send('proxy-status', true);
      //   AnyProxy.utils.systemProxyMgr.disableGlobalProxy();
      /* */
    });
    this.proxyServer.on('error', e => {
      this.status = false;
      const mainWindow = global.application.windowManager.getWindow('main');
      mainWindow.webContents.send('proxy-status', false);
      /* */
    });

    this.proxyServer.on('close', e => {
      this.status = false;
      const mainWindow = global.application.windowManager.getWindow('main');
      mainWindow.webContents.send('proxy-status', false);
      /* */
    });
  }

  start() {
    if (this.status) {
      return;
    }
    this.init();
    AnyProxy.utils.systemProxyMgr.enableGlobalProxy('127.0.0.1', '8001');
    // AnyProxy.utils.systemProxyMgr.disableGlobalProxy();

    this.proxyServer.start();
  }
  close() {
    if (!this.status) {
      return;
    }
    AnyProxy.utils.systemProxyMgr.disableGlobalProxy();
    this.proxyServer.close();
    this.status = false;
    const mainWindow = global.application.windowManager.getWindow('main');
    mainWindow.webContents.send('proxy-status', false);
  }

  getStatus() {
    return this.status;
  }
}
