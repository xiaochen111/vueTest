<template>
  <div class="containerBox">
    <div class="limit" v-for="(item,index) in data" :key="index">
        <div class="pic">
            <img src="./images/pic_index1.png" alt="">
            <p>有效期:{{item.beginDateStr}} - {{item.endDateStr}}<br/>截关/开航：{{item.cutoffDay}}/{{item.schedule}} &nbsp;&nbsp;&nbsp;航程:{{item.voyage}}天 </p>
        </div>
        <div class="contant">
            <div class="starEnd">
                <p>起始港：{{item.portStartNameEn}} ({{item.wharfNameEn}})</p>
                <p>目的港：{{item.portEndNameEn}}</p>
            </div>
            <ul>
              <li>20GP</li>
              <li>40GP</li>
              <li>40HC</li>
              <li class="font">
                <span v-if="item.price20 == '999999999'">电询</span>
                <span v-else-if="item.price20 == ''">-</span>
                <span v-else>${{item.price20}}</span>
              </li>
              <li class="font">
                <span v-if="item.price40 == '999999999'">电询</span>
                <span v-else-if="item.price40 == ''">-</span>
                <span v-else>${{item.price40}}</span>
              </li>
              <li class="font">
                <span v-if="item.price40hq == '999999999'">电询</span>
                <span v-else-if="item.price40hq == ''">-</span>
                <span v-else>${{item.price40hq}}</span>
              </li>
            </ul>
            <button @click="toList(item.freightFclId)">详情</button>
        </div>
    </div>
  </div>
</template>

<script>
    import axios from 'axios';
    export default{
      data(){
        return {
            data:[]
        }
      },
      created(){
        axios.post(`${this.$server}freightfclweb/querysalefreightfcllist`).then((res)=>{
            this.data = res.data;
        })
      },
      methods:{
        toList(id){
          this.$router.push({
              path:'/fcl',
              query:{freightFclId:id},//传参数
          })
        }
      }
    }    
</script>

<style lang="less" scoped>
    @import '../../css/public.less';
    .containerBox{
      .wh(1200px,auto);margin: 10px auto; overflow: hidden;
    }
    .limit{
      .wh(285px,315px);.border();.fl;.mr(17px);
      &:last-child{
        .mr(0);
      }
      .pic{
        .wh(285px,150px);.pos_r();overflow: hidden;
        &:hover{
          p{
            transform: translateY(-25px);
          }
        }
        p{
          .pos_a();bottom: -25px; height: 50px; line-height: 25px; color:#fff; .tc(); background: rgba(0, 0, 0, 0.5);width: 100%;transition: all 0.5s;
        }
      }
      .contant{
        .boxsize();padding:10px;.wh(100%,165px);
        .starEnd{
          border-bottom: 2px solid #3caef0;
          p{
            .lh(25px);
          }
        }
        ul{
          li{
            width: 100%/3;.fl;.lh(30px);.tc();
            &.font{
              color:red;
            }
          }
        }
        button{
          .buttonStyle(80px,26px,3px,@btnblue,#fff);.fr;.mt(5px);
        }
      }
    }
</style>