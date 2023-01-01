<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
  },
  methods: {},
  mounted() {},
};
</script>

<style lang="scss">
/*手机*/
@media screen and (max-width: 600px) {
  .el-message {
    min-width: 250px;
  }
}
</style>
<style>
  .van-slider__button{
      background: url('@/assets/images/slide_btn.png');
      background-repeat: no-repeat;
      background-position: center;
      /* background-color:none; */
      background-size: 100% 100%;
      box-shadow:none;
  }
  .van-slider{
      background: url('@/assets/images/slide_bg.png');
      background-repeat: no-repeat;
      background-position: center;
      /* background-color:none; */
      background-size: 100% 100%;
      box-shadow:none;
  }
  .van-slider__bar{
    background: transparent;
  }
</style>
