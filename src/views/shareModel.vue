<template>
  <div class="shareContainer">
    <img class="share_bg" src="../assets/images/share_bg.jpg" alt="" />
    <img @click="goShop"  class="shop_to" src="../assets/images/share_shop_left.png" alt="">
    <div class="owner_box">
        <img src="../assets/images/share_shop_right.png" alt="">
        <span>
            {{owner}}
        </span>
    </div>
  </div>
</template>
<script>
export default {
  mounted() {},
  data() {
    return {
        owner:'由XXX拥有'
    };
  },
  methods:{
      goShop(){
        //   window.location.href='http://192.168.6.231:8080/#/ModelBox'
      }
  }
};
</script>
<style lang="scss" scoped>
.shareContainer {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  .share_bg {
    width: 100%;
    height: 100%;
    background-image: url("../assets/images/share_bg.jpg");
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
  }
  .shop_to{
      width: 40%;
      position: absolute;
      top: 5px;
      left: 0px;
  }
  .owner_box{
      position: absolute;
      top: 30px;
      right: 5px;
      text-align: right;
      img{
         width: 65%;
      }
      span{
          color: #fff;
          position: absolute;
          font-size: 10px;
          top: 20px;
          right: 12px;
      }
  }
}
</style>
