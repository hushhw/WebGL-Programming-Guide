/**
 * Created by hushhw on 17/12/12.
 */
//ColoredPoints.js
//顶点着色器程序
var VSHADER_SOURCE =
    'attribute vec4 a_Position;'+
    'void main(){'+
    'gl_Position=a_Position;'+
    'gl_PointSize=10.0;'+
    '}';

//片元着色器程序
var FSHADER_SOURCE=
    'precision mediump float;'+
    'uniform vec4 u_FragColor;'+
    'void main(){'+
    'gl_FragColor = u_FragColor;'+
    '}';

function main() {
    //获取canvas元素
    var canvas = document.getElementById("webgl");
    if(!canvas){
        console.log("Failed to retrieve the <canvas> element");
        return;
    }

    //获取WebGL绘图上下文
    var gl = getWebGLContext(canvas);
    if(!gl){
        console.log("Failed to get the rendering context for WebGL");
        return;
    }

    //初始化着色器
    if(!initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE)){
        console.log("Failed to initialize shaders.");
        return;
    }

    //获取a_Position变量存储位置
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    if(a_Position < 0){
        console.log("Failed to get the storage location of a_Position");
        return;
    }

    //获取u_FragColor 变量存储位置
    var u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
    if(!u_FragColor){
        console.log('Failed to get the storage location of u_FragColor');
        return;
    }

    canvas.onmousedown = function(ev){
        click(ev,gl,canvas,a_Position,u_FragColor);
    };

    //指定清空<canvas>颜色
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    //清空<canvas>
    gl.clear(gl.COLOR_BUFFER_BIT);
}

var g_points = [];
var g_colors = [];
function click(ev, gl, canvas, a_Position,u_FragColor){
    var x= ev.clientX;
    var y = ev.clientY;
    var rect = ev.target.getBoundingClientRect();
    x = ((x - rect.left) - canvas.width / 2) / (canvas.width / 2);
    y = (canvas.height / 2 - (y - rect.top)) / (canvas.height / 2);
    //将坐标存储到g_points数组中
    g_points.push([x, y]);
    if(x >= 0.0 && y >= 0.0){  //第一象限
        g_colors.push([1.0, 0.0, 0.0, 1.0]);  //红色
    }else if(x < 0.0 && y < 0.0){  //第三象限
        g_colors.push([0.0, 1.0, 0.0, 1.0]);  //绿色
    }else{
        g_colors.push([1.0, 1.0, 1.0, 1.0]);  //白色
    }

    //清除<canvas>
    gl.clear(gl.COLOR_BUFFER_BIT);

    var len = g_points.length;
    for(var i = 0; i < len; i++){
        var xy=g_points[i];
        var rgba = g_colors[i];

        //将点的位置传递到a_Position变量中
        gl.vertexAttrib3f(a_Position, xy[0], xy[1], 0.0);
        //将点的颜色传递到u_FragColor变量中
        gl.uniform4f(u_FragColor, rgba[0],  rgba[1], rgba[2], rgba[3]);

        //绘制点
        gl.drawArrays(gl.POINTS, 0, 1);
    }
}