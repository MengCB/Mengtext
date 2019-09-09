$("#reserve_appear").click(function() {
	$("#reserve").css({
		visibility: "visible",
	})
})
$("#reserve_disappear").click(function() {
	$("#reserve").css({
		visibility: "hidden",
	})
})
$("#reserve_appear").click(function(){
	$("#reserve_disappear").css({
		visibility: "visible",
	})
})
$("#reserve_disappear").click(function(){
	$("#reserve_disappear").css({
		visibility: "hidden",
	})
})

$("#F3").click(function() {
	$("#F3").css({
		background: "rgba(70, 100, 190, 0.6)",
	})
	$("#F2").css({
		backgroundColor: "",
	})
	$("#F1").css({
		backgroundColor: "",
	})
	$("#content").css({
		visibility: "visible",
		zIndex: "999",
	})
	$("#content01").css({
		visibility: "hidden",
		zIndex: "-999",
	})
	$("#content02").css({
		visibility: "hidden",
		zIndex: "-999",
	})


})
$("#zt1").click(function() {
	$("#zt1").css({
		background: "rgba(70, 100, 190, 0.6)",
	})
	$("#zt2").css({
		backgroundColor: "",
	})
	$("#zt3").css({
		backgroundColor: "",
	})
	$("#pic1").css({
		visibility: "visible",
	})
	$("#pic2").css({
		visibility: "hidden",
	})
	$("#pic3").css({
		visibility: "hidden",
	})
})
$("#zt2").click(function() {
	$("#zt2").css({
		background: "rgba(70, 100, 190, 0.6)",
	})
	$("#zt1").css({
		backgroundColor: "",
	})
	$("#zt3").css({
		backgroundColor: "",
	})
	$("#pic2").css({
		visibility: "visible",
	})
	$("#pic3").css({
		visibility: "hidden",
	})
	$("#pic1").css({
		visibility: "hidden",
	})
})
$("#zt3").click(function() {
	$("#zt3").css({
		background: "rgba(70, 100, 190, 0.6)",
	})
	$("#zt1").css({
		backgroundColor: "",
	})
	$("#zt2").css({
		backgroundColor: "",
	})
	$("#pic3").css({
		visibility: "visible",
	})
	$("#pic2").css({
		visibility: "hidden",
	})
	$("#pic1").css({
		visibility: "hidden",
	})
})




$("#F2").click(function() {
	$("#F2").css({
		background: "rgba(70, 100, 190, 0.6)",
	})
	$("#F3").css({
		backgroundColor: "",
	})
	$("#F1").css({
		backgroundColor: "",
	})
	$("#content").css({
		visibility: "hidden",
		zIndex: "-999",
	})
	$("#content01").css({
		visibility: "visible",
		zIndex: "999",
	})
	$("#content02").css({
		visibility: "hidden",
		zIndex: "-999",
	})
})
$("#ztt1").click(function() {
	$("#ztt1").css({
		background: "rgba(70, 100, 190, 0.6)",
	})
	$("#ztt2").css({
		backgroundColor: "",
	})
	$("#ztt3").css({
		backgroundColor: "",
	})
	$("#picc1").css({
		visibility: "visible",
	})
	$("#picc2").css({
		visibility: "hidden",
	})
	$("#picc3").css({
		visibility: "hidden",
	})
})
$("#ztt2").click(function() {
	$("#ztt2").css({
		background: "rgba(70, 100, 190, 0.6)",
	})
	$("#ztt1").css({
		backgroundColor: "",
	})
	$("#ztt3").css({
		backgroundColor: "",
	})
	$("#picc2").css({
		visibility: "visible",
	})
	$("#picc3").css({
		visibility: "hidden",
	})
	$("#picc1").css({
		visibility: "hidden",
	})
})
$("#ztt3").click(function() {
	$("#ztt3").css({
		background: "rgba(70, 100, 190, 0.6)",
	})
	$("#ztt1").css({
		backgroundColor: "",
	})
	$("#ztt2").css({
		backgroundColor: "",
	})
	$("#picc3").css({
		visibility: "visible",
	})
	$("#picc2").css({
		visibility: "hidden",
	})
	$("#picc1").css({
		visibility: "hidden",
	})
})





