/**
 * Created by hushhw on 17/12/12.
 */
//HelloPoint2
var VSHADER_SOURCE =
    'attribute vec4 a_Position;\n' +
    'attribute float a_PointSize;\n' +
    'void main() {\n' +
    'gl_Position = a_Position;\n' +
    'gl_PointSize = a_PointSize;\n' +
    '}\n';

//片元着色器程序
var FSHADER_SOURCE=
    'void main(){\n'+
    'gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n'+ //设置颜色
    '}\n';

function main(){
    var canvas = document.getElementById('webgl');
    var gl=getWebGLContext(canvas);
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

    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    if(a_Position < 0)
    {
        console.log('Failed to get the storage location of a_Position');
        return ;
    }

    var a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize');
    if(a_PointSize<0)
    {
        console.log('Failed to get the storage location of a_PointSize');
        return ;
    }

    gl.vertexAttrib3f(a_Position, 0.5, 0.0, 0.0);
    gl.vertexAttrib1f(a_PointSize, 10);

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.POINTS, 0, 1);
}

