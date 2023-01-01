<template>
  <div class="threejs-container">
  </div>
</template>

<script>
import * as THREE from "three";
import ThreeBase from "./three-base.js";
export default {
  props: {
    animateState:{
      type:Boolean,
      require:false
    },
    slideVal:{
      type:Number,
    },
    // 场景纹理url
    sceneUrl: {
      type: String,
      required: false,
    },
    // 模型url
    modelUrl: {
      type: String,
    },
    // 是否自动旋转
    autoRotate: {
      type: Boolean,
      default: false,
    },
    // 生成的canvas是否铺满浏览器
    isFullBrowser: {
      type: Boolean,
      default: true,
    },
    sceneBg: {
      type: String,
      default: "",
    },
    lights: {
      type: Array,
      default: () => {
        return [
          { name: "AmbientLight", obj: new THREE.AmbientLight(0xffffff, 1) },
          {
            name: "DirectionalLight",
            obj: new THREE.DirectionalLight(0xffffff, 0.6),
            position: [0, 15, 0],
            // position: [80, 100, 50],
          },
          // {
          //   name: "DirectionalLightTop",
          //   obj: new THREE.DirectionalLight(0xffffff, 1),
          //   // position: [0, 15, 0],
          //   position: [80, 100, 50],
          // },
        ];
      },
    },
  },
  data() {
    return {
      threeView: null,
    };
  },
  methods:{
  },
  computed:{

  },
  watch: {
    // animateState(val){
    //   if(val){
    //     this.threeView.openAnimate();
    //   }
    // },
    slideVal(val){
      // console.log(val)
      this.threeView.openAnimate(val)
    },
    sceneUrl(val) {
      this.threeView.loadScene(val);
    },
    modelUrl(val) {
      this.threeView.loadModel(val);
    },
    autoRotate(val) {
      this.threeView.controlsRotate(val);
    },
  },
  mounted() {
    this.threeView = new ThreeBase(this.$el, {
      sceneUrl: this.sceneUrl,
      modelUrl: this.modelUrl,
      autoRotate: this.autoRotate,
      isFullBrowser: this.isFullBrowser,
      sceneBg: this.sceneBg,
      lights: this.lights,
    });
  },
};
</script>

<style lang="scss">
.threejs-container {
  width: 100%;
  height: 100%;
  cursor: grab;
  position: relative;
}
</style>