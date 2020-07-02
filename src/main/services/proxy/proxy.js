const AnyProxy = require('anyproxy');

class IAnyProxy {
  AnyProxy = AnyProxy;
  proxyServer;
  options;
  constructor(config) {
    this.options = {
      port: config.port || 8001,
      rule: require('./proxy'),
      webInterface: {
        enable: true,
        webPort: 8022,
      },
      throttle: 10000,
      forceProxyHttps: true,
      wsIntercept: false, // 不开启websocket代理
      silent: false,
    };
    this.init();
  }
  init() {
    proxyServer = new AnyProxy.ProxyServer(this.options);
    proxyServer.on('ready', () => {
      console.log('============ 111 =============');
      console.log(111);
      AnyProxy.utils.systemProxyMgr.enableGlobalProxy('127.0.0.1', '8001');
      //   AnyProxy.utils.systemProxyMgr.disableGlobalProxy();
      /* */
    });
    proxyServer.on('error', e => {
      console.log('============ e =============');
      console.log(e);
      /* */
    });
  }

  start() {
    proxyServer.start();
  }
  close() {
    AnyProxy.utils.systemProxyMgr.disableGlobalProxy();
    proxyServer.close();
  }
}
