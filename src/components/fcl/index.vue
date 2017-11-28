<template>
  <div>
    <search></search>
    <selectIpt></selectIpt>
    <list></list>
  </div>
</template>

<script>
    import selectIpt from './selectIpt.vue';
    import search from './search.vue';
    import list from './fclList.vue';
    export default{
      components:{
        selectIpt,search,list
      },
      created(){
      }
    }    
</script>

<style lang="less" scoped>

</style>