
import Link from 'next/link'
import Layout from '../components/Layout'
import fetch from 'isomorphic-unfetch'
import * as THREE from 'three';
// import {JSONLoader}  from 'three';
const Stats = require('three/examples/js/libs/stats.min.js');
const OrbitControls = require('three-orbitcontrols');
const TWEEN = require('@tweenjs/tween.js');

class Test extends React.Component {
    clickHandle() {
        // alert(this.props.shows);
    }
    componentDidMount() {
        console.log()
        window.THREE = THREE;   
        window.dat = require('dat.gui').default;
        // console.dir(dat)
        const OBJLoader = require('/utils/OBJLoader.js')
        const MTLLoader = require('/utils/MTLLoader.js')
        const FirstPersonControls = require('/utils/FirstPersonControls.js')
        const threeD = new ThreeD(document.getElementById("world"));
    }
    render(props) {
        // console.dir(TWEEN);
        return (
            <Layout>
                <div id="world"></div>
                <style jsx>{`
                #world{
                    position:absolute;
                    top:0;
                    left:0;
                    overflow:hidden;
                    height:100%;
                    width:100%;
                }
            `}</style>
            </Layout>
        )
    }
}
var controls = new function() {
    // light
    this.posX = 50;
    this.posY = 50;
    this.posZ = 50;
// camera
// this.camera_posX=0;
// this.camera_posY=0;
// this.camera_posZ=200;
// this.camera_rotation=0;
};

