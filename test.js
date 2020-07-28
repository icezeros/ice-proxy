const AnyProxy = require('anyproxy');
AnyProxy.utils.systemProxyMgr.enableGlobalProxy('127.0.0.1', '8001');
console.log('============ AnyProxy =============');
console.log(AnyProxy);
console.log(AnyProxy.utils.systemProxyMgr.getProxyState());
console.log(AnyProxy.utils.systemProxyMgr.getNetworkType());
