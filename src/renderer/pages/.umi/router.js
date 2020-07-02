import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/_renderRoutes';
import history from '@tmp/history';
import _dvaDynamic from 'dva/dynamic'

const Router = require('dva/router').routerRedux.ConnectedRouter;

const routes = [
  {
    "path": "/",
    "component": _dvaDynamic({
  
  component: () => import('../../layouts/index.js'),
  
}),
    "routes": [
      {
        "path": "/Add",
        "exact": true,
        "component": _dvaDynamic({
  
  component: () => import('../Add/index.js'),
  
}),
        "_title": "umi-electron",
        "_title_default": "umi-electron"
      },
      {
        "path": "/Antd",
        "exact": true,
        "component": _dvaDynamic({
  
  component: () => import('../Antd/index.js'),
  
}),
        "_title": "umi-electron",
        "_title_default": "umi-electron"
      },
      {
        "path": "/Dialog",
        "exact": true,
        "component": _dvaDynamic({
  
  component: () => import('../Dialog/index.js'),
  
}),
        "_title": "umi-electron",
        "_title_default": "umi-electron"
      },
      {
        "path": "/IPC",
        "exact": true,
        "component": _dvaDynamic({
  
  component: () => import('../IPC/index.js'),
  
}),
        "_title": "umi-electron",
        "_title_default": "umi-electron"
      },
      {
        "path": "/MenuView",
        "exact": true,
        "component": _dvaDynamic({
  
  component: () => import('../MenuView/index.js'),
  
}),
        "_title": "umi-electron",
        "_title_default": "umi-electron"
      },
      {
        "path": "/Print",
        "exact": true,
        "component": _dvaDynamic({
  
  component: () => import('../Print/index.js'),
  
}),
        "_title": "umi-electron",
        "_title_default": "umi-electron"
      },
      {
        "path": "/Protect",
        "exact": true,
        "component": _dvaDynamic({
  
  component: () => import('../Protect/index.js'),
  
}),
        "_title": "umi-electron",
        "_title_default": "umi-electron"
      },
      {
        "path": "/Set",
        "exact": true,
        "component": _dvaDynamic({
  
  component: () => import('../Set/index.js'),
  
}),
        "_title": "umi-electron",
        "_title_default": "umi-electron"
      },
      {
        "path": "/Shell",
        "exact": true,
        "component": _dvaDynamic({
  
  component: () => import('../Shell/index.js'),
  
}),
        "_title": "umi-electron",
        "_title_default": "umi-electron"
      },
      {
        "path": "/System",
        "exact": true,
        "component": _dvaDynamic({
  
  component: () => import('../System/index.js'),
  
}),
        "_title": "umi-electron",
        "_title_default": "umi-electron"
      },
      {
        "path": "/Window",
        "exact": true,
        "component": _dvaDynamic({
  
  component: () => import('../Window/index.js'),
  
}),
        "_title": "umi-electron",
        "_title_default": "umi-electron"
      },
      {
        "path": "/",
        "exact": true,
        "component": _dvaDynamic({
  
  component: () => import('../index.js'),
  
}),
        "_title": "umi-electron",
        "_title_default": "umi-electron"
      },
      {
        "component": () => React.createElement(require('/Users/huguosen/workspace/ice/ice-proxy/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'pages', hasRoutesInConfig: false }),
        "_title": "umi-electron",
        "_title_default": "umi-electron"
      }
    ],
    "_title": "umi-electron",
    "_title_default": "umi-electron"
  },
  {
    "component": () => React.createElement(require('/Users/huguosen/workspace/ice/ice-proxy/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'pages', hasRoutesInConfig: false }),
    "_title": "umi-electron",
    "_title_default": "umi-electron"
  }
];
window.g_routes = routes;
const plugins = require('umi/_runtimePlugin');
plugins.applyForEach('patchRoutes', { initialValue: routes });

// route change handler
function routeChangeHandler(location, action) {
  plugins.applyForEach('onRouteChange', {
    initialValue: {
      routes,
      location,
      action,
    },
  });
}
history.listen(routeChangeHandler);
routeChangeHandler(history.location);

export { routes };

export default function RouterWrapper() {
  return (
<Router history={history}>
      { renderRoutes(routes, {}) }
    </Router>
  );
}
