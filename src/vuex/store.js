import Vue from 'vue'
import Vuex from 'vuex'
import { Loading } from 'element-ui';
import * as types from './types.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  // 定义状态
  state: {
    copy_right: '热搜头条',
    token:null,
    loading_options: {
      target:document.body,
      body:false,
      fullscreen:true,
      lock:false,
    },
    loadingInstance:{},
  },
  mutations: {

    [types.UPDATE_LOADING]:(state,flag) => {
      if (flag) {     // show loading
        this.loadingInstance =  Loading.service(this.loading_options);
      } else {    // hide loading
        this.loadingInstance.close();
      }
    }
    
  }

})

export default store