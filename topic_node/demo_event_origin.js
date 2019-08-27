// 事件跟事件的触发,可以自定义事件名称
'use strict';
const events = require('events'); // 引入模块

var eventEmitter = new events.EventEmitter(); // 创建eventEmitter对象 提供触发器
// xsmdxssssss 为事件名称
eventEmitter.on('xsmdxssssss',function(){
	console.info( new Date().toLocaleString() );
});
console.info("两秒后触发事件");
setTimeout(function(){
	// 触发事件
	eventEmitter.emit('xsmdxssssss');
},2000)

