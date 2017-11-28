<template>
<div class="searchSelect">

        <div class="col3">
            <label for="">起始港:</label>
            <el-select v-model="value6"  placeholder="请选择起始港" @change="change" clearable  remote filterable :remote-method="remoteMethod" size="mini" class="selectIpt">
                <el-option
                    v-for="item in portStart"
                    :key="item.id"
                    :label="item.nameCn"
                    :value="item.id">
                    <span style="float: left">{{ item.nameCn }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.nameEn }}</span>
                </el-option>
            </el-select>
        </div>

        <div class="col3">
            <label for="">目的港:</label>
            <el-select  v-model="value7" placeholder="请选择目的港" @change="changeEnd" clearable  remote filterable :remote-method="remoteMethodEnd" size="mini" class="selectIpt">
                <el-option
                    v-for="item in portEnd"
                    :key="item.id"
                    :label="item.nameCn"
                    :value="item.id">
                    <span style="float: left">{{ item.nameCn }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.nameEn }}</span>
                </el-option>
            </el-select>
        </div>

        <div class="col3">
            <label for="">船公司:</label>
            <el-select  v-model="value8" placeholder="请选择船公司"   @change="changeShipping" clearable remote  filterable size="mini" class="selectIpt">
                <el-option
                    v-for="item in shippingList"
                    :key="item.id"
                    :label="item.nameCn"
                    :value="item.id">
                    <span style="float: left">{{ item.nameCn }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.nameEn }}</span>
                </el-option>
            </el-select>
        </div>

        <div class="col3">
             <button @click="parmes">查询</button>
        </div>
       

</div>
  

</template>

<script>
import parmes from "./parmes";
import axios from 'axios';
export default {
  data() {
    return {
      portStart: [],
      portEnd: [],
      shippingList:[],
      value6: "",
      value7: "",
      value8: "",
    };
  },
  created(){

      
      axios.post(`${this.$server}drop/queryportlist`).then((res)=>{
        this.portEnd = this.portStart = res.data;//起始港 目的港
      })

      axios.post(`${this.$server}drop/queryshippinglist`).then((res)=>{
       this.shippingList = res.data;//船公司
      })

    //   console.log(this.$route)
      this.value6 = parmes.portStartIds = this.$route.query.portStartIds;
      this.value7 = parmes.portEndIds = this.$route.query.portEndIds;
      this.value8 = parmes.shippingIds = this.$route.query.shippingIds;
      console.log(this.$route)
      parmes.freightFclId = this.$route.query.freightFclId;
      this.$store.commit("fclFn");

  },
  methods: {
    parmes() {
      console.log(parmes);
      this.$store.commit("fclFn");
    },


    change(id){
        console.log(id)
        
        parmes.portStartIds = id;
    },
    remoteMethod(query){
        axios({
             method:'post',
             url:`${this.$server}drop/queryportlist`,
             params:{nameCn:query},
        }).then((res)=>{
            console.log(res)
            this.portStart = res.data;//起始港
        })
    },

    changeEnd(id){
        console.log(id)
        parmes.portEndIds = id;
    },
    remoteMethodEnd(query){
        axios({
             method:'post',
             url:`${this.$server}drop/queryportlist`,
             params:{nameCn:query},
        }).then((res)=>{
            console.log(res)
            this.portEnd = res.data;//目的港
        })
    },

    changeShipping(id){
        console.log(id)
        parmes.shippingIds = id;
    },



  }
};
</script>

<style lang="less" scoped>
    @import "../../css/public.less";
    .searchSelect {
        .wh(1200px,50px); .boxsize(); .pt(5px); .border();
        margin: 30px auto;
        .col3{
            width: 298px;.lh(40px);.fl;
            label{
                width: 90px; display: inline-block;.ft(14px);.fl;.tr();.boxsize(); .pr(10px);
            }
            .selectIpt{
                .fl;
            }
            button{
                .buttonStyle(120px, 30px, 3px, @btnblue, #fff);.ft(14px);
            }
        }
    }
</style>