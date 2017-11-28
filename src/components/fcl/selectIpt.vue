<template>
  <div class="cardBox">
      <dl>
          <dt> <span>船公司:</span> <el-checkbox :indeterminate="isIndeterminateshippingList" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox></dt>
          <dd>
                <el-checkbox-group v-model="checkedshippingList" @change="handleshippingListChange" class="ipts">
                    <el-checkbox v-for="(item,index) in shippingList" :label="item.id"  :key="index" >{{item.name}}</el-checkbox>
                </el-checkbox-group>
          </dd>
          <span class="more">更多</span>
      </dl>

      <dl>
          <dt> <span>航线:</span> <el-checkbox :indeterminate="isIndeterminaterouteList" v-model="checkAllrouteList" @change="handleCheckAllRouteList">全选</el-checkbox></dt>
          <dd>
                <el-checkbox-group v-model="checkedrouteList" @change="handleRouteListChange" class="ipts">
                    <el-checkbox v-for="(item,index) in routeList" :label="item.id"  :key="index" >{{item.name}}</el-checkbox>
                </el-checkbox-group>
          </dd>
          <span class="more">更多</span>
      </dl>
  </div>
</template>

<script>
    import axios from 'axios';
    import parmes from './parmes';
    console.log(parmes)
    export default{
        data(){
            return {

                checkAll: false,
                checkedshippingList: [],
                shippingList:[],
                isIndeterminateshippingList: true, //船公司

                checkAllrouteList: false,
                checkedrouteList: [],
                routeList:[],
                isIndeterminaterouteList: true, //航线

            }
        },
        created(){
           // parmes.name = 'zhangsan';

            axios.post(`${this.$server}freightfclweb/queryShippingList`).then((res)=>{
                this.shippingList = res.data;//船公司
            })

            axios.post(`${this.$server}freightfclweb/queryRouteList`).then((res)=>{
                this.routeList = res.data;//航线
            })
        },
        mounted(){
            $('.more').click(function(){
                $(this).parent().siblings().removeClass('show');
                $(this).parent().toggleClass('show');
            })
        },
        methods:{
            handleCheckAllChange(val) {
                console.log(val);
                console.log(this.shippingList)
                this.checkedshippingList = val ? true : [];
                this.isIndeterminateshippingList = false;
            },
            handleshippingListChange(value) {
                console.log(value)
                parmes.shippingIds = value.toString();
                this.$store.commit("fclFn");
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.shippingList.length;
                this.isIndeterminateshippingList = checkedCount > 0 && checkedCount < this.shippingList.length;
            },
            //船公司

            handleCheckAllRouteList(val) {
                this.checkedrouteList = val ? true : [];
                this.isIndeterminaterouteList = false;
            },
            handleRouteListChange(value) {
                // this.$store.commit("fclFn");
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.routeList.length;
                this.isIndeterminaterouteList = checkedCount > 0 && checkedCount < this.routeList.length;
            },
            //航线(搜索没做)

        }
    }    
</script>

<style lang="less" scoped>
    @import '../../css/public.less';
    .cardBox{
        .wh(1200px,auto);  margin: 30px auto;
        dl{
            .wh(100%,40px);.lh(40px); overflow: hidden;.pos_r();
            &::after{
                content:".";clear:both; display:block; height:0;overflow:hidden;visibility:hidden; //清浮动
            }
            &.show{
                overflow: inherit; height: auto;
            }
            dt{
                width: 135px;.fl; text-align: right; .pr(15px);
                span{
                    .mr(10px);.ft(14px);
                }
            }
            dd{
                width: 1020px;.fl;
                .el-checkbox__label{.ft(12px);}
            }
            .more{
                .pos_a(); right: 0; top: 0px;.cur;
            }
        }
        .checkAll{
            .mr(20px);
        }
        .ipts{
            display: inline-block;
        }
    }
</style>