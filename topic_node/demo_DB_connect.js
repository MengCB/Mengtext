// connect.js
const mysql = require("mysql");

const connection = mysql.createConnection({
	host: "localhost", // 主机地址
	user: "root", // 数据库用户名
	password: "", // 数据库用户密码
	database: "men" // 数据库名
});
connection.connect(); // 数据库连接

// 编写一端插入一条记录的代码
// 插入 insert into Person(name) values('wu')
connection.query("insert into Person(name) values('zhang')",
	function(error, results, fields) {
		if (error) {
			throw error;
		} else {
			console.info('插入结果:', results);
		}
	});

connection.query('select * from Person where id = 1',
	function(error, results, fields) {
		if (error) {
			throw error;
		} else {
			// console.log('Thesolution;',results[0])
			console.info('查询结果:', results);
		}
	}); // 检验链接成功