class ThreeD {
    constructor(canvasContainer) {
        this.Colors = {
            red: 0xf25346,
            white: 0xd8d0d1,
            brown: 0x59332e,
            pink: 0xF5986E,
            brownDark: 0x23190f,
            blue: 0x68c3c0
        }
        this.Event = {};
        this.container = canvasContainer || document.body;
        this.createScene();
        this.createLights();
        
        // Stats
        this.initStats();
        this.initGUI();
        this.draw();
        // OrbitControls
        this.orbitControls = new OrbitControls(this.camera);
        this.orbitControls.autoRotate = true;
        this.loop();
    }
    initStats(){
        this.stats = new Stats();
        this.stats.domElement.style.position = 'absolute';
        this.stats.domElement.style.bottom = '0px';
        this.stats.domElement.style.zIndex = 100;
        this.container.appendChild(this.stats.domElement);
    }
    initGUI() {
        var _this = this;
        var gui = new dat.GUI();
        gui.add(controls, "posX", 0, 500);
        gui.add(controls, "posY", 0, 500);
        gui.add(controls, "posZ", 0, 500);
        // var cube_light = new THREE.BoxGeometry(5, 5, 5, 2, 2, 2);
        // var material = new THREE.PointsMaterial({
        //     size: 1,
        //     color: 0xff0000,
        //     map: this.getTexture(400)
        // });
        // this.lightParticleSystem = new THREE.Points(cube_light, material);
        // this.lightParticleSystem.position.x = controls.posX;
        // this.lightParticleSystem.position.y = controls.posY;
        // this.lightParticleSystem.position.z = controls.posZ;
        // this.scene.add(this.lightParticleSystem);
    }
    draw() {
        var _this = this;
        var cube = new THREE.BoxGeometry(20, 20, 20, 3, 3, 3);

        var mat = new THREE.MeshPhongMaterial({
            color: this.Colors.white,
            map: THREE.ImageUtils.loadTexture('/static/images/crate.jpg')
        });
        var m_cube = new THREE.Mesh(cube, mat);
        m_cube.position.y = 12;
        m_cube.position.z = 20;
        m_cube.castShadow = true;
        // this.scene.add(m_cube);
        // m_cube.on("mousedown", function(e,self){
        //     var tween = new TWEEN.Tween(self.position).to({
        //         y: 22
        //     }, 300).easing(TWEEN.Easing.Cubic.Out).start();
        // },function(e,self){
        //     var tween = new TWEEN.Tween(self.position).to({
        //         y: 12
        //     }, 300).easing(TWEEN.Easing.Cubic.Out).start();
        // })
        this.loadObjMtl("monu9").then((obj) => {
            for (var i in obj.children) {
                obj.children[i].castShadow = true;
                obj.children[i].receiveShadow = true;
                // obj.children[i].on("mousedown", function(e, self){
                //     var tween = new TWEEN.Tween(self.position).to({
                //         z: -20
                //     }, 300).easing(TWEEN.Easing.Cubic.Out).start();
                // }, function(e, self){
                //     var tween = new TWEEN.Tween(self.position).to({
                //         z: -10
                //     }, 300).easing(TWEEN.Easing.Cubic.Out).start();
                // })
            }
            obj.position.z = -10;
            _this.scene.add(obj);
        })
        // console.log("-----------1------")
        var pMaterial = new THREE.PointsMaterial({color:0xff0000,size:0.1});
        // var particle = new THREE.geometry();
        var jsonloader = new THREE.JSONLoader();
        jsonloader.load('/static/obj/Suzanne.js', function(geometry, materials){
            var mesh = new THREE.Mesh(geometry,materials);
            _this.particleSystem = new THREE.Points(geometry, pMaterial);
            _this.particleSystem.position.y = 30;
            _this.particleSystem.position.z = 20;
            _this.particleSystem.sortParticles = true;
            _this.scene.add(_this.particleSystem);
            _this.particleSystemLoaded = true;

            // console.log(_this.particleSystem.needsUpdate=true)
            console.log(_this.particleSystem.matrixAutoUpdate)
            // _this.particleSystem.matrixAutoUpdate=true;

        })
        // console.log(jsonloader)
        // (new THREE.JSONLoader()).load('/static/obj/Suzanne.js', function(geometry, materials){
        //     console.log(geometry);
        // });
        // console.log("-----------2------")
        var sun_geom = new THREE.SphereGeometry(5, 4, 4);
        var matTailPlane = new THREE.MeshPhongMaterial({
            color: this.Colors.red,
            shading: THREE.FlatShading,
        // map:_this.getTexture()
        });
        this.sun = new THREE.Mesh(sun_geom, matTailPlane);
        this.sun.position.x = controls.posX;
        this.sun.position.y = controls.posY;
        this.sun.position.z = controls.posZ;
        // console.log(this.sun)
        this.scene.add(this.sun)

        this.sun.on("hover", function(e, self) {
            self.material.color.setHex(0xdddddd);
            var tween = new TWEEN.Tween(self.scale).to({
                x: 1.2,
                y: 1.2,
                z: 1.2
            }, 300).easing(TWEEN.Easing.Cubic.Out).start();
        }, function(e, self) {
            self.material.color.setHex(0xff0000);
            var tween = new TWEEN.Tween(self.scale).to({
                x: 1.0,
                y: 1.0,
                z: 1.0
            }, 300).easing(TWEEN.Easing.Cubic.Out).start();
        });
        // this.createText()
        // var tween = new TWEEN.Tween(particleSystem.position).to({
        //     x: 40,
        //     y: 20
        // }, 1000).easing(TWEEN.Easing.Cubic.Out);
        this.createCharacter("chr_sword");
    }
    loadMtl(mtlName, mtlPath = '/static/obj/') {
        return new Promise((resolve, reject) => {
            const mtlLoader = new THREE.MTLLoader();
            mtlLoader.setBaseUrl(mtlPath);
            mtlLoader.setPath(mtlPath);
            mtlLoader.load(mtlName + '.mtl', resolve);
        })
    }
    loadObj(objName, objPath = '/static/obj/', materials) {
        return new Promise((resolve, reject) => {
            materials.preload();
            var objLoader = new THREE.OBJLoader();
            // var objLoader = new OBJLoader();
            objLoader.setMaterials(materials);
            objLoader.setPath(objPath);
            objLoader.load(objName + '.obj', resolve, undefined, reject);
        })
    }
    async loadObjMtl(objMtlName, path = '/static/obj/') {
        // var onProgress = function(xhr) {
        //     if (xhr.lengthComputable) {
        //         var percentComplete = xhr.loaded / xhr.total * 100;
        //     }
        // };
        // var onError = function(xhr) {};
        try {
            var mtl = await this.loadMtl(objMtlName);
            var obj = await this.loadObj(objMtlName, path, mtl);
            return obj;
        } catch ( err ) {
            console.log(err);
        }

        // var mtlLoader = new THREE.MTLLoader();
        // mtlLoader.setBaseUrl(path);
        // mtlLoader.setPath(path);
        // mtlLoader.load(objMtlName + '.mtl', (materials)=>{
        //     materials.preload();
        //     var objLoader = new THREE.OBJLoader();
        //     objLoader.setMaterials(materials);
        //     objLoader.setPath(path);
        //     objLoader.load(objMtlName + '.obj', (object) => {
        //         if(showShadow){
        //             for(var i in object.children){
        //                 object.children[i].castShadow = true;
        //                 object.children[i].receiveShadow = true;
        //             }
        //         }
        //         this.scene.add(object);
        //     }, onProgress, onError);
        // });

    }
    // 绘制3D文字
    createText() {
        var _this = this;
        var text = new THREE.FontLoader().load('/static/fonts/gentilis_regular.typeface.json', function(text) {
            var gem = new THREE.TextGeometry('castle', {
                size: 20, //字号大小，一般为大写字母的高度
                height: 10, //文字的厚度
                weight: 'normal', //值为'normal'或'bold'，表示是否加粗
                font: text, //字体，默认是'helvetiker'，需对应引用的字体文件
                style: 'normal', //值为'normal'或'italics'，表示是否斜体
                bevelThickness: 1, //倒角厚度
                bevelSize: 1, //倒角宽度
                curveSegments: 30, //弧线分段数，使得文字的曲线更加光滑
                bevelEnabled: true, //布尔值，是否使用倒角，意为在边缘处斜切
            });
            gem.center();
            var mat = new THREE.MeshPhongMaterial({
                color: 0xffe502,
                specular: 0x009900,
                shininess: 30,
                shading: THREE.FlatShading
            });
            var textObj = new THREE.Mesh(gem, mat);
            textObj.position.z = 50;
            textObj.position.y = 50;
            textObj.castShadow = true;
            _this.scene.add(textObj);
        });
    }
    getTexture(canvasSize = 300) {
        var canvas = document.createElement('canvas');
        canvas.width = canvasSize;
        canvas.height = canvasSize;

        var context = canvas.getContext('2d');
        // var gradient = context.createRadialGradient(
        //     canvas.width / 2, canvas.height / 2,
        //     0,
        //     canvas.width / 2,canvas.height /2,
        //     canvas.width / 2
        // );

        // gradient.addColorStop(0,'rgba(255,255,255,1)');
        // gradient.addColorStop(0.2,'rgba(0,255,255,1)');
        // gradient.addColorStop(0.4,'rgba(0,0,64,1)');
        // gradient.addColorStop(1,'rgba(0,0,0,1)');
        context.beginPath();
        context.fillStyle = "red";
        // context.globalAlpha  = 0.1;

        context.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, 0, Math.PI * 2, true);
        context.fill();
        var texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;

