<template>
    <div class="ModelContainer">
        <ThreeView 
            :modelUrl="modelUrl"
        ></ThreeView>
        <div class="left_top_box">
            <div class="Product_name">
                {{ProductName}}
            </div>
            <div class="owner">
                {{owner}}
            </div>
        </div>
        <div class="right_top_box">
            <div>
                <span class="rarity_num">{{rarity}}</span>
                <span class="recent">%</span>
            </div>
        </div>
    </div>
</template>
<script>
import ThreeView from "@/components/three/three-view.vue";
export default {
    components:{
        ThreeView
    },
    mounted(){
    },
    data(){
        return{
            modelUrl:'/static/boxModels/sanxing01.gltf',
            ProductName:'三星堆_光明守护者',
            owner:'由XXX拥有',
            rarity:'88'
        }
    },
    methods:{
        shareTo(){
            this.$router.push({path:'/shareModel'})
        }
    }
}
</script>
<style lang="scss" scoped>
.ModelContainer{
    background-color: #AAAAAA;
    background-image: url('../assets/images/modelBox_bg.jpg');
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
    .btn{
    bottom: 50px;
    // left: 50%;
    width: 100%;
    text-align: center;
    // transform: translateX(-50%);
    position: absolute;
    img{
        width:40%;
    }
  }
  .left_top_box{
    position: absolute;
    top: 33px;
    left: 10px;
    z-index: 999;
    background-image: url('../assets/images/left_top_bg.png');
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
    padding: 18px 0px 25px 10px;
    width: 280px;
    .Product_name{
        color: #fff;
        font-size: 23px;
        font-weight: bold;
        margin-bottom: 15px;
    }
    .owner{
        color: #fff;
        font-size: 16px;
    }
  }
  .right_top_box{
    position: absolute;
    top: 60px;
    right: 10px;
    z-index: 999;
    width: 80px;
    background-image: url('../assets/images/right_top_bg.png');
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
    padding: 10px 10px 35px 0px;
    text-align: center;
    color: #fff;
    .rarity_num{
        font-size: 25px;
        // font-weight: bold;
    }
    .recent{
        font-size: 12px;
    }
    .show{
        font-size: 12px;
    }
  }
}
</style>
