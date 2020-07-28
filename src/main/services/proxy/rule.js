const url = require('url');
const _ = require('lodash');
module.exports = {
  // 模块介绍
  summary: 'my customized rule for AnyProxy',
  // 发送请求前拦截处理
  *beforeSendRequest(requestDetail) {
    /* ... */
    let rules = global.application.configManager.getUserConfig('rules') || [];
    rules = rules.sort((a, b) => {
      return b.from.length - a.from.length;
    });
    let flag = false;
    for (const rule of rules) {
      if (flag) {
        break;
      }
      if (requestDetail.url.startsWith(rule.from)) {
        const fromUrlObj = url.parse(rule.from);
        const toUrlObj = url.parse(rule.to);
        let differentUrl = _.difference(
          fromUrlObj.path.split('/'),
          toUrlObj.path.split('/')
        );
        differentUrl.unshift('');
        differentUrl = differentUrl.join('/');
        const newRequestOptions = requestDetail.requestOptions;
        newRequestOptions.hostname = toUrlObj.hostname;
        newRequestOptions.port = toUrlObj.port;
        newRequestOptions.headers.Host = toUrlObj.hostname;
        newRequestOptions.path = newRequestOptions.path.replace(
          differentUrl,
          ''
        );

        requestDetail.url = requestDetail.url.replace(rule.from, rule.to);
        requestDetail.requestOptions = newRequestOptions;
        flag = true;
        return requestDetail;
        // newRequestOptions.url = "11001";
        // return requestDetail;
        // return {
        //   requestOptions: newRequestOptions,
        // };
      }
    }
  },
  // 发送响应前处理
  *beforeSendResponse(requestDetail, responseDetail) {
    /* ... */
  },
  // 是否处理https请求
  *beforeDealHttpsRequest(requestDetail) {
    /* ... */
  },
  // 请求出错的事件
  *onError(requestDetail, error) {
    /* ... */
  },
  // https连接服务器出错
  *onConnectError(requestDetail, error) {
    /* ... */
  },
};
