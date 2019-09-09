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
