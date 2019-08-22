var a = 5,
	b = 3;
var c = Math.random() * (abSO(a, b) * abMin(a, b));
console.info(c);

function abSO(a, b) {
	if (a > b) {
		return a - b;
	} else {
		return b - a;
	}
}
//去两个数的最小值
function abMin(a, b) {
	if (isNaN(a) || isNaN(b)) {
		console.info("参数必须是数字");
		return 0;
	}
	if (a > b) {
		return b;
	} else {
		return a;
	}
}
//在0-100之间选取你的幸运数字
var myLuckyNum = 38;
var counter01 = 0;
while (true) {
	counter01++;
	var ranNum = Math.floor(Math.random() * 100);
	if (myLuckyNum == ranNum) {
		// console.info(counter01);
		console.info("抽到幸运号码，执行了" + counter01 + "次");
		break;
	}
}


//字符串转换成大小写
var str03 = "abcDeFGHijk";
console.info(
	"原来的字符串为" + str03 + "\n\r" +
	"转换成大写后" + str03.toUpperCase() + "\n\r" +
	"转换成小写后" + str03.toLowerCase()
);

//在下面的数组中,筛选出带有特殊标记的元素
var array = ["joun-pro", "fang-NEW", "wang-New", "smith-ex", "perter-new", "ady-pro", "jimy-new"];
console.info(array);
//写一个循环,从这几个人中,筛选出new的级别的人,返回它
for (var i = 0; i < array.length; i++) {
	var upperCaseString = array[i].toLowerCase();
	if (upperCaseString.indexOf("new") >= 0) {
		console.info(array[i] + "下标" + i);
	}
}
//数组   在js中数组是邪恶的！
// var arr03 = [0,1,2,3,4,5];

//字符串转数组"0,1,2,3,4,5".split(",")  => (6) ["0","1","2","3","4","5"]
//数组转字符串 arr03.join(",");

var arr005 = [1, 2, 3, 4, 5];
arr005[8] = 8;
for (var i = 0; i < arr005.length; i++) {
	console.info(arr005[i] + "...." + i);
}


var arr006 = [11,21,33,42,9,23];
