import axios from 'axios'
import store from '@/vuex/store'

// axios 配置
axios.defaults.timeout = 5000;
axios.defaults.baseURL = window.GLOBAL_CONFIG.API_HOST; //请求地址
axios.defaults.headers['Accept'] = 'application/json, text/plain, */*'
axios.defaults.headers['content-Type'] = 'application/json'
axios.defaults.headers.common['X-ECAPI-UserAgent'] = 'Platform/Wechat'
axios.defaults.headers.common['X-ECAPI-UDID'] = 'null';
axios.defaults.headers.common['X-ECAPI-Ver'] = "1.1.0";
axios.defaults.headers.common['X-ECAPI-Sign'] = 'null';
// 请求添加头部信息
axios.interceptors.request.use((config) => {
  // config.headers = {
  //   "Authorization": "Bearer " + localStorage.getItem('auth_token'),
  //   "Accept": "application/json, text/plain, */*",
  //   "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
  //   "Access-Control-Allow-Origin": "*",
  //   "Access-Control-Allow-Headers": "x-requested-with,content-type"
  // }
  return config;
},(error) =>{
  //_.toast("错误的传参", 'fail');
  return Promise.reject(error);
});

//返回状态判断
axios.interceptors.response.use((res) =>{
  // if(!res.data.success){
  //   //console.log(res)
  //     //_.toast(res.data.msg);
  //     return Promise.reject(res);
  // }
  return res;
}, (error) => {
    //_.toast("网络异常", 'fail');
    console.log("网络异常");
    return Promise.reject(error);
});

export function Post(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then((response)=>{
        resolve(response)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export function Get(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url,params)
      .then((response)=>{
        resolve(response)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export default {
  /**
   * 用户登录
  */
  Login(params) {
    return Post('/v2/ecapi.auth.signin', params)
  },
  /**
   * 把token存到http的header
   */
  setHeader(params){
    axios.defaults.headers.common['X-ECAPI-Authorization'] = params;
  }
}