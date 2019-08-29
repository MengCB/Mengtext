'use strict';
var fs = require('fs'),
	http = require('http'),
	path = require('path');
	
var pathName = './web'; // 磁盘根目录
var fileNamestring = '';
fs.readdir(pathName, function(err, files) {
	if (err) {
		return console.error(err);
	}
	// 遍历文件列表
	files.forEach(function(file) {
		console.log(fileNamestring += file +'\n');
	});
});

// 启动服务器
http.createServer(function(request, response) {
	response.writeHead(200, {'Content-Type': 'text/plain;charset=utf-8'});
	response.end(fileNamestring);
}).listen(8808);

// 作业5 