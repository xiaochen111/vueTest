<template>
    <div class="loginBox ">
        <div class="boxCont">
            <h3>会员登录</h3>   
            <p>
                <label for="">用户名：</label>
                <input type="text" name="username" v-model="username">
            </p>
            <p>
                <label for="">密码：</label>
                <input type="password" name="password" v-model="password">
            </p>
            <button @click="login">登录</button> 
        </div>        
    </div>
</template>


<script>
    import axios from 'axios';
    export default{
        components:{
           
        },
        created(){
            console.log(this.$route.params)
        },
        data(){
            return {
                username:'',
                password:'',
            }
        },
        methods:{
            login() {

              if(!this.username){
                  this.alertFn('用户名不能为空！')
              }
              if(!this.password){
                  this.alertFn('密码不能为空！')
              }

              let parmes = {
                  userName:this.username,
                  password:this.password
              }

              axios({
                method:'post',
                url:`${this.$server}weblogin/login`,
                params:parmes,
              }).then((res)=>{
                if(res.data.code == '1'){
                    this.alertFn('登录成功','success');
                    this.$store.state.anth = true;
                    this.$store.state.username = this.username;
                    localStorage.setItem('username',this.username);
                    localStorage.setItem('anth',true);
                    this.$router.push({
                        path:'/',
                    });
                }else if(res.data.code == '0'){
                    this.alertFn(res.data.message)
                }
              })

            },

            alertFn(str,type='warning'){
                this.$message({
                    message: str,
                    type,
                    duration:2000
                });
            }
        }
    }
</script>


<style lang="less" scoped>
    @import "../../css/public.less";
    .loginBox{
        .wh(1200px,auto); margin:110px auto;
        &::after{
            content:".";clear:both; display:block; height:0;overflow:hidden;visibility:hidden; //清浮动
        }
        .boxCont{
            padding:10px;.border();.wh(300px,auto);.fr;
            h3{
                .lh(35px);.tc();.mb(15px);
            }
            p{
                .mb(15px);
                label{
                    width: 65px;.lh(30px); display: inline-block;.tr();
                }
                input{
                    .border();.lh(30px); width: 200px; outline: none;
                }
            }
            button{
                .buttonStyle(100px,35px,3px,@btnblue,#fff);.ml(108px);
            }
        }
    }
</style>
