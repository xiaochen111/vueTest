<template>
<div>
    <div class="block">
        <el-carousel trigger="click" height="300px">
            <el-carousel-item v-for="(item,index) in imgArr" :key="item" v-bind:style="{background:'url('+ item +')'}">
                <span style="color:#fff">{{index}}</span>
            </el-carousel-item>
        </el-carousel>
        <tabSearch class="content"></tabSearch>
        <!-- <div class="content">

        </div> -->
    </div>
</div>
</template>

<script>
    import tabSearch from './tabSearch.vue';
    export default{
        components:{
          tabSearch
        },
        data(){
            return{
                imgArr:['src/images/index/banner1.jpg','src/images/index/banner2.jpg','src/images/index/banner3.jpg']
            }
        },
        created(){
            console.log(this.$server)
        }
    }    
</script>

<style lang="less" scoped>
    @import '../../css/public.less';
    .block{
        .pos_r();
        .content{
             .pos_a();.wh(360px,200px);  top:50%; left:50%; background: rgba(255,255,255,.1); z-index: 9; .ml(-600px);.mt(-100px);
        }
        .serCard{
            .pos_a()
        }
    }
</style>