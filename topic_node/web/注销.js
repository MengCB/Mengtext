	
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
						if(res.logout){
							alert("注销成功");
						}else{
							alert("注销失败");
						}
					},
					error: function(a, b) {
						alert(a);
					}
				});
			}
		}
	});