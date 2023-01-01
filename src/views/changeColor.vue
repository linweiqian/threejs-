<template>
    <div class="containerColor">
        <div class="color1" @click="colorBtn1"></div>
        <div class="color2" @click="colorBtn2"></div>
        <div class="color3" @click="colorBtn3"></div>
    </div>
</template>
<script>
import {mesh} from "@/threejs/index.js";
export default {
    name:'ChangeColor',
    data(){
        return{

        }
    },
    mounted(){
        // console.log(666,mesh)
    },
    methods:{
        colorBtn1(){
            mesh.material.color.set(0x4a15c7)
        },
        colorBtn2(){
            mesh.material.color.set(0x15c759)
        },
        colorBtn3(){
            mesh.material.color.set(0xeb1022)
        }
    }
}
</script>
<style lang="scss" scoped>
.containerColor{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 150px;
    div{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin: 0 20px;
        cursor: pointer;
    }
    .color1{
        background-color: #4a15c7;
    }
    .color2{
        background-color: #15c759;
    }
    .color3{
        background-color: #eb1022;
    }
}
</style>