/*
ws 对象详解(重要)

https://www.jianshu.com/p/8c471f33989a


1. 客户端使用websocket对象, h5自带
2. 服务端需要依赖'ws'模块
3. 模块参数: port, verifyClient  // 主要这两个属性
4. 实现单播的简单模型
5. 实现广播的模型 - 参考ws_private代码

//let user = {}; //存储连接用户
// 广播
//	wss.clients.forEach(function each(client) {
				if (client !== ws && client.readyState === WebSocket.OPEN) {
					client.send(msg);
				}
			});
6. 注意事项: send函数只接受字符串或者流, 对象需要另转
*/
const allData = []; // 缓存消息
const WebSocket = require('ws');
const wss = new WebSocket.Server({
	port: 3000
});

wss.on('connection', function(ws) {
	console.info('有新的连接');
	console.info("当前连接数 = " + wss.clients.size); // 所有的客户端,存在一个set结构中

	ws.on('message', function(message) {
		console.info('收到客户端信息 :' + message);
		allData.push(message);
		//var text4return = refreshData(message);
		// 单发
		//ws.send( text4return );
		// 群发/广播
		wss.clients.forEach(function each(client) {
			//if (client !== ws && client.readyState === WebSocket.OPEN) {
			if ( client.readyState === WebSocket.OPEN) {				
				client.send("\n" + message + "\n");
			}
		});
	});
	ws.send('服务器连接成功, 可以开始匿名聊天, ps: 可以骂人,逮不找你');
});


// 接收到用户的信息, 存起来, 一起返回给客户端
function refreshData(mess) {
	allData.push(mess);
	var text4return = '';
	for (var i = 0; i < allData.length; i++) {
		text4return += allData[i] + "\n";
	}

	return text4return;
}


// 作业1 : 聊天信息存在数据库里边
// 作业2: 要区分聊天人的信息
// 作业3: 不要每次都返回所有聊天信息, 而是返回最后发表的消息

// --1. 数据库 , 2, 消息群发 3. 只返回最新消息 refreshData()得改!  ***4.识别用户 - 私聊 5. 用web服务器来作业面,实现局域网聊天
