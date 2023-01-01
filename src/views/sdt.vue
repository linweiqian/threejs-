<template>
  <div class="three">
    <ModelFbx :src="modelUrl"
              :lights="lights"
              :scale="scale"
    ></ModelFbx>
    <Tutorial v-model="dialogVisible"></Tutorial>
  </div>
</template>

<script>
import Tutorial from "@/components/tutorial/index.vue";
import ModelFbx from "@/components/model/model-fbx.vue";
// import BG from "@/assets/images/bg.jpg";
export default {
  name: "",
  components: {
    ModelFbx,
    Tutorial,
  },
  data() {
    return {
      moadelList:[
        "banzhi","BH","maobi","sjbdx","wan","yantai","ying","changtiao","zhong"
      ],
      scale: { x: 0.02, y: 0.02, z: 0.02 },
      baseUrl: "static/models/",
      modelUrl: "",
      lights: [
        {
          type: "AmbientLight",
          color: "0xffffff",
          intensity: 1,
        },
        {
          type: "DirectionalLight",
          position: { x: 80, y: 100, z: 50 },
          color: 0xffffff,
          intensity: 1,
        },
      ],
      modelText: {
        title: "",
        subTitle: "这是一个古董",
      },
      showTip: true,
      dialogVisible: false,
    };
  },
  methods: {
    routerPath(params){
      const { baseUrl } = this;
      this.modelUrl = `${baseUrl}${params}.fbx`;
    }
  },
  watch: {
    $route: {
      handler: function (val, oldVal) {
        const { baseUrl } = this;
        this.modelUrl = `${baseUrl}${val.query.name}.fbx`;
      },
      // 深度观察监听
      deep: true,
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.three {
  width: 100vw;
  height: 100vh;
  cursor: grab;
  position: relative;

  .title {
    position: absolute;
    top: 7%;
    left: 15%;
    transform: translateX(-50%);
    text-align: center;
    color: #6f4118;
    // width: 100%;
    .btn{
      // width:50px;
      // height: 25px;
      line-height: 5px;
      text-align: center;
      padding: 12px 5px;
      margin: 10px;
      color: #fff;
      border-radius: 5px;

      background: #6f4118;

    }
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
    position: absolute;
    bottom: 5%;
    left: 50%;
    transform: translateX(-50%);

    img {
      cursor: pointer;
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
}
</style>
