'use strict';
// 演示url的解析,依赖url模块,使用parse函数
var url = require('url'),
	http = require('http'),
	path = require('path'),
	fs = require('fs');

// 从命令行获取root目录,默认是当前目录
var root = path.resolve(process.argv[2] || '.');
console.log('Static root dir:' + root);
// 启动服务器
var server = http.createServer(function(request, response) {
	// parse解析路径
	// 获得请求URL的pathname
	var pathname = url.parse(request.url).pathname;
	console.info("解析后的根目录为:" + pathname);
	
	// console.log("请求方法 -"+ request.method + '-请求地址-' + request.url);
	// 根目录的组合(文件的完整地址)
	var filePath = path.join(root, pathname);
	console.info("文件地址:" + filePath);
	
	// 获取文本状态
	fs.stat(filePath, function(err, stats) {
		if (!err && stats.isFile()) {
			// 没有出错且文件存在
			console.log('200' + request.url);
			// 发送200响应
			response.writeHead(200);
			// 将文件流导向response(放到页面)filestream 是一个
			var filestream = fs.createReadStream(filePath);
			filestream.pipe(response);
		} else if(!err && stats.isDirectory()){
			response.writeHead(200);
			var filestream = fs.createReadStream(filePath+"/12.jpg");
			filestream.pipe(response);
		} else {
			// 出错或文件不存在
			console.log('404' + request.url);
			// 发送404响应
			response.writeHead(404);
			response.end('404');
		}
	});
}).listen(8808);

// 终端打印信息
console.log('Server running at http://127.0.0.1:8808/');
