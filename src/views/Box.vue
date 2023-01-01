<template>
    <div class="BoxContainer">
        <ThreeView 
            :modelUrl="modelUrl"
            :slideVal="slideVal"
        ></ThreeView>
      <div class="btn">
        <van-slider :button-size="70" :bar-height="30"  v-model="value" @input="onChange" />
      </div>
      <van-popup v-model="show">
          <div class="aready_join">
              <img class="activity" src="../assets/images/diolog_join.png" alt="">
              <img @click="goShop" class="returnShop" src="../assets/images/join_btn.png" alt="">
          </div>
      </van-popup>
    </div>
</template>
<script>
import ThreeView from "@/components/three/three-view.vue";
export default {
    components:{
        ThreeView
    },
    data(){
        return{
            modelUrl:'/static/boxModels/blinnl04/manhe_01.fbx',
            slideVal:0,
            value: 0,
            show: false,
        }
    },
    methods:{
        onChange(value) {
            this.slideVal = value
            if(value==100){
            // this.show = true;

                // this.$http.get(
                //     '/net/integral/luckdrawshengbo.ashx?type=go&scene=11&date=2022-08-01&Luck=1'
                // ).then(res=>{
                    // if(res.Data){
                        this.$router.push({
                        path:'/ModelBox'
                        // query:{list:res.Data}
                        })
                    // }
                // });
            }
        },
        goShop(){
            this.show = false;
             //   window.location.href='http://192.168.6.231:8080/#/ModelBox'
        }
    }
}
</script>
<style lang="scss" scoped>
.BoxContainer{
    // background-color: #000;
    background-image: url('../assets/images/manhe_bg.jpg');
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
.btn{
    bottom: 20%;
    // left: 50%;
    width: 100%;
    padding: 0 100px;
    text-align: center;
    // transform: translateX(-50%);
    position: absolute;
    img{
        width:50%;
    }
  }
  .aready_join{
      text-align: center;
      .activity{
          width: 100%;
      }
      .returnShop{
          width:80%;
          margin-top: 15px;
      }
  }
  .van-popup{
      background-color: transparent!important;;
  }
}
</style>