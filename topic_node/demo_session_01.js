var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var app = express();
app.use(cookieParser());

// 引入登录校验
var checkLogin = require('./demo_session_check_login');

// 增加request对body的支持
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
	extended: false
}));


// 数据库支持-----------------------
const mysql = require("mysql");
const connection = mysql.createConnection({
	host: "localhost", //主机地址
	port: 3306, // 如果修改了数据库的默认端口3306, 这个属性不可忽略
	user: "root", //数据库用户名
	password: "", //数据库用户密码
	database: "men" //数据库名
});
connection.connect(); //数据库连接
//----------------------------------

app.use('/web', express.static('web'));

const hour = 1000 * 60 * 60;
var sessionOpts = {
	secret: 'a cool secret', // 设置密钥	
	resave: true, // 强制将会话保存回会话存储区
	saveUninitialized: true, // 强制将“未初始化”的会话保存到存储
	key: 'myapp_sid', // 设置会话cookie名, 默认是connect.sid
	cookie: {
		maxAge: hour * 2,
		secure: false
	}
}
app.use(session(sessionOpts));


// 前端校验---监听一个请求,将校验结果返回给前端
app.get('/checkLogin', function(req, res) {
	if (checkLogin.checkLogin(req)) {
		res.json({
			"ok": true
		});
		// console.info(checkLogin.checkLogin(req));
	} else {
		res.json({
			"ok": false
		});
	}
});


// 修改成权限页面
app.get('/', function(req, res) {
	// 验证登录状态
	var sess = req.session;
	if (checkLogin.checkLogin(req)) {
		// res.sendFile(__dirname + "/web/login.html");
	} else {
		res.setHeader('Content-Type', 'text/html;charset=utf-8');
		// res.write('<p> 欢迎您: ' + sess.userName + '</p>');
		res.end();
	}
});

// 响应注销退出
app.post('/logout', function(request, response) {
	var sess = request.session;
	delete sess.userName;
	response.json({
		"logout": true
	})
});

// 处理登录
app.post("/login", function(request, respon) {
	// 查询数据库, 看看用户名和密码是否匹配
	var sqlString = 'select * from user where user_name = "' + request.body.userName + '" and user_password="' + request
		.body.userPassword + '" limit 1';
	connection.query(sqlString, function(err, result, file) {
		if (err) {
			respon.json({
				"ok": false
			});
		} else if (result.length <= 0) {
			respon.json({
				"ok": false
			});
		} else {
			// 登录成功, 要改session
			var sess = request.session;
			sess.userName = request.body.userName;
			var pass = result[0].user_name;
			respon.json({
				"ok": true,
			});
		}
	});
});

// 处理注册
app.post("/register", function(request, respon) {
	// 查询数据库, 看看用户名和密码是否匹配
	var sqlString = 'insert into user(user_name,user_password) values("' + request.body.userName + '","' + request.body.userPassword +
		'")';
	connection.query('select * from user where user_name ="' + request.body.userName + '"', function(error, result, file) {
		if (result[0] == undefined) {
			connection.query(sqlString, function(err, results, file) {
				if (err) {
					respon.json({
						"ok": false
					});
				} else if (results.length <= 0) {
					respon.json({
						"ok": false
					});
				} else {
					// 注册成功, 要改session
					respon.json({
						"ok": true
					});
				}
			});
		} else {
			respon.json({
				"ok": false
			});
		}
	});

});


// 处理预约提交
app.post("/subscribe", function(request, respon) {
	var sqlInsert = 'insert into subs(company_name,time_interval,Price,floor) values("' + request.body.companyName +
		'","' + request.body.timeInterval + '","' + request.body.price + '","' + request.body.floor + '")';
	connection.query(sqlInsert, function(err, result, file) {
		if (err) {
			respon.json({
				"ok": false
			});
		} else if (result.length <= 0) {
			respon.json({
				"ok": false
			});
		} else {
			respon.json({
				"ok": true
			});
		}
	});
});




// 过滤器
// app.use(function(req, res, next) {
// 	if (req.url === '/favicon.ico') {
// 		return;
// 	}
// 	console.info("我是filter");
// 	// 同一个浏览器而言，req是同一个
// 	var sess = req.session;
// 	console.log(sess);
// 	if (sess.views) {
// 		sess.views++;
// 	} else {
// 		sess.views = 1;
// 	}
// 	
// 	res.setHeader('Content-Type', 'text/html');
// 	res.write('<p>views: ' + sess.views +  '<br>'+sess.userName +'</p>');
// 	res.end();
// });
app.listen(3306);

console.info("服务器已启动");
