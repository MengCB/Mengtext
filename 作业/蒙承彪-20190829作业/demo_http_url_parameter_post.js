/* 启动服务器
 筛选URL中的信息,如果是get --> / 就让他指向/web/test_post.HTMLAllCollection
 如果是post,并且请求地址为 "", 则返回其请求的参数 */

var http = require('http'),
	url = require('url'),
	path = require('path'),
	fs = require('fs'),
	querystring = require('querystring'),
	util = require('util'),
	mysql = require("mysql");


const connection = mysql.createConnection({
	host: "localhost", // 主机地址
	user: "root", // 数据库用户名
	password: "", // 数据库用户密码
	database: "men" // 数据库名
});
connection.connect(); // 数据库连接

// 从命令行获取root目录,默认是当前目录 
var root = path.resolve(process.argv[2] || '.');
// 启动服务器
http.createServer(function(request, response) {
	// 筛选url,区分get和post
	var mthodRES = request.method;
	var urlRES = request.url;
	// var urlParse = url.parse(urlRES, true).query;
	if (mthodRES == 'get' || mthodRES == 'GET') {
		if (urlRES == '/') {
			gotoPage("/web/test_post.html", request, response);
		} else {
			gotoPage(urlRES, request, response);
		}
	}
	if (mthodRES == 'POST' || mthodRES == 'post') {
		var postData = '';
		request.on('data', function(chunk) {
			postData += chunk;
		});
		request.on('end', function() {
			// 当流收集完整参数后变成一个对象
			postData = querystring.parse(postData);
			// 处理收到的post参数
			handlePost(urlRES, postData, response);
		});
		
		
	}
}).listen(3306);
console.info("服务器已启动,监听3306端口");

// 返回指定页面
function gotoPage(pagePath, request, response) {
	var urlParse = url.parse(request.url, true).pathname;
	var urlId = url.parse(request.url, true).query
	var filePath = path.join(root, pagePath);
	console.info(filePath);

	fs.stat(filePath, function(err, stats) {
		if (!err && stats.isFile()) {
			response.writeHead(200);
			fs.createReadStream(filePath).pipe(response);
		} else if (urlParse == '/getUser') {
			connection.query('select * from Person where id = ' + urlId.id,
				function(error, results) {
					if (error) {
						throw error;
					} else {
						response.writeHead(200, {
							'Content-Type': 'text/plain;charset=utf-8'
						});
						response.end('查询结果:id=' + results[0].id + ' name=' + results[0].name);
					}
				});
		} else {
			console.log('404' + request.url);
			response.writeHead(404);
			response.end('404');
		}
	});
}
	
// 处理post请求
function handlePost(urlRES, postData, response) {
	if (urlRES == '/testpost') {
	connection.query('update Person set name="'+ postData.name +'" where id='+ postData.id,
		function(error, results, fileds) {
			if (error) {
				throw error;
			} else {
				response.writeHead(200, {
					'Content-Type': 'text/plain;charset=utf-8'
				});
				response.end("修改的名字为:"+postData.name);
			}
		});
	}else{
		console.log('404' + request.url);
		response.writeHead(404);
		response.end('404');
	}
}
