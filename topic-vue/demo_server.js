var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');
const querystring = require('querystring');
var url = require('url');
const mysql = require("mysql");
app.use(bodyParser.urlencoded({
	extended: false
}));

var multer = require('multer');
app.use('/temp', express.static('temp'));
app.use(multer({
	dest: '/tmp/'
}).any());

app.get('/', function(req, res) {
	res.sendFile(__dirname + "/demo_form_vue.html");
	// index.html中,引用jquery,js,这时候要注意,基于/ ,而不是/web
})
// 数据库支持-----------------------
const connection = mysql.createConnection({
	host: "localhost", //主机地址
	port: 3306, // 如果修改了数据库的默认端口3306, 这个属性不可忽略
	user: "root", //数据库用户名
	password: "", //数据库用户密码
	database: "men" //数据库名
});
connection.connect(); //数据库连接

// 模糊查询(搜索)
app.post("/searchStudent", function(request, respon) {
	var queryObj = request.body;
	console.info(queryObj.searchValue);
	if (!queryObj || !queryObj.searchValue) {
		respon.json({
			status: "no",
			data: {
				info: "无输入"
			}
		});
	} else {
		connection.query(" select * from student where name ='" + queryObj.searchValue + "'", function(error,
			results, fields) {
			if (error) {
				throw error;
			} else {
				respon.json(results[0]);
			}

		});
	}

});

// 模糊查询person
app.get("/searchperson", function(request, respon) {
	var queryObj = url.parse(request.url, true).query;
	console.info(queryObj);
	if( !queryObj  || !queryObj.pName){
		
		respon.json({
			status: "no",
			data: {
				info: "无输入"
			}
		});
		return;
	}
	
	connection.query(" select name, id from student where name like '%"+ queryObj.pName  +"%'", function( error, results,fields) {
		if(error){
			throw error;
		}else{
			respon.json({
				status: "ok",
				data: {
					likePersons: results
				}
			});
		}

	});
});


// 获取单个person信息
app.get("/getPersonById", function(request, respon) {
	var queryObj = url.parse(request.url, true).query;
	if (!queryObj.personId) {
		respon.json({
			status: 'no',
			data: {
				info: "当前请求的参数不完整"
			}
		});
		return;
	}
	connection.query('select * from student where id = "' + queryObj.personId + '"limit 1', function(error, results,fields) {
		
		if (error) {
			throw error;
		} else {
			// console.info(results);
			respon.json({
				status: "ok",
				data: {
					person: results[0]
				}
			});
		}
	});
});


// 获取全部person信息
app.get("/getAllPerson", function(request, respon) {
	connection.query('select * from student', function(error, results, fields) {
		if (error) {
			throw error;
		} else {
			respon.json({
				status: "ok",
				data: {
					allPerson: results
				}
			});
		}
	});

});



// 新增信息
app.post('/insertStudent', function(request, respon) {
	let filePath = "0.jpg";
	if (request.files || request.files.length > 0) {
		filePath = new Date().getTime() + "-" + request.files[0].originalname;
		let des_file = __dirname + "/temp/" + filePath;
		console.info(filePath);
		fs.readFile(request.files[0].path, function(err, data) {
			fs.writeFile(des_file, data, function(err) {
				if (err) {
					console.log(err);
				} else {
					console.info("文件保存成功");
				}
			});
		});
	}
	var inserSql = 'insert into student(name,age,tel,address,email,remark,hobby,imagepath) values("' + request.body.name +
		'","' + request.body.age + '","' + request.body.tel + '","' + request.body.address + '","' + request.body.email +
		'","' + request.body.remark + '","' + request.body.hobby + '","' + filePath + '")';
	connection.query(inserSql, function(error, results, fields) {});
});




app.listen(7070);

console.info("服务器已启动");
