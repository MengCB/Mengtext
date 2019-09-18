var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var app = express();
app.use(cookieParser());

var checkLogin = require("./check_login");

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
	extended:false
}));

const mysql = require("mysql");
const connection = mysql.createConnection({
	host:"localhost",
	port: 3306,
	user:"root",
	password:"",
	database:"shiyihang"
});

connection.connect();

app.use('/web',express.static('web'));
app.use('/map',express.static('map'));
app.use('/bootstrap',express.static('bootstrap'));


const hour = 1000*60*60;
var sessionOpts ={
	secret:'a cool secret',
	resave:true,
	saveUninitialized:true,
	key: 'myapp_sid',
	
	cookie:{
		maxAge: hour * 2,
		secure: false
	}
}

app.use(session(sessionOpts));

//处理登录
app.post("/copslogin", function(request, respon){
	// console.info(request.body);
	
	//查询数据库，检查用户名和密码是否匹配
	var sqlString = 'select * from cops where cop_name = "' + request.body.copName + '" and cop_password="'+ request.body.copPassword +'" limit 1';
	
	connection.query(sqlString, function(err, result, file){

		if(err){
			respon.json({"ok":false});
		}else if(result.length <= 0){
			respon.json({"ok":false});
		}else{
			//登录成功，要改session
			var sess = request.session;
			sess.copName = request.body.copName;
			respon.json({
				"ok":true
			});
		}
	});
})


app.get('/checkLogin',function(req,res){
	console.info("checkLogin :" + req.session.copName);
	console.info(checkLogin.checkLogin(req));
	if(checkLogin.checkLogin(req)){
		var sess = req.session;
		res.json({
			"ok": true,
			"logName":sess.copName
		});
	}else{
		res.json({
			"ok": false,
		});
	}
});

app.get('/', function(req, res){
	var sess = req.session;
	// 用户姓名
	if(!checkLogin.checkLogin(req)){
		res.sendFile(__dirname + "/web/copslogin.html");
	}else{
		res.sendFile(__dirname + "/map/map.html");
	}
});



app.get('/secName',function(req,res){
	var sess = req.session;
	var sqlString = 'select * from cops;';
	connection.query(sqlString,function(err,result,file){
		if(err){
			console.info(err);
			res.json({'ok':false});
		}else{
			res.json({
				'ok':true,
				'result':result,
				// 'id':result[0].cop_id,
				// 'desc':result[0].cop_desc
			});
		}
	})
})

//登出
app.get('/logout', function(req, res) {
	var sess = req.session;
	delete sess.copName;
	res.json({"logout":true});
	// res.sendFile(__dirname + '/web/login.html');
	
})

//注册
app.post('/toEnroll', function(req, res) {

	if (!req.body.userName || !req.body.userPassword) {
		res.json({
			"ok": false,
			"info": "请输入姓名和密码"
		});
		return;
	}

	var sqlStringInsert = 'insert into cops (cop_name,  cop_password, cop_desc) values("' + req.body.userName +
		'", "' +
		req.body.userPassword + '" , "' + req.body.userDesc + '")';
	connection.query(sqlStringInsert, function(err, results, file) {
		console.info(results);
		console.info(req.body.userName.length);
		if (err) {
			console.info("cuowu");
		} else if (!req.body.userName.length == req.body.userName) {
			res.json({
				"ok": false,
				"info": "该用户名已存在,请输入其他用户名"
			});
			return;
		} else {
			res.json({
				"ok": true,
				"info": "注册成功"
			});
		}
	});

});

//// 返回登录用户名地图界面
app.get("/userName", function(req, res) {
	if(req.body.copName) {
		res.json("欢迎:" + req.body.copName + "来到警务系统");
	}
});

// 返回登录用户名排班表界面
app.get("/tableName", function(req, res) {
	if(req.body.copName) {
		res.json("欢迎:" + req.body.copName + " 同志来到排班表界面");
	}
});


app.listen(7777);
console.log("服务器启动");