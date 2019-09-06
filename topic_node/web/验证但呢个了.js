			$.ajax({
				async: false,
				url: "/checkLogin",
				type: "get",
				dataType: 'json',
				data: {},
				success: function(res) {
					if (res.ok) {
						//
					} else {
						//未登录
						// alert("您未登录");
						console.info("未登录");
					}
				},
				error: function(a, b) {
					alert(a);
				}
			});