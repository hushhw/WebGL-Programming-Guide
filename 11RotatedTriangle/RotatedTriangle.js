/**
 * Created by hushhw on 17/12/14.
 */
//RotatedTriangle.js
var VSHADER_SOURCE =
    //x' = x cos b - y sin b
    //y' = x sin b + y cosb
    //z' = z
    'attribute vec4 a_Position;\n' +
    'uniform float u_CosB, u_SinB;\n' +
    'void main() {\n' +
    'gl_Position.x = a_Position.x * u_CosB - a_Position.y * u_SinB;\n' +
    'gl_Position.y = a_Position.x * u_SinB + a_Position.y * u_CosB;\n' +
    'gl_Position.z = a_Position.z;\n' +
    'gl_Position.w = 1.0;\n' +
    '}\n';

var FSHADER_SOURCE=
    'void main(){'+
    'gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);'+
    '}';

var ANGLE = 90.0;

function main(){

    var canvas = document.getElementById("webgl");
    if(!canvas){
        console.log("Failed to retrieve the <canvas> element");
        return;
    }

    var gl = getWebGLContext(canvas);
    if(!gl){
        console.log("Failed to get the rendering context for WebGL");
        return;
    }

    if(!initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE)){
        console.log("Failed to initialize shaders.");
        return;
    }

    //设置顶点位置
    var n = initVertexBuffers(gl);
    if (n < 0) {
        console.log('Failed to set the positions of the vertices');
        return;
    }

    var radian = Math.PI * ANGLE / 180.0;
    var cosB = Math.cos(radian);
    var sinB = Math.sin(radian);

    var u_CosB = gl.getUniformLocation(gl.program, 'u_CosB');
    if(u_CosB < 0){
        console.log("Failed to get the storage location of u_CosB");
        return;
    }

    var u_SinB = gl.getUniformLocation(gl.program, 'u_SinB');
    if(u_SinB < 0){
        console.log("Failed to get the storage location of u_SinB");
        return;
    }

    gl.uniform1f(u_CosB, cosB);
    gl.uniform1f(u_SinB, sinB);

    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.TRIANGLES, 0, n);
}

function initVertexBuffers(gl) {
    var vertices = new Float32Array(
        [0.0, 0.5, -0.5, -0.5, 0.5, -0.5]
    );
    var n=3; //点的个数

    //创建缓冲区对象
    var vertexBuffer = gl.createBuffer();
    if(!vertexBuffer){
        console.log("Failed to create thie buffer object");
        return -1;
    }

    //将缓冲区对象保存到目标上
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

    //向缓存对象写入数据
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    if(a_Position < 0){
        console.log("Failed to get the storage location of a_Position");
        return -1;
    }

    //将缓冲区对象分配给a_Postion变量
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

    //连接a_Postion变量与分配给它的缓冲区对象
    gl.enableVertexAttribArray(a_Position);

    return n;
}