        return texture;
    }
    createScene() {
        var _this = this;
        this.HEIGHT = window.innerHeight;
        this.WIDTH = window.innerWidth;
        // 创建场景
        this.scene = new THREE.Scene();
        // 在场景中添加雾的效果；样式上使用和背景一样的颜色
        // this.scene.fog = new THREE.Fog(0xf7d9aa, 100, 950);
        this.scene.fog = new THREE.Fog(0x000000, 1, 600);
        // this.scene.fog = new THREE.Fog(0xdddddd, 1, 600);

        // 创建相机
        let aspectRatio = this.WIDTH / this.HEIGHT;
        let fieldOfView = 60;
        let nearPlane = 1;
        let farPlane = 10000;
        /**
         * PerspectiveCamera 透视相机
         * @param fieldOfView 视角
         * @param aspectRatio 纵横比
         * @param nearPlane 近平面
         * @param farPlane 远平面
         */
        this.camera = new THREE.PerspectiveCamera(
            fieldOfView,
            aspectRatio,
            nearPlane,
            farPlane
        );

        // 设置相机的位置
        this.camera.position.x = 0;
        this.camera.position.z = 200;
        // camera.position.y = 100;
        this.camera.position.y = 0;
        window.camera = this.camera;

        // this.camControls = new THREE.FirstPersonControls(this.camera);
        // this.camControls.lookSpeed = 0.4;
        // this.camControls.movementSpeed = 20;
        // this.camControls.noFly = true;
        // this.camControls.lookVertical = true;
        // this.scene.add(this.camControls.getObject())
        // this.camControls.constrainVertical = true;
        // this.camControls.verticalMin = 1.0;
        // this.camControls.verticalMax = 2.0;
        //下面两个属性定义场景初次渲染时相机指向的位置
        // this.camControls.lon = -150;
        // this.camControls.lat = 120

        // 创建渲染器
        this.renderer = new THREE.WebGLRenderer({
            // 在 css 中设置背景色透明显示渐变色
            alpha: true,
            // 开启抗锯齿
            antialias: true
        });
        this.renderer.setClearColor(new THREE.Color(0x000000));
        // 定义渲染器的尺寸；在这里它会填满整个屏幕
        this.renderer.setSize(this.WIDTH, this.HEIGHT);

        // 打开渲染器的阴影地图
        this.renderer.shadowMap.enabled = true;
        // this.renderer.shadowMapSoft = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
        // 在 HTML 创建的容器中添加渲染器的 DOM 元素
        // this.container = this.canvasContainer || document.body;
        // container = document.body;
        this.container.appendChild(this.renderer.domElement);
        // 监听屏幕，缩放屏幕更新相机和渲染器的尺寸
        window.addEventListener('resize', this.handleWindowResize.bind(this), false);
        // 为3D物体添加鼠标事件
        THREE.Object3D.prototype.on = function(eventName, touchCallback, notTouchCallback) {
            switch (eventName) {
            // 自定义hover事件
            case "hover":
                _this.container.addEventListener("mousemove", (event) => {
                    _this.handleRaycaster(event, this, (_event, _target) => {
                        this.enter = true;
                        if (this.enter != this.lastEnter && this.enter == true) {
                            touchCallback && touchCallback(_event, _target);
                            this.lastEnter = true;
                        }
                    }, (_event, _target) => {
                        this.enter = false;
                        if (this.enter != this.lastEnter && this.enter == false) {
                            notTouchCallback && notTouchCallback(_event, _target);
                            this.lastEnter = false;
                        }
                    });
                }, false);
                break;
            default:
                _this.container.addEventListener(eventName, (event) => {
                    _this.handleRaycaster(event, this, touchCallback, notTouchCallback);
                }, false);
            }
        }
    }
    handleRaycaster(event, target, touchCallback, notTouchCallback) {
        var mouse = new THREE.Vector2();
        var raycaster = new THREE.Raycaster();
        mouse.x = (event.clientX / this.renderer.domElement.clientWidth) * 2 - 1;
        mouse.y = -(event.clientY / this.renderer.domElement.clientHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, this.camera);
        var intersects = raycaster.intersectObject(target);
        if (intersects.length > 0) {
            touchCallback && touchCallback(event, target);
        } else {
            notTouchCallback && notTouchCallback(event, target);
        }
    }
    handleWindowResize() {
        // 更新渲染器的高度和宽度以及相机的纵横比
        this.HEIGHT = window.innerHeight;
        this.WIDTH = window.innerWidth;
        this.renderer.setSize(this.WIDTH, this.HEIGHT);
        this.camera.aspect = this.WIDTH / this.HEIGHT;
        this.camera.updateProjectionMatrix();
    }
    createLights() {
        // 半球光就是渐变的光；
        // 第一个参数是天空的颜色，第二个参数是地上的颜色，第三个参数是光源的强度
        this.hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, .9);
        this.ambientLight = new THREE.AmbientLight(0xdc8874, 0.2);
        // 方向光是从一个特定的方向的照射
        // 类似太阳，即所有光源是平行的
        // 第一个参数是关系颜色，第二个参数是光源强度
        this.shadowLight = new THREE.DirectionalLight(0xffffff, .9);

        // 设置光源的方向。
        // 位置不同，方向光作用于物体的面也不同，看到的颜色也不同
        // this.shadowLight.position.set(150, 350, 350);
        // this.shadowLight.position.set(150, 350, 350);
        // this.shadowLight.position.set(60, 140, 140);
        this.shadowLight.position.set(controls.posX, controls.posY, controls.posZ);

        // 开启光源投影
        this.shadowLight.castShadow = true;

        // 定义可见域的投射阴影
        this.shadowLight.shadow.camera.left = -400;
        this.shadowLight.shadow.camera.right = 400;
        this.shadowLight.shadow.camera.top = 400;
        this.shadowLight.shadow.camera.bottom = -400;
        this.shadowLight.shadow.camera.near = 1;
        this.shadowLight.shadow.camera.far = 1000;
        // this.shadowLight.shadowCameraVisible = true;

        // 定义阴影的分辨率；虽然分辨率越高越好，但是需要付出更加昂贵的代价维持高性能的表现。
        this.shadowLight.shadow.mapSize.width = 2048;
        this.shadowLight.shadow.mapSize.height = 2048;

        // 为了使这些光源呈现效果，只需要将它们添加到场景中
        this.scene.add(this.hemisphereLight);
        this.scene.add(this.shadowLight);
        this.scene.add(this.ambientLight);
    }
    createCharacter(name){
        var _this = this;
        this.loadObjMtl(name).then((obj) => {
            for (var i in obj.children) {
                obj.children[i].castShadow = true;
                obj.children[i].receiveShadow = true;
            }
            this.character = obj;
            obj.scale.set(0.5,0.5,0.5);
            obj.position.y = 1;
            this.scene.add(obj);
            // this.camera.position.set(obj.position.x,obj.position.y+10,obj.position.z+26);
            // this.camera.lookAt(obj.position);
            var tween = new TWEEN.Tween(this.camera.position).to({
                x: obj.position.x,
                y: obj.position.y+10,
                z: obj.position.z+26
            }, 2000).easing(TWEEN.Easing.Cubic.Out).start();
            document.onkeydown = this.handleKeyDown.bind(this)
        })
    }
    updateCharacter(){
        // this.camera.position.set(obj.position.x,obj.position.y+10,obj.position.z+26);
    }
    handleKeyDown(event){
        // console.log(this.character)
        // var _this = this;
        switch(event.keyCode) {
            case 87:
                this.character.position.z -= 0.3;
                break;
            case 83:
                this.character.position.z += 0.3;
                break;
            case 65:
                this.character.position.x -= 0.3;
                break;
            case 68:
                this.character.position.x += 0.3;
                break;
        }
        // this.camera.position.set(new THREE.Vector3(this.character.x,this.character.y+10,this.character.z+26));
        // this.camera.lookAt(this.character.position.clone());
        console.log(event.keyCode)
        // console.log(this.character.position)
    }
    loop() {
        // 渲染场景
        this.renderer.render(this.scene, this.camera);
        this.stats.update();
        TWEEN.update();

        // this.camera.position.set(controls.camera_posX, controls.camera_posY, controls.camera_posZ);
        // this.camera.rotation.x = controls.camera_rotation;
        this.shadowLight.position.set(controls.posX, controls.posY, controls.posZ);
        this.sun.position.set(controls.posX, controls.posY, controls.posZ);
        if(this.particleSystemLoaded){
            // this.particleSystem.rotation.y+=0.1;
            // var vertices = this.particleSystem.geometry.vertices;
            // console.log(vertices.length)
            this.particleSystem.geometry.vertices.forEach(function(vertice, i){
                vertice.y = vertice.y+Math.random()*2-1;
            })
            // for(var i = 0; i < vertices.length; i++){
            //     vertices[i].y = vertices[i].y+Math.random()*2-1;
            // }
            // vertices.forEach(function(vertice, i){
            //     // vertice.position.x+=0.1;
            //     // console.log(vertice)
            //     vertice.y = vertice.y+Math.random()*0.2-0.1;
            //     // vertice.set(vertice.x, vertice.y+Math.random()*0.2-0.1, vertice.z)
            // })
            // this.particleSystem.geometry.__dirtyVertices = true;
        }
        // this.camControls.update(new THREE.Clock().getDelta());
        // 重新调用 render() 函数
        requestAnimationFrame(this.loop.bind(this));
    }
}
// const Index = (props) => (
//   <Layout>
//     <h1>Batman TV Show</h1>
//     <ul>
//       {props.shows.map(({show}) => (
//         <li key={show.id}>
//           <Link as={`/p/${show.id}`} href={`/post?id=${show.id}`}>
//             <a>{show.name}</a>
//           </Link>
//         </li>
//       ))}
//     </ul>
//   </Layout>
// )

// Index.getInitialProps = async function() {
//   const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
//   const data = await res.json()
//   console.log(data)
//   console.log(`Show data fetched. Count: ${data.length}`)

//   return {
//     shows: data
//   }
// }

export default Test