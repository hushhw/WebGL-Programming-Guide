/**
 * Created by hushhw on 17/12/12.
*/
//HelloPoint1.js
//顶点着色器程序
var VSHADER_SOURCE =
    'void main() {\n' +
    'gl_Position = vec4(0.5, 0.0, 0.0, 1.0);\n' + //设置坐标
    'gl_PointSize = 50.0;\n' + //设置尺寸
    '}\n';

//片元着色器程序
var FSHADER_SOURCE=
    'void main(){\n'+
    'gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n'+ //设置颜色
    '}\n';

function main() {
    var canvas = document.getElementById('webgl');

    var gl = getWebGLContext(canvas);
    if(!gl)
    {
        console.log('Failed to get the rendering context for WebGL');
        return ;
    }

    //初始化着色器
    if(!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)){
        console.log('Failed to initialize shaders.');
        return ;
    }

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.POINTS, 0, 1);
}




