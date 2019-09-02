var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var app = express();
app.use(cookieParser());

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
	resave: true, // Forces the session to be saved back to the session store
	saveUninitialized: true, // Forces a session that is "uninitialized" to be saved to the store.
	key: 'myapp_sid', // 设置会话cookie名, 默认是connect.sid
	// If secure is set to true, and you access your site over HTTP, the cookie will not be set.
	cookie: {
		maxAge: hour * 2,
		secure: false
	}
}
app.use(session(sessionOpts));


// 修改成权限页面
app.get('/', function(req, res) {
	// console.info("我没有被过滤器拦截");
	// res.sendFile(__dirname + "/web/index.html");
	
	// 验证登录状态
	var sess = req.session;
	// test
	//sess.userName = '放';
	console.info("sess.userName ====== >" + sess.userName);
	// 用户姓名
	if(!sess.userName){
		res.sendFile(__dirname + "/web/login.html");
	}else{
		res.setHeader('Content-Type', 'text/html;charset=utf-8');
		res.write('<p> 欢迎您: '+ sess.userName +'</p>');
		res.end();
	}
});


app.get('/logout', function( request, respon){
	var sess = request.session;
	delete sess.userName;
	console.info("注销");
	respon.redirect(301, '/');// location????????? res.redirect('../login');
});

// 处理登录
app.post("/login", function(request, respon ){
	// console.info(request.body);
	// 查询数据库, 看看用户名和密码是否匹配
	var sqlString = 'select * from user where user_name = "'+ request.body.userName +'" and user_password="'+ request.body.userPassword +'" limit 1';
	connection.query( sqlString, function( err, result , file){
		if(err){
			respon.json({ "ok":false });
		}else if( result.length <= 0 ){					
			respon.json({ "ok":false });
		}else{
			// 登录成功, 要改session
			var sess = request.session;
			sess.userName = request.body.userName;
			respon.json({ "ok":true });
		}
	});
})


// 过滤器
app.use(function(req, res, next) {
	if (req.url === '/favicon.ico') {
		return;
	}
	console.info("我是filter");
	// 同一个浏览器而言，req是同一个
	var sess = req.session;
	console.log(sess);
	if (sess.views) {
		sess.views++;
	} else {
		sess.views = 1;
	}
	
	
	
	res.setHeader('Content-Type', 'text/html');
	res.write('<p>views: ' + sess.views +  '<br>'+sess.userName +'</p>');
	res.end();
});
app.listen(3306);
