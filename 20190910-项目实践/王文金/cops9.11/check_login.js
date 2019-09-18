// 校验登陆状态的模块
function checkLogin(req){
	var sess = req.session;
	if(!sess.copName){
		return false;
	}else{
		return true;
	}
}

exports.checkLogin = checkLogin;

