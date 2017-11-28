<template>
<div class="containner">
    <div class="listTable">
      <ul class="theadUl">
          <li class="li1"></li>
          <li class="li2">起运港/港区</li>
          <li class="li3">航程/中转</li>
          <li class="li4">目的港/挂靠</li>
          <li class="li5">截关日/开航日</li>
          <li class="li6">有效期</li>
          <li class="li7">20GP</li>
          <li class="li8">40GP</li>
          <li class="li9">40HC</li>
          <li class="li10"><button>导出</button></li>
      </ul>
      <div class="contxt" v-loading="$store.state.fcl.load">
          <!-- v-for="(item,index) in list" :key="item.id" -->
          <div class="listBox" v-for="(item,index) in $store.state.fcl.rows" :key="item.id">
              <div class="listShow">
                  <ul>
                    <li class="li1"></li>
                    <li class="li2">
                        <p class="p1">{{item.portStartNameEn}}({{item.portStartName}})</p>
                        <p class="p2">{{item.supplierName}}</p>
                    </li>
                    <li class="li3">
                        <p class="p1">{{item.voyage}}天</p>
                        <p class="p2">
                            <span v-if="item.transFlag == '2'">{{item.transportName || '-'}}</span>
                            <span v-else-if="item.transFlag != '2'">直航</span>
                        </p>
                    </li>
                    <li class="li4">
                        <p class="p1">{{item.portEndNameEn}}({{item.portEndName}})</p>
                        <p class="p2">
                            <span v-if="item.portEndWharf == ''">-</span>
                            <span v-else-if="item.portEndWharf != ''">{{item.portEndWharf||'-'}}</span>
                        </p>
                    </li>
                    <li class="li5">
                        <p class="p1">周：1，3，5</p>
                        <p class="p2">周：1，3，5</p>
                    </li>
                    <li class="li6">11/01-11/14</li>
                    <li class="li7">$20GP</li>
                    <li class="li8">40GP</li>
                    <li class="li9">40HC</li>
                    <li class="li10">
                        <p class="p1"><span>咨询</span><span>砍价</span></p>
                        <p class="p2" @click="showHide">附加费明细</p>
                    </li> 
                  </ul>
                  <div class="baseStrip">
                      <span class="company">{{item.supplierName}}</span>
                      <div class="hoverTwo">
                          <el-tooltip content="centerBottom center" placement="bottom" effect="light">
                            <el-button><img src="./images/bei.png" alt=""></el-button>
                          </el-tooltip>
                          <el-tooltip content="Bottom center" placement="bottom" effect="light">
                            <el-button><img src="./images/xian.png" alt=""></el-button>
                          </el-tooltip>
                      </div>
                  </div>
              
              </div>
              <div class="listHide">
                   <listHide :obj = 'item'></listHide>   <!-- props  向子组件传递数据 -->
              </div>  
          </div>
      </div>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="$store.state.fcl.pageSize"
        layout="prev, pager, next, jumper"
        :total="$store.state.fcl.total">
       </el-pagination>
    </div>
    
</div>
</template>

<script>
    import parmes from "./parmes";
    import listHide from './listHide.vue';
    export default{
        data(){
            return {
                currentPage: 1,
            }
        },
        components:{
          listHide
        },
        // props:['listArr'],
        created(){
            this.$store.commit("fclFn");
        },
        methods:{
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                parmes.pageNo = val;
                this.$store.commit("fclFn");
            },
            showHide(e){
                var target = e.target;
                $(target).parents('.listBox').siblings().find('.listHide').slideUp();
                $(target).parents('.listShow').siblings('.listHide').slideToggle();
            }
        },
    }    
</script>

<style lang="less" scoped>
    @import "../../css/public.less";
    .liWidth(){
        .li1{width: 35px}
        .li2{width: 165px}
        .li3{width: 165px}
        .li4{width: 215px}
        .li5{width: 135px}
        .li6{width: 112px}
        .li7{width: 85px}
        .li8{width: 85px}
        .li9{width: 85px}
        .li10{width: 116px}
    }
    .pPosit(){
        p{
            position: absolute; left: 26px; height: 20px; line-height: 20px; .tc(); width: 100%; left:0;.boxsize();padding:0 10px;.overhide();
            &:nth-child(1){
                top:14px;
            }
            &:nth-child(2){
                top:36px;
            }
        }
    }
    .containner{
         .wh(1200px,auto);  margin: 10px auto;//overflow: hidden;
    }
    .listTable{
        //.fl; 
        .pb(60px);
        .theadUl{
            .lh(35px);background: #ddd;
            li{
                .fl; .lh(35px);.overhide();.tc();.ft(14px);
            }
            .liWidth();
            button{
                .buttonStyle(90px,26px,3px,@btnblue,#fff);
            }
        }
    }
    .contxt{
        .listBox{
            .border();.mt(-1px);
        }
        .listShow{
            .wh(100%,90px);background: url('./images/boxTop.png') center -32px no-repeat;
            ul{
                .lh(65px);width: 100%;
                li{
                    .fl;.lh(65px);.overhide();.tc(); .pos_r();
                     &.li2{
                        .pPosit();
                        .p1{
                            .ft(14px);
                        }
                    }
                    &.li3{
                        background: url('./images/rock_j.png') center 31px no-repeat;
                    }
                    &.li3,&.li4,&.li5,&.li10{
                        .pPosit();
                    }
                    &.li10{
                        .p1{
                            span{.cur;}
                            span:first-child{
                                .mr(18px);
                            }
                        }
                        .p2{
                            .cur;
                        }
                    }
                }
                .li7,.li8,.li9{color: #f05a28;.ft(14px);font-weight: bold;}
                .liWidth();
            }
            .baseStrip{
                height: 25px; line-height: 8px;
                .company{
                    .fl;.ml(35px);color:#26a9e0; display: inline-block; width: 165px;.tc();
                }
                .hoverTwo{
                    display: inline-block;width: 116px;.fr; height: 25px;.tc();
                    .el-button{
                        border:none;padding:0;
                    }
                    .el-button:hover{
                        background: transparent;
                    }
                    img{
                        vertical-align: top;.mt(-10px);.cur;
                        &:first-child{
                            // .mr(12px);
                        }
                    }
                }
            }
        }
        .listHide{
            .wh(100%,auto);border-top:1px solid #ddd;display: none;
        }
    }
    .el-pagination{
        .fr;margin:15px 0;
    }
</style>