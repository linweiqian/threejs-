<template>
  <div class="three">
    <ThreeView class="three-box"
               :modelUrl="modelUrl"
               :sceneBg="BG"
               :autoRotate="autoRotate"
               :style="{filter: (dialogVisible ? `blur(10px)`: ``)}">
    </ThreeView>

    <div class="title">
      <div class="content">
        <div class="_title">{{modelText.title}}</div>
        <div v-if="!showTip">
          <img src="@/assets/images/showTip.png"
               alt=""
               class="pointer"
               @click="showTip = true">
        </div>
        <div v-if="showTip">
          <div class="_sub-title">{{modelText.subTitle}}</div>
          <div>
            <img src="@/assets/images/hideTip.png"
                 alt=""
                 class="pointer"
                 @click="showTip = false">
          </div>
        </div>
      </div>
    </div>
    <div class="logo">
      <img src="@/assets/images/logo.png"
           alt="">
    </div>
    <div class="action">
      <img src="@/assets/images/auto.png"
           alt=""
           class="auto-icon"
           @click="autoRotate=!autoRotate">
      <img src="@/assets/images/help.png"
           class="help-icon"
           alt=""
           @click="dialogVisible=true;">
    </div>
    <div class="close pointer">
      <img src="@/assets/images/close.png"
           alt=""
           @click="close()">
    </div>

    <Tutorial v-model="dialogVisible"></Tutorial>
  </div>
</template>

<script>
import Tutorial from "@/components/tutorial/index.vue";
import ThreeView from "@/components/three/three-view.vue";
import BG from "@/assets/images/bg.jpg";
export default {
  name: "",
  components: {
    ThreeView,
    Tutorial,
  },
  data() {
    return {
      BG,
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
      autoRotate: false,
    };
  },
  methods: {},
  watch: {
    $route: {
      handler: function (val, oldVal) {
        const { baseUrl } = this;
        if (val.query.name) {
          this.modelUrl = `${baseUrl}${val.query.name}.fbx`;
          this.modelText.title = val.query.name;
        } else {
          this.$message.warning("请输入模型名称");
        }
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
