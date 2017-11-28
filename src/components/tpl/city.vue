<template>
  <div class="containerBox">
      <div class="ssq">
          <input type="text" placeholder="省区市" v-model="areaString" @click="cityShowFn">
          <div class="dropBox" v-show="cityShow">
              <ul class="tab">
                  <li @click="tab = 0" v-bind:class=" tab == 0 ? 'act':'' ">省份</li>
                  <li @click="tab = 1" v-bind:class=" tab == 1 ? 'act':'' ">城市</li>
                  <li @click="tab = 2" v-bind:class=" tab == 2 ? 'act':'' ">区县</li>
              </ul>
              <ul id="province" v-show="tab == 0">
                 <li v-for="(item,index) in province" :key="index" :id="item.id"  @click="districtFn">{{item.nameCn}}</li>
              </ul>
              <ul id="district" v-show="tab == 1">
                  <li v-for="(item,index) in district" :key="index" :id="item.id" @click="cityFn">{{item.nameCn}}</li>
              </ul>
              <ul id="city" v-show="tab == 2">
                  <li v-for="(item,index) in city" :key="index" :id="item.id"  @click="getCity">{{item.nameCn}}</li>
              </ul>
          </div>
      </div>
  </div>
</template>

<script>
   import axios from 'axios';
   export default {
    data() {
        return {
            tab : 0,
            cityShow:false,
            areaString : '',
            province:[],//省级
            district:[],//区域
            city:[],//城镇
        }
    },
    created(){
        this.area(0,(res)=>{  //初始化省级数据
           this.province = res;
        })
    },
    mounted(){
       
    },
    methods: {
        cityShowFn(){
            this.cityShow = !this.cityShow;
        },
        cityFn(e){ //获取城镇
            let target = e.target;
            let id = $(target).attr('id');
            let district = $(target).html();
            if(this.areaString.indexOf('-')>-1){
                var arrArea = this.areaString.split('-')
                this.areaString = arrArea[0] +'-'+ district;
            }else{
                this.areaString = this.areaString +'-'+ district;
            }
            this.area(id,(res)=> {
                this.city = res;
                this.tab = 2;
            })
        },
        districtFn(e){ //获取区县
            let target = e.target;
            let id = $(target).attr('id');
            let province = $(target).html();
            this.areaString = province;
            this.city = [];
            this.area(id,(res)=> {
                this.district = res;
                this.tab = 1;
            })
        },
        getCity(e){ //点击取城镇的值
            let target = e.target;
            let id = $(target).attr('id');
            let city = $(target).html();
            var arrArea = this.areaString.split('-')
            this.areaString = arrArea[0] +'-'+arrArea[1]+'-'+city;
            // this.area(id,(res)=> {
            //     this.tab = 1;
            // })
        },
        provinceFn(){//省市

        },
        area(paramesNum,cb){
            axios({
                method:'post',
                url:`${this.$server}area/querylist`,
                params:{
                    pid:paramesNum
                },
            }).then((res)=>{
                cb(res.data)
            })
        }

    }
  };    
</script>

<style lang="less" scoped>
    @import "../../css/public.less";
    .containerBox{
        width: 1200px; margin: 0 auto; height: auto;
        .ssq{
            .wh(300px,35px);.border();.pos_r();
            input{
                outline: none; .lh(35px); text-indent: 10px; border: none; width: 100%;
            }
            .dropBox{
                .pos_a(); top: 35px; left: -1px; .border();.boxsize();padding:10px; width: calc(~"120% + 2px"); background: #fff; z-index: 999;
            }
            .tab{
                .lh(30px); .bor_b();
                li{
                    display: inline-block; padding:0 20px; .fl;
                    &.act{
                        color:blue;
                    }
                }
            }
            #province,#district,#city{
                .boxsize();padding:15px; width: 100%;
                li{
                    .wh(25%,30px);.tc();.overhide();.fl; .ft(12px);.lh(30px);.cur;
                }
            }
        }
    }
</style>