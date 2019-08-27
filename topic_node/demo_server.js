// 简单创建Web服务器,监听自定义窗口

'use strict'; // 启用严格模式
var http = require('http');

http.createServer(function (request, response) {
	// 查看请求的信息
	console.log(request.method + ':' + request.url);

    // 发送 HTTP 头部 
    // HTTP 状态值: 200 : OK
    // 内容类型: text/plain
    response.writeHead(200, {'Content-Type': 'text/plain;charset=utf-8'});
	// response.setCharacterEncoding('utf-8');

    // 发送响应数据 "Hello World"
    response.end('蒙承彪\n');
}).listen(8808);

// 终端打印信息
console.log('Server running at http://127.0.0.1:8808/');