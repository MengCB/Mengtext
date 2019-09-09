$.ajax({
	async: false,
	url: "/cleck_Login",
	type: "get",
	dataType: 'json',
	data: {},
	success: function(res) {
		if (res.ok) {
			//
		} else {
			alert("您未登录");
			window.location = "/web/index.html";
		}
	},
	error: function(a, b) {
		alert(a);
	}
});



var app5 = new Vue({
	el: '#app-5',
	data: {},
	// 方法集
	methods: {
		delogout: function() {
			$.ajax({
				url: "/logout",
				type: 'post',
				dataType: 'json',
				success: function(res) {
					console.info("注销成功");
					// alert("注销成功");
				},
				error: function(a, b) {
					alert(a);
				}
			});
		}
	}
});
