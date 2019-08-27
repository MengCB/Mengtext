'use strict';

var fs = require('fs');
// 创建目录 
// /meng/css -- 这里直接写 /meng 在表示磁盘根目录 创建
// ./meng表示当前目录 ../meng 在表示上层目录创建
// 递归生成{ recursive:true }
fs.mkdir('./meng/CB', { recursive:true }, function(err) { 
	if (err) {
		console.info(err);
	} else {
		console.info("创建成功");
	}
});

