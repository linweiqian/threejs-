<template>
  <div ref="webgl" class="containerModel">
      <Change-color></Change-color>
  </div>
</template>

<script>
import { renderer,mesh } from "@/threejs/index.js";
import ChangeColor from '@/views/changeColor'
export default {
  name: "HelloWorld",
  data(){
      return{
      }
  },
  components:{
      ChangeColor
  },
  created: function () {
    // this.$refs.webgl.appendChild(renderer.domElement);//不可以
    // Three.js渲染结果Canvas画布插入到body元素中
    // document.body.appendChild(renderer.domElement);//可以访问body
  },
  mounted: function () {

    this.$refs.webgl.appendChild(renderer.domElement);
    // // Three.js渲染结果Canvas画布插入到body元素中
  },
};
</script>

<style scoped>
/* .containerModel{
  margin-top:100px;
  margin-left:150px;
} */
</style>
