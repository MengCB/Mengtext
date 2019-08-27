var fs = require("fs");
// 阻塞代码实例,读取文件的代码阻塞执行,后边的代码等待
// 注意:读取文件需要时间

// 同步读取readFileSync
var data = fs.readFileSync('tempfile.txt', function(err, data){
	if(err){
		return console.error(err);
	}else{
		console.log(data.toString());
	}
});
console.log("程序执行结束!");