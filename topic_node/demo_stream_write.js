'use strict';
var fs = require('fs');
// 创建可写流
var writeStream1 = fs.createWriteStream("temp1.txt", "utf-8");

// writeStream1.write("春晓\n");
// 读取tempfile.txt文件
var data = fs.readFile("tempfile.txt", "utf-8");

writeStream1.write(data.toString());

writeStream1.end();

writeStream1.on('finish', function() {
    console.log("写入完成。");
});

// 作业: 把tempfile.txt 的内容复制到temp1.txt 中
