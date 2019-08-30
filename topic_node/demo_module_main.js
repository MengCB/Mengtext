var url = require('url');
var hello = require('./demo_module_hello'); 
// 因为是自己定义的模块所以需要把地址写上
hello.world();

hello.meng();

hello.showParameters();

// var req = "我是req";
// var res = "我是res";
// hello.usingParameter( req, res );

// 写死,但是实际上,这个urlString 应该来自? request.url
var urlString = "http://www.mengcb.com/web/index.html?meng=chenggongrenshi";

var urlObj = url.parse(urlString);

hello.usingParameter( urlObj );
