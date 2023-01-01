// 引入Three.js
import * as THREE from 'three';
// 引入Three.js扩展库
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
//引入tween动画库
import TWEEN, { Tween } from '@tweenjs/tween.js';


/**
 * 创建场景对象Scene
 */
var scene = new THREE.Scene();
/**
 * 创建网格模型
 */
var geometry = new THREE.BoxGeometry(100, 100, 100); //创建一个立方体几何对象Geometry
var material = new THREE.MeshLambertMaterial({
    color: 0x0000ff
}); //材质对象Material
var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
scene.add(mesh); //网格模型添加到场景中
/**
 * 光源设置
 */
//点光源
var point = new THREE.PointLight(0xffffff);
point.position.set(400, 200, 300); //点光源位置
scene.add(point); //点光源添加到场景中
//环境光
var ambient = new THREE.AmbientLight(0x444444);
scene.add(ambient);
/**
 * 相机设置
 */
var width = window.innerWidth; //canvas画布宽度
var height = window.innerHeight; //canvas画布高度
var k = width / height; //canvas画布宽高比
var s = 200; //三维场景显示范围控制系数，系数越大，显示的范围越大
//创建相机对象
var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
camera.position.set(200, 300, 200); //设置相机位置
camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
/**
 * 创建渲染器对象
 */
var renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);//设置渲染区域尺寸
// renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
// document.body.appendChild(renderer.domElement); //body元素中插入canvas对象

//动画函数

var pos = {
    x:0,
    y:0,
    z:0,
    s:0,
}
var tween1 = new TWEEN.Tween(pos);
tween1.to({x: 100,s:0.5}, 5000).onUpdate(function(){
    mesh.position.x = pos.x;
    mesh.scale.x = pos.s
    mesh.scale.y = pos.s
    mesh.scale.z = pos.s
});

var tween2= new TWEEN.Tween(pos);
tween2.to({x: 0,s:0}, 5000).onUpdate(function(){
    mesh.position.x = pos.x;
    mesh.scale.x = pos.s
    mesh.scale.y = pos.s
    mesh.scale.z = pos.s
});


tween1.chain(tween2)
tween2.chain(tween1)

tween1.start()//tween动画开始执行(你可以选择合适的时候触发执行)
// 渲染函数
function render() {
    TWEEN.update();
    renderer.render(scene, camera);//执行渲染操作
    // mesh.rotateY(0.01);//每次绕y轴旋转0.01弧度
    requestAnimationFrame(render);//请求再次执行渲染函数render，渲染下一帧
}
render();

//创建控件对象  相机对象camera作为参数   控件可以监听鼠标的变化，改变相机对象的属性
new OrbitControls(camera, renderer.domElement);

var axesHelper = new THREE.AxesHelper(500);
axesHelper.position.y = -5
scene.add(axesHelper);
var gridHelper = new THREE.GridHelper(300, 25);
gridHelper.position.y = -5
scene.add(gridHelper);

export {renderer,mesh};