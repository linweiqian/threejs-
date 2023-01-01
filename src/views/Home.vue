<template>
  <div>
    <div id="container"
         class="three-container"
         ref="three"
         :style="{filter: (dialogVisible ? `blur(10px)`: ``)}">
      <template v-if="!params.noShowIcon">
        <div class="logo">
          <img src="@/assets/images/logo.png"
               alt="">
        </div>
        <div class="title">
          <div class="content">
            <div class="_title">{{dataInfo.name}}</div>
          </div>
        </div>
        <div class="action"
             :class="[{help: dialogVisible}, {detail: showDetail}]">
          <img src="@/assets/images/auto.png"
               alt=""
               class="auto-icon"
               @click="modelAuto()">
          <img src="@/assets/images/detail-icon.png"
               alt=""
               class="detail-icon"
               @click="changeShowDetail()">
          <img src="@/assets/images/help.png"
               class="help-icon"
               alt=""
               @click="dialogVisible=true;">
          <img src="@/assets/images/mp3.png"
               class="play-icon"
               alt=""
               @click="playMp3()">
        </div>
        <div class="close pointer">
          <img src="@/assets/images/close.png"
               alt=""
               @click="close()">
        </div>

        <template v-if="showDetail">
          <div class="text-content">
            <div class="title">
              <div class="_title">{{dataInfo.name}}</div>
            </div>
            <div class="_sub-title">{{dataInfo.description}}</div>
          </div>
        </template>
      </template>
    </div>
    <Tutorial v-model="dialogVisible"></Tutorial>
  </div>
</template>

<script>
import { getUrlParam } from "@/tools/utils.js";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import Tutorial from "@/components/tutorial/index.vue";

