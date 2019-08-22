

// 写一段代码, 存取两个学生的信息

var student01 = {
	name: "li",
	grade: "大三",
	id: 160310408,
	"class": "计算机科学与技术1班",
	"house": "17#104",
	total: 70
}

var student02 = {
	name: "wang",
	grade: "大三",
	id: 160310409,
	"class": "计算机科学与技术1班",
	"house": "17#105",
	total: 90
}

var student03 = {
	name: "zeng",
	grade: "大三",
	id: 160310410,
	"class": "计算机科学与技术1班",
	"house": "17#105",
	total: 88
}

var arrayTemp = [ student01, student02, student03];
// 编写一段代码,找出total分数最高的学生的姓名和id
// step 1 声明变量, 用来存最高分的信息, 每次匹配,都赋值
var topOne = {
	name: "",
	id: 0,
	total: 0
};

// 不要污染源数据

// step 2 遍历数组, 每次对比分数
for( var i = 0; i < arrayTemp.length; i++ ){
	if( arrayTemp[i].total > topOne.total ){
		topOne.total = arrayTemp[i].total;
		topOne.name = arrayTemp[i].name;
		topOne.id = arrayTemp[i].id;
	}
}

// step 3 输出最高分的学生信息(step1 声明的变量,它已经被重新改变)
console.info(topOne);

// 最终的结果
//console.info ( "等分最高的学生 姓名:     id"    );

