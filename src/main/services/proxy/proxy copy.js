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
    console.log('============ this.options =============');
    console.log(this.options);
    this.proxyServer = new AnyProxy.ProxyServer(this.options);
    this.proxyServer.on('ready', () => {
      console.log('============ 111 =============');
      console.log(111);
      this.status = true;
      const mainWindow = global.application.windowManager.getWindow('main');
      mainWindow.webContents.send('proxy-status', true);
      //   AnyProxy.utils.systemProxyMgr.disableGlobalProxy();
      /* */
    });
    this.proxyServer.on('error', e => {
      console.log('============ e =============');
      console.log(e);
      this.status = false;
      const mainWindow = global.application.windowManager.getWindow('main');
      mainWindow.webContents.send('proxy-status', false);
      /* */
    });

    this.proxyServer.on('close', e => {
      console.log('============ e =============');
      console.log(e);
      this.status = false;
      const mainWindow = global.application.windowManager.getWindow('main');
      mainWindow.webContents.send('proxy-status', false);
      /* */
    });
  }

  start() {
    console.log('============ this.status =============');
    console.log(this.status);
    if (this.status) {
      return;
    }
    console.log('============ this.proxyServer1111 =============');
    console.log(this.proxyServer);
    this.init();
    AnyProxy.utils.systemProxyMgr.enableGlobalProxy('127.0.0.1', '8001');
    // AnyProxy.utils.systemProxyMgr.disableGlobalProxy();

    this.proxyServer.start();
  }
  close() {
    console.log('============ this.status22 =============');
    console.log(this.status);
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
