
$("#apList").click(function() {
			$.ajax({
				url: "/apply",
				type: "get",
				dataType: "json",
				data: {},
				success: function(res) {
					var app4 = new Vue({
						el: '#applyList',
						data: {
							message: "appList",
							todos: res.theApply
						},
						methods: {
							greet: function(todaDate,event) {
								applyId = todaDate.id;
								$.ajax({
									url: "/queryApply",
									type: "get",
									dataType: "json",
									data: {
										"applyId":applyId
									},
									success:function(res){
										console.info()
									},
									error:function(){
										
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


































//点击样式
//...............................................................................................................
	$("#appear").click(function(){
		$("#apply_content").css({
			visibility: "visible",
		})
	})
	$("#disappear").click(function(){
		$("#apply_content").css({
			visibility: "hidden",
		})
	})


	$("#F1").click(def());
	function def(){
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
	$("#F1").click(function(){
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
	$("#F2").click(function(){
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
	$("#F3").click(function(){
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
	});
	window.onload = function(){
		$("#F1").click(def());
	}
