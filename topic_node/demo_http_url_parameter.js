'use strict';
// 演示url的解析,依赖url模块,使用parse函数
var url = require('url'),
	http = require('http'),
	path = require('path'),
	fs = require('fs'),
	querystring = require('querystring'),
    util = require('util');
// var urlString = 'http://127.0.0.1:8808/web/12.jpg?name=meng&age=21&title=前端';


// console.info(querystring.parse('name=meng&age=21&title=前端'));
// var params = urlParse.query;
// console.info(params);
// 课堂练习1 - 请将一个get请求的参数列表转换成对象输出
// 课堂练习2 -启动一个服务器,将页面请求的参数返回页面


// 启动服务器
http.createServer(function(request, response) {
	// 
	var urlParse = url.parse(request.url, true).query;
	// 将请求参数转换成字符串返回
	var queryObjString = util.inspect(urlParse)
	response.writeHead(200, {
		'Content-Type': 'text/plain;charset=utf-8'
	});
	response.end(queryObjString);
}).listen(8808);
