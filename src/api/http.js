import axios from 'axios'
import qs from 'qs'
import store from '../vuex/store.js'
import { Message } from 'element-ui'
import * as types from '../vuex/types.js'


axios.interceptors.request.use(config => {

  store.commit(types.UPDATE_LOADING,true) //显示loading
  if (store.state.token) {
    config.headers.Authorization = `token ${store.state.token}`
  }
  return config;
}, error => {
  return Promise.reject(error)
})


axios.interceptors.response.use(response => {
  return response
}, error => {

  if (error.response) {
    switch (error.response.status) {
      case 401:
        // 401 清除token信息并跳转到登录页面
        store.commit(types.LOGOUT)
        
        // 只有在当前路由不是登录页面才跳转
        router.currentRoute.path !== 'login' &&
          router.replace({
            path: 'login',
            query: { redirect: router.currentRoute.path },
          })
    }
  }
  // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
  return Promise.reject(error.response)

})

function errorState(response) {
  store.commit(types.UPDATE_LOADING,false)  //隐藏loading
  console.log(111)
  console.log(response)
  // 如果http状态码正常，则直接返回数据
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    return response
      // 如果不需要除了data之外的数据，可以直接 return response.data
  }else{

    Message('网络异常');
    
  }
  
}

function successState(res) {
  store.commit(types.UPDATE_LOADING,false) //隐藏loading
  //统一判断后端返回的错误码
  if (res.status == 200) {    //成功

  } else {
    Message('网络异常');
  }
  
}
const httpServer = (opts, data) => {

    let Public = { //公共参数
      'srAppid': ""
    }

    let httpDefaultOpts = { //http默认配置
          method:opts.method,
          baseURL:'https://www.easy-mock.com',
          url: opts.url,
          timeout: 10000,
          params:Object.assign(Public, data),
          data:qs.stringify(Object.assign(Public, data)),
          headers: opts.method=='get'?{
            'X-Requested-With': 'XMLHttpRequest',
            "Accept": "application/json",
            "Content-Type": "application/json; charset=UTF-8"
          }:{
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          }
    }

    if(opts.method=='get'){
      delete httpDefaultOpts.data
    }else{
      delete httpDefaultOpts.params
    }
    
    let promise = new Promise(function(resolve, reject) {
      axios(httpDefaultOpts).then(
        (res) => {
          successState(res)
          resolve(res)
        }
      ).catch(
        (response) => {
          errorState(response)
          reject(response)
        }
      )

    })
  return promise
}

export default httpServer