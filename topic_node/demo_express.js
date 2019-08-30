var express = require('express');
var fs = require('fs');
var app = express();

// 创建 application/x-www-form-urlencoded 编码解析
var bodyParser = require('body-Parser');
var urlencodedParser  = bodyParser.urlencoded({
	extended: false
});

app.get('/', function(req, res) {
	console.info(req.path); // 获取请求路径
	console.info(req.query); // 请求参数
	console.info(req.originalUrl); // 原始路径
	// console.info(req.hostname); // 主机信息(域名) 

	// 返回特定页面
	// fs.createReadStream("./web/index.html").pipe(res);

	// console.info(__dirname); // 这就是root(他已经被存到全局变量里边了)
	// res.sendFile(__dirname + "/web/13.jpg"); // 返回静态资源(文件)
	// res.sendFile(__dirname + "/web/index.html");
	// res.sendFile("/web/index.html"); //sendFile不接受相对路径
	res.sendFile(__dirname + "/web/index.html");
});

// app.delete('/',function(){})
// app.piut('/',function(){})
app.post("/testpost", urlencodedParser, function(req, res) {
	console.info(req.path); // 获取请求路径
	console.info(req.query); // 请求参数
	console.info(req.originalUrl); // 原始路径

	console.info(req.body);

	res.end("nmmp");
});

var server = app.listen(8081, function() {
	var host = server.address().address;
	var port = server.address().port;
	console.info("应用实例,访问地址为 http://" + host + ":%s", port);
});
