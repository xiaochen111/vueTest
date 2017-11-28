<template>
  <div class="hideList">
      <div class="boxLeft">
          <h3>费用明细</h3>
          <el-table
            :data="tableData"
            size="mini"
            style="width: 100%"
            >
            <el-table-column
            prop="date"
            label="日期"
            >
            </el-table-column>
            <el-table-column
            prop="name"
            label="姓名"
            >
            </el-table-column>
            <el-table-column
            label="姓名"
            prop="address"
            >
            </el-table-column>
          </el-table>

          <div class="operation">
              <div class="iptNum">
                  <dl>
                      <dt>出运货量</dt>
                      <dd>
                         <span>20GP:</span> <el-input-number size="mini" @change="handleChange20gp" :min="0"  v-model="GP20"></el-input-number>
                      </dd>
                      <dd>
                         <span>40GP:</span> <el-input-number size="mini" @change="handleChange40gp" :min="0"  v-model="GP40"></el-input-number> 
                      </dd>
                      <dd>
                         <span>40HQ:</span> <el-input-number size="mini" @change="handleChange40hq" :min="0" v-model="HQ40"></el-input-number> 
                      </dd>
                  </dl>
              </div>
              <div class="checkLi">
                  <city></city>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
    import city from '../tpl/city.vue';
    export default {
        components:{
            city
        },
        props:['obj'],
        data() {
            return {
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }],
                GP20:1,
                GP40:1,
                HQ40:1,
            }
        },
        methods:{
            handleChange20gp(value){
                console.log(value);
            },
            handleChange40gp(value){
                console.log(value);
            },
            handleChange40hq(value){
                console.log(value);
            }
        }
    }    
</script>

<style lang="less" scoped>
    @import "../../css/public.less";
    .hideList{
        // overflow: hidden; 
        height: auto;width: 1198px;
    }
    .boxLeft{
        .wh(50%,auto);.boxsize();padding:10px;//.fl;
        h3{
            .ft(14px);.lh(30px);font-weight: bold;
        }
        .operation{
            .border();.wh(100%,auto);.mt(10px);
            .iptNum{
                .lh(45px);.bor_b();
                dl{
                    dt{
                        .wh(12%,45px);.fl;.boxsize();.pl(10px);
                    }
                    dd{
                        .wh(88%/3,45px);.fl;.boxsize();.pl(10px);
                        .el-input-number--mini{
                            width: 100px;
                        }
                    }
                }
            }
        }
        .checkLi{
            .boxsize(); padding:10px;
        }
    }
</style>