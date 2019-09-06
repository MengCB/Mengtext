//校验登录状态的模块
function checkLogin( request ){
	var sess = request.session;
	if(!sess.userName){
		return false;
	}else{
		return true;
	}
}

exports.checkLogin = checkLogin;