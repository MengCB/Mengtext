// exports是一个标准对外接口(使得require它的模块(实例化)可以直接使用它

// 模块只做声明不做执行!!! -- 模块开发的原则!!!
exports.world = function(){
	console.info("Hello world");
}

// exports的属性不受限制
exports.meng = function(){
	console.info("你好!meng.........");
}

// 内部的变量不会暴露
var foo = 'mmmm';

function showParameters(){
	var bar = foo +"ccccc";
	console.info(bar);
}

exports.showParameters = showParameters;


// 附加 参数的使用
function usingParameter( url ){
	console.info( url );
	console.info( url.pathname );
}

exports.usingParameter = usingParameter;