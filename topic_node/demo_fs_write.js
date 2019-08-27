'use strict';
var fs = require('fs');
var data = "原来的数据\n	";
fs.writeFile('output.txt',data,function(err){
	if(err){
		console.info(data);
	}else{
		console.info("完成");
	}
})

// => 回调函数 function(err){}
var newwrite = "追加的数据\n";
fs.appendFile('output.txt', newwrite,function(err) {
  if (err){
	  throw err;
  } else{
	  console.log('数据已追加到文件');
  }
});