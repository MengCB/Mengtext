'use strict';
const events = require('events'); // 引入模块

var eventEmitter = new events.EventEmitter(); // 创建eventEmitter对象 提供触发器

eventEmitter.on('xxx', function() {
	console.info(new Date().toLocaleString());
});
eventEmitter.on('ggg', function() {
	console.info(new Date().getTime());
});
var i = 0;
var timer1 = setInterval(function() {
	if (i < 5) {
		eventEmitter.emit('xxx');
	} else if (i >= 5 && i < 10) {
		eventEmitter.emit('ggg');
	} else if (i >= 10 && i < 15) {
		eventEmitter.emit('xxx');
	} else {
		console.info("停止输出");
		clearInterval(timer1);
	}
	i++;
},2000);

// 作业:
// 写一个计时器,每 2 秒触发某事件,这个事件响应是,
// 打印当前时间的字符串new Date().toLocaleString(),打印5次以后,
// 触发另一个事件 变成打印当前时间字符串的毫秒数new Date().getTime(),
// 又打印五次后,恢复成打印时间字符串,打印5次后,输出"停止输出",并关掉计时器
