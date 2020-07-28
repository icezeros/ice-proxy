import express, { Request, Response, NextFunction } from 'express';
import { Options, createProxyMiddleware } from 'http-proxy-middleware';
import url from 'url';
import _ from 'lodash';
import { MacManager } from '../proxy-manager/index';

export class IProxy {
  constructor(
    config = {
      ip: '127.0.0.1',
      port: 8009,
      proxyType: 'http',
    }
  ) {
    this.config = config;
    this.app = express();
    this.manager = new MacManager();
    this.syncRules();
    this.init();
  }
  get status() {
    const proxyState = this.manager.getProxyState();
    const tmpStatus =
      (proxyState &&
        proxyState.stdout &&
        proxyState.stdout.split('\n').length > 0 &&
        proxyState.stdout.split('\n')[0].split(':').length > 0 &&
        proxyState.stdout
          .split('\n')[0]
          .split(':')[1]
          .trim() === 'Yes') ||
      false;
    return tmpStatus;
  }

  init() {
    this.app.use('/*', (req, res, next) => {
      const routerObj = {};
      const pathRewriteObj = {};
      for (const rule of this.rules) {
        const fromUrlParse = url.parse(rule.from);
        const toUrlParse = url.parse(rule.to);
        const fromUrlObj = url.parse(rule.from);
        const toUrlObj = url.parse(rule.to);
        let differentUrl = _.difference(
          fromUrlObj.path.split('/'),
          toUrlObj.path.split('/')
        );
        differentUrl.unshift('');
        differentUrl = differentUrl.join('/');
        routerObj[rule.from] = `${toUrlParse.protocol}//${toUrlParse.host}`;
        if (fromUrlParse.path !== toUrlParse.path) {
          pathRewriteObj[fromUrlParse.path] = toUrlParse.path;
        }
      }

      const options = {
        target: `${req.protocol}://${req.get('host')}`,
        changeOrigin: true,
        pathRewrite: pathRewriteObj,
        router: routerObj,
      };
      createProxyMiddleware(options)(req, res, next);
    });

    this.app.listen(this.config.port);
    this.app.on('error', error => {
      console.log('============ error =============');
      console.log(error);
    });
  }

  syncRules() {
    let rules = global.application.configManager.getUserConfig('rules') || [];
    rules = rules.sort((a, b) => {
      return b.from.length - a.from.length;
    });
    this.rules = rules;
  }
  start() {
    this.manager.enableGlobalProxy(
      this.config.ip,
      this.config.port,
      this.proxyType
    );
    this.sendStatusToMainWindow(this.status);
  }
  close() {
    this.manager.disableGlobalProxy('http');
    this.sendStatusToMainWindow(this.status);
  }
  //

  sendStatusToMainWindow(status) {
    const mainWindow = global.application.windowManager.getWindow('main');
    mainWindow.webContents.send('proxy-status', status);
  }
}
