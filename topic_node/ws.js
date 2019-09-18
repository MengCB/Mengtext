var url = require('url');
const mysql = require("mysql");

const connection = mysql.createConnection({
	host: "localhost", // 主机地址
	user: "root", // 数据库用户名
	password: "", // 数据库用户密码
	database: "men" // 数据库名
});
connection.connect(); // 数据库连接

const allData = []; // 缓存消息
const WebSocket = require('ws');
const wss = new WebSocket.Server({
	port: 3000,
	verifyClient: function(info) {
		// 取得发起(双向连接)那个标枪带过来的信息,进行校验
		let urlxxx = info.req.url;
		var queryObj = url.parse(urlxxx, true).query;
		// console.info(queryObj);
		if (queryObj.passCode && queryObj.passCode == '3344' && queryObj.name) {
			return true;
		} else {
			return false;
		}
	}
}, function() {
	console.info("socket开始监听3000端口");
});

var allClient = [];

wss.on('connection', function(ws, request) {
	// console.info("有新的连接");
	console.info("当前连接数 = " + wss.clients.size); // 所有的客户端.存在一个set结构中

	let urlxxx = request.url;
	var queryObj = url.parse(urlxxx, true).query;
	console.info(queryObj);
	
	ws.queryObj = queryObj;
	allClient.push( ws );
	// console.info(allClient);
	
	ws.on('message', function(message) {
		console.info('收到客户端信息 :' + message);
		allData.push(message);
		 // 聊天信息存在数据库
		connection.query('insert into person(name, record) values("'+ queryObj.name +'","'+ message +'");',
			function(error, results, fields) {
				if (error) {
					throw error;
				} else {
					// console.info('保存成功');
				}
			});
		
		// var text4return = refreshData( message );
		// 单发
		// ws.send( text4return );
		
		// 群发/广播
		wss.clients.forEach(function each(client) {

			// if(client !== ws && client.readyState === WebSocket.OPEN){
			if (client.readyState === WebSocket.OPEN) {
				client.send("\n" + queryObj.name +":"+ message + "\n");
			}
		});
        
		// 私聊
		// for(var j=0; j< allClient.length; j++){
		// 	if( allClient[j].queryObj.name == '蒙承彪' ){
		// 		
		// 		allClient[j].send("\n"+ queryObj.name+":" + message + "\n");
		// 	}
		// }

	});
	ws.send('服务器连接成功,可以开始聊天,ps:随便尼玛');
});

// 收到用户的信息,存起来一起返回去给客户端
function refreshData(mess) {
	allData.push(mess);
	var text4return = '';
	for (var i = 0; i < allData.length; i++) {
		text4return += allData[i] + "\n";
	}
    console.info(text4return);
	return text4return;
}


// 作业1 聊天信息存在数据库里边
// 作业2 要区分聊天人的信息
// 作业3 不要每次都返回所有聊天信息,而是返回最后发表的信息

// --1. 数据库  2. 消息群发 3. 只返回最新消息 refreshData()修改! ****4.识别用户
// 5. 用web服务器来做作业面,实现局域网聊天


// 论Socket的建立过程
// 发送了一个HTTP请求
