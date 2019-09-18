
var connection = null;
function connectMysql(){
	const mysql = require('mysql');
	connection = mysql.createConnection({
		host: "localhost", // 主机地址
		user: "root", // 数据库用户名
		password: "", // 数据库用户密码
		database: "testquestion" // 数据库名
	});
	connection.connect(); // 数据库连接
	
}
exports.connectMysql = connectMysql;


// 学生注册
function stuRegister(req,res){
	connection.query('select * from students where username="' + req.body.username + '" limit 1;',function(err,result,file){
		if(err){
			
		}else{
			if(result.length>0){
				res.json({'ok':false});
			}else{
				var sqlString = 'insert into students(username,userpassword) values("' + req.body.username +'","'+ req.body.userpassword + '");';
				connection.query(sqlString,function(err,results,file){
					if(err){
						res.json({'ok':false});
					}else{
						res.json({'ok':true});
					}
				})
			}
		}
	});
	
};
exports.stuRegister = stuRegister;

// 学生登录
function stuLogin(req,res){
	var sqlString = 'select * from students where username="' + req.body.userName + '" and userpassword="' + req.body.userPassword +
		'" limit 1';
	
	connection.query(sqlString, function(err, results, file) {
		if (err) {
			res.json({
				'ok': false
			});
		}else if(results.length<=0){
			res.json({
				'ok': false
			});
		}

		else {
			if(results[0].username == req.body.userName&&results[0].userpassword == req.body.userPassword){
				var sess = req.session;
				sess.userName = req.body.userName;
				res.json({
					'ok': true,
					'score':results[0].userscore
				});
			}else{
				res.json({
					'ok': false
				});
			}
		}
	})
}
exports.stuLogin = stuLogin;

// 教师登录
function teachLogin(req,res){
	var sqlString = 'select * from teacher where username="' + req.body.userName + '" and userpassword="' + req.body.userPassword +
		'" limit 1';
	
	connection.query(sqlString, function(err, results, file) {
		if (err) {
			res.json({
				'ok': false
			});
		}else if(results.length<=0){
			res.json({
				'ok': false
			});
		} else {
			if(results[0].username == req.body.userName&&results[0].userpassword == req.body.userPassword){
				var sess = req.session;
				sess.userName = req.body.userName;
				res.json({
					'ok': true,
					'score':results[0].userscore
				});
			}else{
				res.json({
					'ok': false
				});
			}
		}
	})
}
exports.teachLogin = teachLogin;

//题目录入
function Ques(req,res){
	var sqlString = 'insert into question(testtitle,optionsA,optionsB,optionsC,optionsD,answer,kind) values("' + req.body.testtitle +'","'+ req.body.optionsA + '","'+ req.body.optionsB + '","'+ req.body.optionsC + '","'+ req.body.optionsD + '","'+ req.body.answer + '","'+ req.body.kind + '");';
	connection.query(sqlString,function(err,results,file){
		if(err){
			res.json({'ok':false});
		}else{
			res.json({'ok':true});
		}
	})
}
exports.Ques = Ques;

// 校验登录状态的模块
function checkLogin(req) {
	var sess = req.session;
	if (!sess.userName) {
		return false;
	} else {
		return true;
	}
}

exports.checkLogin = checkLogin;

// 考试页面随机出题
function exQuestion(request,respon){
	var tempArr = [];// 中间存放数组
	var count01 = 0;// 计数
	var sqlStrArr = ["js","html","jq"];// 题目类型
	for(var i = 0; i<sqlStrArr.length; i++){
		var sqlString = 'select * from question where kind ="'+ sqlStrArr[i] +'";';
		connection.query(sqlString, function(err, result, file) {
				if (err) {
					console.info(err);
				} else {
					if(result.length <= 3 ){
							tempArr = tempArr.concat(result);
					}else{
						for(var i =0 ; i<3; i++){
							var tempRam = Math.floor(Math.random()*result.length);
							var pushMember = result.splice(tempRam,1);
							 tempArr = tempArr.concat(pushMember);
						}
					}
					count01++;
					if(count01 == 3){
						respon.json(tempArr);
					}
				}
		});
	}
}
exports.exQuestion = exQuestion;

// 考试倒计时
function countDown(req,res){
	var sess = req.session;
	if(!sess.startTime){
		sess.startTime = new Date().getTime();
		sess.showTime = 30;
		console.info("开始考试时间："+sess.startTime);
		var sqlString = 'update students set time="'+ sess.startTime + '" where username="' + sess.userName +'";';
		 connection.query(sqlString,function(err,result,file){
			 if(err){
				console.info(err); 
			 }else{
				 console.info("开始考试！");
				 res.json({
					 'start':"开始计时",
					 'showTime':sess.showTime
				 })
			 }
		 })
	}else{
		var currTime = new Date().getTime();
		console.info("当前时间："+currTime);
		var sqlString = 'select * from students where username="' + sess.userName + '" and time="' + sess.startTime + '";';
		connection.query(sqlString,function(err,result,file){
			if(err){
				console.info(err);
			}else{
				res.json({
					'showTime':sess.showTime-1
				})
				if((currTime-parseInt(result[0].time))>=180000){
					res.json({
						'ok':true
					});
					console.info("考试时间到！");
				}
			}
		})
	}
}
exports.countDown = countDown; 



//  去数据取题到题库

function questionDe(request,respon){
	var count01 = 0;// 计数
	var tempArr = [];
	var sqlStrArr = ["js","html","jq"];// 题目类型
	for(var i = 0; i<sqlStrArr.length; i++){
		var sqlString = 'select * from question where kind ="'+ sqlStrArr[i] +'";';
		connection.query(sqlString, function(err, result, file) {
				if (err) {
					console.info(err);
				} else {
					count01 = count01 + 1;
					if(count01 == 1){
						tempArr = tempArr.concat(result);
					}else if(count01 == 2){
						tempArr = tempArr.concat(result);
					}else if(count01 == 3){
						tempArr = tempArr.concat(result);
						respon.json(tempArr);
					}
				}
		});
	}
}
exports.questionDe = questionDe;

// 提交分数到数据库
function recordScores(req,res){
	var sess = req.session;
	var sqlString = 'update students set userscore="' + req.body.userscore + '" where username="' + sess.userName + '";';
	connection.query(sqlString,function(err,results,file){
		if(err){
			console.info(err);
			res.json({'ok':false});
		}else{
			res.json({'ok':true});
		}
	});
}
exports.recordScores = recordScores;

// 学生查看分数信息
function selectScore(req,res){
	var sess = req.session;
	var sqlString = 'select * from students where username="' + sess.userName + '" ;';
	connection.query(sqlString,function(err,result,file){
		if(err){
			console.info(err);
			res.json({'ok':false});
		}else{
			res.json({
				'ok':true,
				'score':result[0].userscore
			})
		}
	})
}
exports.selectScore = selectScore;