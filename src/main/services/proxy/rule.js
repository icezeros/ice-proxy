module.exports = {
  // 模块介绍
  summary: 'my customized rule for AnyProxy',
  // 发送请求前拦截处理
  *beforeSendRequest(requestDetail) {
    /* ... */
    if (requestDetail.url.startsWith('http://at.worktile.live/api/agile')) {
      console.log('============ requestDetail =============');
      console.log(requestDetail.requestOptions);
      console.log(requestDetail.requestData);
      console.log(requestDetail.url);
      // console.log(requestDetail._req);
      console.log('============ 1 =============');
      console.log(1);
      const newRequestOptions = requestDetail.requestOptions;
      newRequestOptions.hostname = 'at.worktile.local';
      newRequestOptions.port = '11001';
      newRequestOptions.headers.Host = 'at.worktile.local';
      requestDetail.url = requestDetail.url.replace(
        'http://at.worktile.live/api/agile',
        'http://at.worktile.local:11001/api/agile'
      );
      requestDetail.requestOptions = newRequestOptions;
      console.log('============ requestDetail.url =============');
      console.log(requestDetail.url);
      console.log('============ requestDetail.requestOptions =============');
      console.log(requestDetail.requestOptions);
      return requestDetail;
      // newRequestOptions.url = "11001";
      // return requestDetail;
      // return {
      //   requestOptions: newRequestOptions,
      // };
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
