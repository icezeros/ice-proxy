import { ProxyManager } from './manager';

export class MacManager extends ProxyManager {
  constructor() {
    super();
  }
  getNetworkType() {
    for (let i = 0; i < this.networkTypes.length; i++) {
      const type = this.networkTypes[i];
      const result = this.util.execSync('networksetup -getwebproxy ' + type);

      if (result.status === 0) {
        this.networkType = type;
        return type;
      }
    }

    throw new Error('Unknown network type');
  }

  enableGlobalProxy(ip, port, proxyType) {
    if (!ip || !port) {
      console.log(
        'failed to set global proxy server.\n ip and port are required.'
      );
      return;
    }

    proxyType = proxyType || 'http';

    const networkType = this.networkType || this.getNetworkType();
    const execString =
      proxyType === 'http'
        ? `networksetup -setwebproxy ${networkType} ${ip} ${port} && networksetup -setproxybypassdomains ${networkType} 127.0.0.1 localhost`
        : `networksetup -setsecurewebproxy ${networkType} ${ip} ${port} && networksetup -setproxybypassdomains ${networkType} 127.0.0.1 localhost`;
    return this.util.execSync(execString);
  }

  disableGlobalProxy(proxyType) {
    proxyType = proxyType || 'http';
    const networkType = this.networkType || this.getNetworkType();
    const execString =
      proxyType === 'http'
        ? `networksetup -setwebproxystate ${networkType} off`
        : `networksetup -setsecurewebproxystate ${networkType} off`;
    return this.util.execSync(execString);
  }

  getProxyState() {
    const networkType = this.networkType || this.getNetworkType();

    const execString = `networksetup -getwebproxy ${networkType}`;
    return this.util.execSync(execString);
  }
}
