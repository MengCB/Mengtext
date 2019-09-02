var express = require('express');
var app = express();
var fs = require("fs");
var url = require('url');

var multer = require('multer');

// 创建 application/x-www-form-urlencoded 编码解析
// 增加reuquest对body的支持
var bodyParser = require('body-Parser');
var urlencodedParser = bodyParser.urlencoded({
	extended: false
});
const mysql = require("mysql");

const connection = mysql.createConnection({
	host: "localhost", // 主机地址
	user: "root", // 数据库用户名
	password: "", // 数据库用户密码
	database: "men" // 数据库名
});
connection.connect(); // 数据库连接


// 将 /web 文件夹下的资源当作静态资源,不需要额外get去获取
app.use('/web', express.static('web')); // 静态资源

app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(multer({
	dest: '/tmp/'
}).array('image'));

app.get('/', function(req, res) {
	res.sendFile(__dirname + "/web/index.html");
	// index.html中,引用jquery,js,这时候要注意,基于/ ,而不是/web
})


app.get('/getUserInfo', function(request, respon) {
	console.info(request.query); // 请求参数
	connection.query('select * from Person where id = "' + request.query.userId + '" limit 1;', function(err, result,
		file) {
		if (err) {
			console.info(err);
			respon.json({
				"name": "查无此人"
			});
		} else {
			console.info(result);
			if (result.length > 0) {
				respon.json(result[0].name);
			} else {
				respon.json({
					"name": "查无此人"
				});
			}

		}
	})
})


app.post('/updateUser', function(request, respon) {
	console.info(request.body);
	var sqlString = "update Person set name ='" + request.body.userName + "' where id = " + request.body.userId;
	connection.query(sqlString, function(err, result, file) {
		if (err) {
			console.info(err);
			respon.json({"ok": false, "info":"数据库错误"});
		} else {
			console.info(result);
			if(result.changedRows){
				respon.json({"ok": true, "info":"修改成功"});
			}else{
				respon.json({"ok": false, "info":"无可更新项"});
			}
		}
	});
});


app.post('/file_upload', function(req, res) {

	console.log(req.files[0]); // 上传的文件信息

	var des_file = __dirname + "/temp/" + req.files[0].originalname;
	fs.readFile(req.files[0].path, function(err, data) {
		fs.writeFile(des_file, data, function(err) {
			if (err) {
				console.log(err);
			} else {
				response = {
					message: 'File uploaded successfully',
					filename: req.files[0].originalname
				};
			}
			console.log(response);
			res.end(JSON.stringify(response));
		});
	});
})

var server = app.listen(8081, function() {

	console.log("服务器2启动成功")

})
