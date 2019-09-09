//校验登录状态的模块
function checkLogin( request ){
	var sess = request.session;
	console.info(sess.length);
	if(!sess.userName){
		return false;
		// console.info(false);
	}else{
		return true;
		// console.info(true);
	}
}

exports.checkLogin = checkLogin;