export default {
  name: "Home",
  components: {
    Tutorial,
  },
  data() {
    return {
      Scene: null,
      Renderer: null,
      Camera: null,
      Model: null,
      Lights: null,
      AnimationMixer: null,
      Tclock: new THREE.Clock(),
      Controls: null,
      GridHelper: new THREE.GridHelper(300, 50, 0x00ff12, 0xffffff),
      showTip: true,
      selectModelIndex: 0,
      dialogVisible: false,
      // 重新加载次数
      loadingCount: 0,
      dataInfo: {},
      params: {},
      showDetail: true,
      audio: new Audio(),
      playState: false,
      // 假进度条
      progress: 0,
    };
  },
  methods: {
    playMp3() {
      if (!this.dataInfo?.voice) {
        this.$message.warning("当前没有音频文件！");
        return;
      }
      if (isNaN(this.audio.duration)) {
        this.$message.warning("当前音频文件有误！");
        return;
      }
      if (this.playState) {
        this.audio.pause();
        this.playState = false;
        return;
      }
      this.audio.play();
      this.playState = true;
    },
    changeShowDetail() {
      this.showDetail = !this.showDetail;
    },
    async getDataInfo() {
      // getUrlParam("index");
      if (!this.params.id) {
        this.$message.warning("请输入对应的模型编号");
        return;
      }
      const result = await this.$http.get(
        `/websiteAPI/portal/collectionModel/${this.params.id}`
      );
      let path = result.attachment[0].replace(
        "http://zsbwgtest.cloudbeing.cn",
        ""
      );
      const temp = {
        name: result.name,
        path: path,
        position: [0, 2, 5],
        type: path.split("_")[1],
      };
      this.modelLoader(temp);
      this.dataInfo = { ...result };
      this.audio.src = result.voice ? result.voice[0] : "";
      // this.audio.src = "http://m10.music.126.net/20220510095345/b4935ea748ddd504488808caeb4e0953/ymusic/0f5b/555f/055a/8134a76461b57ed37b8020542f3f0d5c.mp3";
    },
    close() {
      this.$message.success("关闭");
      window.opener = null;
      window.close();
    },
    async init() {
      this.setScene();
      this.setRenderer();
      this.setCamera();
      this.addControls();
      // this.addLight();

      this.params = {
        id: this.$route.query?.id,
        noShowIcon: this.$route.query?.noShowIcon,
      };
      this.getDataInfo();

      //添加辅助面板
      this.animation();
    },
    setScene() {
      const scene = new THREE.Scene();
      // scene.background = new THREE.TextureLoader().load(BG);
      this.Scene = scene;

      //显示三维坐标系
      // var axis = new THREE.AxisHelper(3);
      // scene.add(axis);
    },
    setRenderer() {
      const element = document.getElementById("container");

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true, // 透明背景
      });
      // 设置渲染器的像素比例，按照设备
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(element.clientWidth, element.clientHeight); // 设置渲染区域尺寸
      renderer.outputEncoding = THREE.sRGBEncoding;
      // 色调映射属性.toneMapping用于在普通计算机显示器或者移动设备屏幕等低动态范围介质上，模拟、逼近高动态范围(HDR)效果
      renderer.toneMapping = THREE.ReinhardToneMapping;
      renderer.toneMappingExposure = 1; // 曝光系数

      this.Renderer = renderer;
      element.appendChild(renderer.domElement);
    },
    setCamera() {
      this.Camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        1,
        10000
      );
      this.Camera.position.set(0, 0, 50);
      this.Camera.lookAt(this.Scene.position);
    },
    //加载模型GLTF FBX
    modelLoader(MODEL) {
      const loadTip = this.addLoadTip();

      this.Controls.autoRotate = false;
      //添加环境hdr
      MODEL.hdr && this.HdrLoader(MODEL.hdr);

      let Loader = "",
        MTYPE = MODEL.type || "glb";

      if ("glb,gltf,glTF".indexOf(MTYPE) != -1) {
        Loader = new GLTFLoader();
      } else if ("fbx".indexOf(MTYPE) != -1) {
        Loader = new FBXLoader();
      } else {
        loadTip.textContent = "请使用glb,gltf,fbx格式模型";
        return;
      }

      Loader.load(
        MODEL.path,
        (geometry) => {
          loadTip.textContent = "加载完成！";
          //移除模型
          this.Model && this.Scene.remove(this.Model);
          //设置相机位置
          this.Camera.position.set(...MODEL.position);
          this.Model = "fbx".indexOf(MTYPE) != -1 ? geometry : geometry.scene;

          //遍历模型字节点，获取相关参数设置
          this.Model.traverse(function (child) {
            if (child.isMesh) {
              // console.log(child, "child：", child.name);
              // 高光值 默认30
              child.material.shininess = 1;
              child.castShadow = true;
              child.receiveShadow = true;

              child.material.transparent = true; //材质允许透明 如果有玻璃材质时开启
              child.material.opacity = 1; //材质默认透明度
              if (
                child.name === "Model_2" ||
                child.material.name === "transparent"
              ) {
                child.material.opacity = 0.3;
              }
            }
          });
          // 自动获取最佳缩放比例
          this.setScaleToFitSize(this.Model);

          //模型自动居中
          this.ModelAutoCenter(this.Model);

          //查找模型动画
          if (this.Model.animations.length > 0) {
            this.AnimationMixer = new THREE.AnimationMixer(this.Model);
            this.AnimationMixer.clipAction(this.Model.animations[0]).play();
          }

          //把模型放入场景中
          this.Scene.add(this.Model);
          console.log(this.Model, "model");

          //加载完成
          setTimeout(() => {
            // 不等于0 证明使用的假进度条
            if (this.progress !== 0) {
              this.progress = 100;
              loadTip.textContent = this.progress + "加载中...";
            }
            loadTip.style.display = "none";
            // this.Controls.autoRotate = true;
          }, 1000);
        },
        (xhr) => {
          //加载进度
          if (xhr.total === 0) {
            if (this.progress < 100) {
              this.progress += 1;
              if (this.progress > 99) {
                this.progress = 99;
              }
            }
            loadTip.textContent = this.progress + "%加载中...";
            return;
          }
          loadTip.textContent =
            parseInt((xhr.loaded / xhr.total) * 100) + "%加载中...";
          // console.log(xhr.loaded, xhr.total, xhr);
        },
        (err) => {
          loadTip.textContent = "模型加载失败！1秒后重新加载";
          console.log("模型加载失败！", err);

          if (this.loadingCount == 3) {
            loadTip.textContent = "模型加载失败，请检查文件！";
            return;
          }

          if (err.message.includes("404: Not Found")) {
            const path = MODEL.path.split(".")[0];
            MODEL.path = MODEL.type == "fbx" ? path + ".glb" : path + ".fbx";
            MODEL.type = MODEL.type == "fbx" ? "glb" : "fbx";
            setTimeout(() => {
              this.loadingCount += 1;
              console.log(MODEL, "MODEL");
              this.modelLoader(MODEL);
            }, 1000);
          }
        }
      );
    },
    //加载光源
    addLight: function () {
      this.Lights = [
        { name: "AmbientLight", obj: new THREE.AmbientLight(0xffffff, 0.7) },
        {
          name: "DirectionalLight",
          obj: new THREE.DirectionalLight(0xffffff, 1),
          position: [80, 100, 50],
        },
        {
          name: "DirectionalLightTop",
          obj: new THREE.DirectionalLight(0xffffff, 1),
          position: [0, 15, 0],
        },
      ];

      this.Lights.map((item) => {
        item.obj.name = item.name;
        item.position && item.obj.position.set(...item.position);
        item.Helper = new THREE.PointLightHelper(item.obj);
        this.Scene.add(item.obj);
      });
    },

    //加载HDR贴图环境光
    HdrLoader: function (HDR) {
      const pmremGenerator = new THREE.PMREMGenerator(this.Renderer); // 使用hdr作为背景色
      pmremGenerator.compileEquirectangularShader();
      const textureLoader = new RGBELoader();
      textureLoader.load(HDR, (texture, textureData) => {
        const envMap = pmremGenerator.fromEquirectangular(texture).texture;

        envMap.isPmremTexture = true;
        pmremGenerator.dispose();

        this.Scene.environment = envMap; // 给场景添加环境光效果
        this.Scene.background = envMap; // 给场景添加背景图
      });
    },
    //添加事件
    addControls() {
      this.Controls = new OrbitControls(this.Camera, this.Renderer.domElement);
      // 如果使用animate方法时，将此函数删除
      //controls.addEventListener( 'change', render );
      // 使动画循环使用时阻尼或自转 意思是否有惯性
      this.Controls.enableDamping = true;
      //是否可以缩放
      this.Controls.enableZoom = false;
      //设置相机距离原点的最远距离-可以控制缩放程度
      this.Controls.minDistance = 2;
      //设置相机距离原点的最远距离
      this.Controls.maxDistance = 10; //800
      //是否开启右键拖拽
      this.Controls.enablePan = false;
      //动态阻尼系数 就是鼠标拖拽旋转灵敏度
      this.Controls.dampingFactor = 0.5;
      //是否自动旋转
      this.Controls.autoRotate = false;
      this.Controls.autoRotateSpeed = 1;
    },
    //添加加载进度
    addLoadTip() {
      const element = document.getElementById("container");
      document.querySelector(".loadTip") &&
        element.removeChild(document.querySelector(".loadTip"));
      let loadTip = document.createElement("div");
      loadTip.className = "loadTip";
      loadTip.style.cssText +=
        "position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);border-radius:5px;background-color:rgba(0,0,0,0.5);padding:5px 10px;color:#fff;";
      element.appendChild(loadTip);
      return loadTip;
    },
    /**
     * 设置加载模型居中
     * {Object} group 模型对象
     */
    ModelAutoCenter(group) {
      /**
       * 包围盒全自动计算：模型整体居中
       */
      var box3 = new THREE.Box3();
      // 计算层级模型group的包围盒
      // 模型group是加载一个三维模型返回的对象，包含多个网格模型
      box3.expandByObject(group);
      // 计算一个层级模型对应包围盒的几何体中心在世界坐标中的位置
      var center = new THREE.Vector3();
      box3.getCenter(center);
      // console.log('查看几何体中心坐标', center);

      // 重新设置模型的位置，使之居中。
      group.position.x = group.position.x - center.x;
      group.position.y = group.position.y - center.y;
      group.position.z = group.position.z - center.z;
    },
    //添加辅助面板
    animation: function () {
      //更新控制器
      this.Renderer.render(this.Scene, this.Camera);
      this.Controls.update();
      this.AnimationMixer && this.AnimationMixer.update(this.Tclock.getDelta());
      requestAnimationFrame(() => this.animation());
    },
    onWindowResize: function () {
      this.Camera.aspect = window.innerWidth / window.innerHeight;
      this.Camera.updateProjectionMatrix();
      this.Renderer.setSize(window.innerWidth, window.innerHeight);
      this.Renderer.render(this.Scene, this.Camera);
    },
    //获取模型适合观察的缩放的比例
    getFitScaleValue(obj) {
      var boxHelper = new THREE.BoxHelper(obj);
      boxHelper.geometry.computeBoundingBox();
      var box = boxHelper.geometry.boundingBox;
      var maxDiameter = Math.max(
        box.max.x - box.min.x,
        box.max.y - box.min.y,
        box.max.z - box.min.z
      );
      console.log(
        this.Camera.position.z / maxDiameter,
        "this.Camera.position.z / maxDiameter"
      );
      return this.Camera.position.z / maxDiameter;
    },
    //设置模型到适合观察的大小
    setScaleToFitSize(obj) {
      var scaleValue = this.getFitScaleValue(obj) * 0.42;
      // var scaleValue = this.getFitScaleValue(obj);
      obj.scale.set(scaleValue, scaleValue, scaleValue);
      return scaleValue;
    },
    // 是否开启模型自动旋转
    modelAuto() {
      this.Controls.autoRotate = !this.Controls.autoRotate;
    },
  },
  watch: {
    // $route: {
    //   handler: function (val, oldVal) {
    //     if (val.query.id) {
    //       this.params = {
    //         id: val.query.id,
    //         noShowIcon: val.query?.noShowIcon,
    //       };
    //       this.getDataInfo();
    //     }
    //   },
    //   // 深度观察监听
    //   deep: true,
    //   immediate: true,
    // },
  },
  mounted() {
    this.init();
    window.onresize = () => this.onWindowResize();
  },
};
</script>