$("#F1").click(function() {
	$("#F1").css({
		background: "rgba(70, 100, 190, 0.6)",
	})
	$("#F3").css({
		backgroundColor: "",
	})
	$("#F2").css({
		backgroundColor: "",
	})
	$("#content").css({
		visibility: "hidden",
		zIndex: "-999",
	})
	$("#content01").css({
		visibility: "hidden",
		zIndex: "-999",
	})
	$("#content02").css({
		visibility: "visible",
		zIndex: "999",
	})
})
$("#zttt1").click(function() {
	$("#zttt1").css({
		background: "rgba(70, 100, 190, 0.6)",
	})
	$("#zttt2").css({
		backgroundColor: "",
	})
	$("#zttt3").css({
		backgroundColor: "",
	})
	$("#piccc1").css({
		visibility: "visible",
	})
	$("#piccc2").css({
		visibility: "hidden",
	})
	$("#piccc3").css({
		visibility: "hidden",
	})
})
$("#zttt2").click(function() {
	$("#zttt2").css({
		background: "rgba(70, 100, 190, 0.6)",
	})
	$("#zttt1").css({
		backgroundColor: "",
	})
	$("#zttt3").css({
		backgroundColor: "",
	})
	$("#piccc2").css({
		visibility: "visible",
	})
	$("#piccc3").css({
		visibility: "hidden",
	})
	$("#piccc1").css({
		visibility: "hidden",
	})
})
$("#zttt3").click(function() {
	$("#zttt3").css({
		background: "rgba(70, 100, 190, 0.6)",
	})
	$("#zttt1").css({
		backgroundColor: "",
	})
	$("#zttt2").css({
		backgroundColor: "",
	})
	$("#piccc3").css({
		visibility: "visible",
	})
	$("#piccc2").css({
		visibility: "hidden",
	})
	$("#piccc1").css({
		visibility: "hidden",
	})
})


window.onload = function() {
	$("#zt3").css({
		background: "rgba(70, 100, 190, 0.6)",
	})
	$("#ztt3").css({
		background: "rgba(70, 100, 190, 0.6)",
	})
	$("#zttt3").css({
		background: "rgba(70, 100, 190, 0.6)",
	})
	$("#F3").css({
		background: "rgba(70, 100, 190, 0.6)",
	})
	$("#F3").css({
		background: "rgba(70, 100, 190, 0.6)",
	})
	$("#content").css({
		visibility: "visible",
		zIndex: "999",
	})

}


//验证登录
$("#reserve_appear").click(function(){
	$.ajax({
		async: false,
		url: "/checkeLogin",
		type: "get",
		dataType: 'json',
		data: {},
		success: function(res) {
			if (res.login) {
				
			} else {
				//未登录
				alert("您未登录");
				window.location = "/web/login.html";
			}
		},
		error: function(a, b) {
			alert(a);
			
		}
	});
})



// 查询展厅信息
var tehName = "";
$(".regional").delegate(".regionalson", "click", function() {
	tehName = $(this).attr("name");
	$.ajax({
		url: '/information',
		type: 'get',
		dataType: 'json',
		data: {
			"tehName": tehName
		},
		success: function(res) {
			if (res.ok) {
				$(".teharea").val(res.teh_area);

				$(".price").val(res.teh_price);
			}
			if (res.elapsedTime) {
				$(".timeInterval").val(res.elapsedTime);
			} else {
				$(".timeInterval").val("无");
			}
			if (!res.companyName) {
				$("#sub").removeAttr("disabled");
				$(".companyN").val("无");
			} else {
				$("#sub").attr({
					"disabled": "disabled"
				});
				$(".companyN").val(res.companyName);
			}

		},
		error: function(a, b) {
			alert(a);
		}
	});
});



// 预约申请

$("#sub").click(function() {
	var companyName = $("#companyName").val();
	var timeInterval = $("#timeInterval").val();
	var price = $("#price").val();
	var floor = $("#floor").val();
	if (companyName.length <= 0 || price.length <= 0 || floor.length <= 0) {
		alert("请输入公司名称或者价格以及展厅号!");
		return;
	} else if (isNaN(timeInterval) || timeInterval.length <= 0 || timeInterval > 30) {
		alert("请输入使用天数!");
		return;
	}
	$.ajax({
		url: '/subscribe',
		data: {
			"companyName": companyName,
			"timeInterval": timeInterval,
			"price": price,
			"floor": floor
		},
		type: 'post',
		dataType: 'json',
		success: function(res) {
			if (res.ok) {
				alert("提交成功");
			} else {
				alert("提交失败");
			}
		},
		error: function(a, b) {
			console.info(a);
		}
	})
});
