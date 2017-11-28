<template>
  <div class="tabBox">
      
       <div class="col3">
            <label for="">起始港:</label>
            <el-select v-model="value6" placeholder="请选择起始港" @change="change" remote filterable :remote-method="remoteMethod" size="mini" class="selectIpt">
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
            <el-select v-model="value7" placeholder="请选择目的港" @change="changeEnd" remote filterable :remote-method="remoteMethodEnd" size="mini" class="selectIpt">
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
            <el-select v-model="value8" placeholder="请选择船公司" @change="changeShipping" remote  filterable size="mini" class="selectIpt">
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
             <button @click="toFcl">查询</button>
        </div>

  </div>
</template>

<script>
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
            parmesObj:{},
        };
    },
    created(){
        axios.post(`${this.$server}drop/queryportlist`).then((res)=>{
            this.portEnd = this.portStart = res.data;//起始港 目的港
        })

        axios.post(`${this.$server}drop/queryshippinglist`).then((res)=>{
        this.shippingList = res.data;//船公司
        })
    },
    methods: {
        toFcl() {
            // this.$store.commit("fclFn");
            console.log(this.$route)
            this.$router.push({
                path:'/fcl',
                query:this.parmesObj,//传参数
            })
        },


        change(id){
            console.log(id)
            this.parmesObj.portStartIds = id;
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
           this.parmesObj.portEndIds = id;
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
            this.parmesObj.shippingIds = id;
        },
     }
    };    
</script>

<style lang="less" scoped>
    @import '../../css/public.less';
    .tabBox{
       .wh(300px,200px); color:#fff;padding:15px;.boxsize();
       .col3{
            width: 100%;.lh(40px); .tc();
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