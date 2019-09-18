var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
// 引入注册模块
var logReg = require('./test_system_module');
var app = express();
app.use(cookieParser());
const hour = 1000 * 60 * 60;
var sessionOpts = {
	secret: 'a cool secret', // 设置密钥
	resave: true,
	saveUninitialized: true,
	key: 'myapp_sid',
	cookie: {
		maxAge: hour * 2,
		secure: false
	}
};
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
	extended: false
}));

// 数据库连接
logReg.connectMysql();

app.use(session(sessionOpts));
app.use('/web', express.static('web'));

// 学生用户注册
app.post('/register',function(req,res){
	logReg.stuRegister(req,res);
})



// 前端校验 // 监听一个请求,将校验结果反馈给前端
app.get('/checkeLogin',function(req,res){
	if(logReg.checkLogin(req)){
		res.json({"login":true});
	}else{
		res.json({"login":false});
	}
})


// 修改成权限页面
app.get('/', function(req, res) {
	// 验证登录状态
// 	var sess = req.session;
// 
// 	if (!checkLogin.checkLogin(req)) {
// 		res.sendFile(__dirname + '/web/login.html');
// 	} else {
// 		res.setHeader('Content-Type', 'text/html;charset=utf-8');
// 		res.write('<p>欢迎您:' + sess.userName + '</p>');
// 		res.end();
// 	}
			res.sendFile(__dirname + '/web/index.html');

});


// 注销登录
// 问题在于,get请求可能被浏览器缓存,请使用post请求处理登出
app.get('/logout', function(req, res) {
	var sess = req.session;
	delete sess.userName;
	res.json({"logout":true});
	// res.sendFile(__dirname + '/web/login.html');
	
})


// 学生登录
app.post('/stulogin', function(req, res) {
logReg.stuLogin(req,res);

})

// 教师登录
app.post('/teachlogin', function(req, res) {
logReg.teachLogin(req,res);

})

// 题目录入
app.post('/quesSec',function(req,res){
	logReg.Ques(req,res);
});

// 考试页面
app.get("/TakeOut", function(request, respon) {
	logReg.exQuestion(request,respon);
});

// 考试时间倒计时
app.post('/checkTime',function(req,res){
	logReg.countDown(req,res);
})


//  题库页面
app.get("/Takeooo", function(request, respon) {
	logReg.questionDe(request,respon);
});


// 分数提交记录
app.post('/fraction',function(req,res){
	logReg.recordScores(req,res);
})

// 学生查看分数
app.get('/secScore',function(req,res){
	logReg.selectScore(req,res);
})

app.listen(7533);
console.info("服务器启动成功");