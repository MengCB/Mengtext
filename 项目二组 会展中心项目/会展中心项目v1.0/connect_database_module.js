var connection = null;

function connectionData() {
	var mysql = require('mysql');
	connection = mysql.createConnection({
		host: "localhost", // 主机地址
		port: 3306, // 如果修改了数据库的默认端口，这个属性不可忽略
		user: "root", // 数据库用户名
		password: "", // 数据库用户密码
		database: "shang" // 数据库名
	});
	connection.connect();
}
exports.connectionData = connectionData;

// 查询展厅信息
function exhibition(request, response) {
	var sqlString = "select teh_area,companyName,elapsedTime,teh_price from tehInformation where teh_name= '" + request.query
		.tehName + "'";
	connection.query(sqlString, function(err, result, file) {
		// console.info(result[0].companyName);
		if (err) {
			response.json({
				"ok": false
			});
		} else if (result.length <= 0) {
			response.json({
				"ok": false
			});
		} else {
			response.json({
				"ok": true,
				"companyName": result[0].companyName,
				"teh_area": result[0].teh_area,
				"elapsedTime": result[0].elapsedTime,
				"teh_price": result[0].teh_price
			});
		}


	});
}
exports.exhibition = exhibition;

// 查询申请列表
function searchApplication(request, response) {
	var sqlString = "select * from subs";
	connection.query(sqlString, function(err, result, file) {
		if (err) {
			response.json({
				"ok": false
			});
		} else if (result.length <= 0) {
			response.json({
				"ok": false
			});
		} else {
			response.json({
				"ok": true,
				"theApply": result
			});
		}
	});
}
exports.searchApplication = searchApplication;


//同意申请,发射信息到展厅信息
function InformationStorage(request, response) {
	var sqlString01 = "select * from subs where id=" + request.query.applyId;
	connection.query(sqlString01, function(err, result, file) {
		if (err) {
			response.json({
				"ok": false
			});
		} else if (result.length <= 0) {
			response.json({
				"ok": false
			});
		} else {
			var sqlString02 = "update tehInformation set companyName='" + result[0].companyName + "',elapsedTime='" + result[0]
				.elapsedTime +
				"',teh_price='" + result[0].teh_price + "' where teh_name='" + result[0].teh_name + "'"
			connection.query(sqlString02, function(err, result, file) {
				if (err) {
					response.json({
						"ok": false
					});
				} else if (result.length <= 0) {
					response.json({
						"ok": false
					});
				} else {
					response.json({
						"ok": true,
					});
				}
			});
			var sqlString = "delete from subs where id = '" + request.query.applyId + "'";
			connection.query(sqlString, function(err, result, file) {
			});
			
		}
	});
}

exports.InformationStorage = InformationStorage;

// 拒绝申请 //删除申请记录
function refuseToApply(request, response) {
	var sqlString = "delete from subs where id = '" + request.query.applyId + "'";
	connection.query(sqlString, function(err, result, file) {
		if (err) {
			response.json({
				"ok": false
			});
		} else if (result.length <= 0) {
			response.json({
				"ok": false
			});
		} else {
			response.json({
				"ok": true,
			});
		}
	});
}

exports.refuseToApply = refuseToApply;


// 登录
function memberLogin(request, respon) {
	var sqlString = 'select * from user where user_name = "' + request.body.userName + '" and user_password="' + request
		.body.userPassword + '" limit 1';
	connection.query(sqlString, function(err, result, file) {
		if (err) {
			respon.json({
				"ok": false
			});
		} else if (result.length<=0) {
			respon.json({
				"ok": false
			});
		} else {
			if(!(request.body.userName == result[0].user_name && request.body.userPassword ==  result[0].user_password)){
				respon.json({
					"ok": false
				});
			}else{
				// 登录成功, 要改session
				var sess = request.session;
				sess.userName = request.body.userName;
				respon.json({
					"ok": true,
				});
			}
			
		}
	});
}
exports.memberLogin = memberLogin;


function mbRegistered(request, respon) {

	// 查询数据库, 看看用户名和密码是否匹配
	var sqlString = 'insert into user(user_name,user_password) values("' + request.body.userName + '","' + request.body
		.userPassword +
		'")';
	connection.query('select * from user where user_name ="' + request.body.userName + '"', function(error, result,
		file) {
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
					var sess = request.session;
					sess.userName = request.body.userName;
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

}

exports.mbRegistered = mbRegistered;

// 申请表
function appointment(request, respon) {
	var sqlInsert = 'insert into subs(companyName,elapsedTime,teh_price,teh_name) values("' + request.body.companyName +
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
}

exports.appointment = appointment;


function checkLogin(req) {
	var sess = req.session;
	if (!sess.userName) {
		return false;
	} else {
		return true;
	}
}

exports.checkLogin = checkLogin;

// 管理员登录
function administrator(request, respon) {
	var sqlString = 'select * from user where user_name = "' + request.body.adName + '" and user_password="' + request
		.body.adPassword + '" and serialNumber="' + request.body.adNumber + '" limit 1';
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
			respon.json({
				"ok": true
			});
		}
	});
}
exports.administrator = administrator;

// 修改展厅信息
function mdTheShowroom(request, response) {
	var sqlString = 'update tehInformation set elapsedTime="' + request.body.userTime + '", teh_price="' + request.body.userPrices +
		'" , companyName="' + request.body.userConpyname + '"where teh_name="' + request.body.subsName + '"';
	connection.query(sqlString, function(err, result, file) {
		if (err) {
			response.json({
				"ok": false
			});
		} else if (result.length <= 0) {
			response.json({
				"ok": false
			});
		} else {
			response.json({
				"ok": true
			});
		}
	});
}
exports.mdTheShowroom = mdTheShowroom;

//校验登录状态的模块
function check_Login(req) {
	var sess = req.session;
	if (!sess.userName) {
		return false;
	} else {
		return true;
	}
}
exports.check_Login = check_Login;
