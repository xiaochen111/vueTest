import Vue from 'vue';
import vuex from 'vuex';

import listRender from './components/fcl/listSearch'

Vue.use(vuex);


let username = '';
let anth = '';
let nameValue = localStorage.getItem('username');
let anthValue = localStorage.getItem('anth');
if(nameValue){
    username = nameValue;
}
if(anthValue){
    anth = anthValue;
}


var store = new vuex.Store({//store对象
    state: {
        fcl:{},
        anth:anth,  //是否已经登录
        username:username,   //用户名
    },
    mutations: {
        fclFn(state) {
            state.fcl.load = true;  //loading
            listRender((res)=>{
                state.fcl = res.data;
                state.fcl.load = false;
                console.log(res)
            })
        }
    }
})
export default store;