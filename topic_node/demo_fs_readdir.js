var fs = require('fs');

// 读取目录下的所有文件
// var pathName = '/'; // 磁盘根目录
// var pathName = './'; // 当前目录
var pathName = '../'; // 上层目录

fs.readdir(pathName, function(err, files) {
	if (err) {
		return console.error(err);
	}
	// 遍历文件列表
	files.forEach(function(file) {
		console.log(file);
	});
});
