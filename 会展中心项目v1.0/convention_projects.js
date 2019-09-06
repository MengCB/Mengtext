var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var convention = require("./connect_database_module");
var bodyParser = require('body-parser');
var app = express();
app.use('/web', express.static('web'));
app.use('/images', express.static('images'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
	extended: false
}));
const hour = 1000 * 60 * 60;
convention.connectionData();
var sessionOpts = {
	secret: 'a cool secret',
	resave: true,
	saveUninitialized: true,
	key: 'myapp_sid',
	cookie: {
		maxAge: hour * 2,
		secure: false
	}
}
app.use(session(sessionOpts));

app.get('/', function(req, res) {

	res.sendFile(__dirname + "/web/index.html");
})

// 查询展厅信息
app.get("/information", function(request, response) {
	convention.exhibition(request, response);

});

// 查询申请列表
app.get("/apply", function(request, response) {
	convention.searchApplication(request, response);
})


//同意申请,发射信息到展厅信息
app.get("/queryApply", function(request, response) {
	convention.InformationStorage(request, response);
});

//拒绝申请
app.get("/refuseApply", function(request, response) {
	convention.refuseToApply(request, response);
});

// 会员登录
app.post("/login", function(request, respon) {
	// 查询数据库, 看看用户名和密码是否匹配
	convention.memberLogin(request, respon);
});

//会员注册
app.post("/register", function(request, respon) {
	convention.mbRegistered(request, respon)
});

//申请表
app.post("/subscribe", function(request, respon) {
	convention.appointment(request, respon)
});

//登录验证
app.get('/checkeLogin', function(req, res) {
	if (convention.checkLogin(req)) {
		res.json({
			"login": true
		});
	} else {
		res.json({
			"login": false
		});
	}
})
// 会员登录
app.post('/adlogin', function(request, respon) {
	convention.administrator(request, respon);
})


// 注销会员用户登录
// 前端校验---监听一个请求,将校验结果返回给前端
app.get('/cleck_Login', function(req, res) {
	if (convention.check_Login(req)) {
		res.json({
			"ok": true
		});
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
	if (convention.check_Login(req)) {
		res.sendFile(__dirname + "/web/login.html");
	} else {
		res.setHeader('Content-Type', 'textml;charset=utf-8');
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

app.post('/admin_update', function(request, response) {
	convention.mdTheShowroom(request, response);
})

var server = app.listen(8081, function() {
	console.log("服务器启动成功")
})
