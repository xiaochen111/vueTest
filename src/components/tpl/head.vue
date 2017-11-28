<template>
  <div class="head">
      <div class="headContain">
          <span>logo</span>
          <ul class="navLi">
              <li><router-link to="index">首页</router-link></li>
              <li><router-link to="fcl">运价</router-link></li>
              <li>详情</li>
              <li>
                  <span v-if="$store.state.username">
                      <router-link to="menber">{{$store.state.username}}</router-link>
                  </span>
                  <span v-else>
                      <router-link to="login">登录</router-link>
                  </span>
              </li>
              <li><router-link to="demo">demo</router-link></li>
          </ul>
      </div>
  </div>
</template>

<script>
    export default{}    
</script>

<style lang="less" scoped>
    @import '../../css/public.less';
    .head{
        height: 35px;.bgCol(#ccc);
        .headContain{
            .wh(1200px,35px);.lh(35px); margin: 0 auto;
        }
        .navLi{
            .fr; 
            li{
                width: 80px; .tc(); color:#fff;.ft(14px);.fl;
                a{
                    color:#fff;
                }
            }
        }
    }
</style>