<style lang="scss" scoped>
#container {
  position: absolute;
  width: 100%;
  height: 100%;
  // background-image: url("../assets/images/bg.jpg");
  background-repeat: no-repeat;
  background-size: cover;

  ::v-deep canvas {
    cursor: grab;
  }

  .title {
    position: absolute;
    top: 7%;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    color: #6f4118;
    width: 100%;

    .content {
      width: 60%;
      margin: auto;
    }

    ._title {
      font-size: 36px;
      margin-bottom: 20px;
      letter-spacing: 2px;
    }

    ._sub-title {
      font-size: 20px;
      line-height: 26px;
      margin-bottom: 10px;
      letter-spacing: 4px;
    }
  }

  .logo {
    position: absolute;
    top: 7%;
    left: 5%;
  }
  .action {
    z-index: 3;
    position: absolute;
    bottom: 4%;
    left: 50%;
    transform: translateX(-50%);

    &.detail {
      img {
        opacity: 0.4;
        cursor: not-allowed;
        pointer-events: none;
      }

      .detail-icon,
      .play-icon {
        opacity: 1;
        cursor: pointer;
        pointer-events: auto;
      }
    }

    img {
      cursor: pointer;
      width: 94px;
      height: 94px;
      background-size: cover;
    }
    img + img {
      margin-left: 20px;
    }
  }

  .help {
    position: absolute;
    bottom: 5%;
    right: 5%;
  }

  .close {
    position: absolute;
    top: 5%;
    right: 5%;
  }

  .text-content {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);

    .title {
      position: absolute;
      top: 7%;
      left: 50%;
      transform: translateX(-50%);
      text-align: center;
      width: 100%;
      color: #ffffff;

      ._title {
        width: 60%;
        margin: auto;
        font-size: 36px;
        margin-bottom: 20px;
        letter-spacing: 2px;
      }
    }

    ._sub-title {
      width: 80%;
      margin: auto;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: left;
      font-size: 20px;
      line-height: 1.5;
      margin-bottom: 10px;
      letter-spacing: 4px;
      color: #ffffff;
      text-indent: 2em;
    }
  }
}
</style>
