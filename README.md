shadowsocks-nodejs
==================

npm install

启动客户端：
npm run local
启动服务器端：
npm run server
查看日志
pm2 logs
关闭程序
pm2 kill 




——————————————

[![NPM version]][NPM] [![Build Status]][Travis CI]

shadowsocks-nodejs is a node.js port of [shadowsocks].

**Deprecated; please use [Other versions].**

Many people are asking why. Here's why.

- https://github.com/clowwindy/shadowsocks-nodejs/issues/35
- https://github.com/joyent/node/issues/5949

The GC of node.js sucks.

Python version [handles 5000 connections with 50MB RAM](https://github.com/clowwindy/shadowsocks/wiki/Optimizing-Shadowsocks) while node.js version
handles 100 connections with 300MB RAM. Why should we continue to support
node.js?


[Build Status]:    https://img.shields.io/travis/clowwindy/shadowsocks-nodejs/master.svg?style=flat
[NPM]:             https://www.npmjs.org/package/shadowsocks
[NPM version]:     https://img.shields.io/npm/v/shadowsocks.svg?style=flatp
[Travis CI]:       https://travis-ci.org/clowwindy/shadowsocks-nodejs
[shadowsocks]:     https://github.com/clowwindy/shadowsocks
[Other versions]:  https://github.com/clowwindy/shadowsocks/wiki/Ports-and-Clients


{
    "server":"52.193.32.25",
    "server_port":8388,
    "local_address":"127.0.0.1",
    "local_port":1080,
    "password":"password",
    "timeout":600,
    "method":"aes-256-cfb"
}
