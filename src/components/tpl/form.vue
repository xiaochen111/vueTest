<template>
   <div>
       {{id}},{{name}}
   </div>
</template>


<script>
    export default {
        props:['id'],
        data(){
            return {
                name : 'zhangsan'
            }
        }
    }
</script>

<style scoped>

</style>

