<template>
    <div>
        <headNav></headNav> <!-- 导航栏 -->
        <router-view></router-view>
        <foot></foot>
    </div>
</template>
<script>
    import headNav from './components/tpl/head.vue';
    import foot from './components/tpl/foot.vue';
    export default{
        data(){
            return {
                msg:'hellow,vuejs'
            }
        },
        components:{
            headNav,foot
        },
        methods:{

        },
        created(){

        }
    }
</script>
<style scoped>

</style>
