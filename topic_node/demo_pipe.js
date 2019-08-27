const fs = require("fs");

// 创建可读流
var readerStream = fs.createReadStream('13.jpg');
// var readerStream = fs.createReadStream('tempfile.txt');

// 创建可写流
var writeStream = fs.createWriteStream('13.bak.jpg');
// var writeStream = fs.createWriteStream('temp.txt');

// 管道读写操作
// 读取tempfile.txt的内容,并写入到temp.txt中使用pipe()方法
readerStream.pipe(writeStream);

console.log("执行完毕");