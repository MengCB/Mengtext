$("#appear").click(function() {
	$.ajax({
		url: "/apply",
		type: "get",
		dataType: "json",
		data: {},
		success: function(res) {
			var app4 = new Vue({
				el: '#apply_content',
				data: {
					message: "appList",
					todos: res.theApply
				},
				methods: {
					greet: function(todaDate, event) {
						applyId = todaDate.id;
						$.ajax({
							url: "/queryApply",
							type: "get",
							dataType: "json",
							data: {
								"applyId": applyId
							},
							success: function(res) {
								alert("修改成功!!")
								window.location = "/web/Admin_interface.html";
							},
							error: function() {
								alert("修改失败");
								window.location = "/web/Admin_interface.html";
							}
						})
					},
					refused: function(todaDate, event) {
						applyId = todaDate.id;
						$.ajax({
							url: "/refuseApply",
							type: "get",
							dataType: "json",
							data: {
								"applyId": applyId
							},
							success: function(res) {
								if (res.ok) {
									alert("修改成功!!")
									window.location = "/web/Admin_interface.html";
								}
							},
							error: function() {

							}
						})
					}
				}
			})
		},
		error: function(a, b) {

		}
	});
});

$("#admin_update").click(function() {
	var subsName = $("#subsName").val();
	var userConpyname = $("#userConpyname").val();
	var userTime = $("#userTime").val();
	var userPrices = $("#userPrices").val();
	$.ajax({
		url: "/admin_update",
		type: "post",
		dataType: "json",
		data: {
			"subsName": subsName,
			"userConpyname": userConpyname,
			"userTime": userTime,
			"userPrices": userPrices
		},
		success: function(res) {
			if (res.ok) {
				alert("修改成功!!")
				window.location = "/web/Admin_interface.html";

			} else {
				alert("修改失败!!");
				window.location = "/web/Admin_interface.html";
			}
		},
		error: function(a, b) {
			console.info(a);
		},

	});
})



















//点击样式
//...............................................................................................................
$("#appear").click(function() {
	$("#apply_content").css({
		visibility: "visible",
	})
})
$("#disappear").click(function() {
	$("#apply_content").css({
		visibility: "hidden",
	})
})

$("#appear").click(function() {
	$("#disappear").css({
		visibility: "visible",
	})
})
$("#disappear").click(function() {
	$("#disappear").css({
		visibility: "hidden",
	})
})



$("#F1").click(def());

function def() {
	$("#F1").css({
		background: "rgba(70, 100, 190, 0.6)",
	})
	$("#F2").css({
		backgroundColor: "",
	})
	$("#F3").css({
		backgroundColor: "",
	})
	$("#right_1").css({
		visibility: "visible",
	})
	$("#right_2").css({
		visibility: "hidden",
	})
	$("#right_3").css({
		visibility: "hidden",
	})

}
$("#F1").click(function() {
	$("#F1").css({
		background: "rgba(70, 100, 190, 0.6)",
	})
	$("#F2").css({
		backgroundColor: "",
	})
	$("#F3").css({
		backgroundColor: "",
	})
	$("#right_1").css({
		visibility: "visible",
	})
	$("#right_2").css({
		visibility: "hidden",
	})
	$("#right_3").css({
		visibility: "hidden",
	})
})
$("#F2").click(function() {
	$("#F2").css({
		background: "rgba(70, 100, 190, 0.6)",
	})
	$("#F1").css({
		backgroundColor: "",
	})
	$("#F3").css({
		backgroundColor: "",
	})
	$("#right_2").css({
		visibility: "visible",
	})
	$("#right_1").css({
		visibility: "hidden",
	})
	$("#right_3").css({
		visibility: "hidden",
	})
});
$("#F3").click(ffff());
function ffff() {
	$("#F3").css({
		background: "rgba(70, 100, 190, 0.6)",
	})
	$("#F2").css({
		backgroundColor: "",
	})
	$("#F1").css({
		backgroundColor: "",
	})
	$("#right_3").css({
		visibility: "visible",
	})
	$("#right_2").css({
		visibility: "hidden",
	})
	$("#right_1").css({
		visibility: "hidden",
	})
}
window.onload = function() {
	$("#F3").click(ffff());
}
