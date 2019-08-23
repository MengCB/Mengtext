var fs = require("fs");
fs.readFile('text.txt', function(err, data) {
	if (err) {
		return console.error(err);
	} else {
		console.log(data.toString());
	}
});
console.log("程序执行结束！，留意本行和输出时序");
