//HelloCanvas2d.js
function main() {
	//获取<canvas>标签
	var canvas = document.getElementById("mycanvas");
	//如果没找到<canvas>标签，则输出错误信息
	if (!canvas) {
		console.log('Failed to retrieve the <canvas> element.');
		return;
	}

	//要在<canvas>上绘制图像，须先获取绘图上下文，“2d”代表我们要绘制二维图形。
	var ctx = canvas.getContext("2d");

	//fillstyle：设置或返回用于填充绘画的颜色、渐变或模式；这里我们设置填充颜色为红色。
	ctx.fillStyle = "red";
	/*
	 使用填充颜色填充矩形。
	 fillRect(x,y,width,height)
	 x    矩形左上角的 x 坐标
	 y    矩形左上角的 y 坐标
	 width        矩形的宽度
	 height   矩形的高度
	 */
	ctx.fillRect(120, 10, 150, 150);
}