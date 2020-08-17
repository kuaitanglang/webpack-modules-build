import Vue from 'vue'; // get vue
import axios from 'axios';
import qs from 'qs';

// axios 配置
//axios.defaults.baseURL = 'http://10.201.1.91:9021/ccp-web/';
axios.defaults.timeout = 5000;
axios.defaults.withCredentials = false;
//axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
//axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
//axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
//axios.defaults.headers.post['Access-Control-Request-Headers'] = 'x-requested-with';

// 添加请求拦截器
axios.interceptors.request.use((config) => {
    //	POST传参序列化
    if (config.method === 'post') {
        config.data = qs.stringify(config.data);
    }
    //  //跨域前端会发送OPTIONS验证请求，后台需要处理OPTIONS请求，然后发送正式请求、浏览器会看到两次请求
    //     //  config.headers={
    //     // 		'Accept':"application/json, text/plain, */*; charset=utf-8",
    //     //		'Content-Type':"application/json",
    //     //  }
    return config;
}, (err) => {
    return Promise.reject(err);
});

// 添加响应拦截器
axios.interceptors.response.use((res) => {
    return res;
}, (err) => {
    return Promise.reject(err);
});


Vue.prototype.$post = function (url, params, showLoading) {
    return axios.post(url, params)
};

Vue.prototype.$get = function (url, params, showLoading) {
    return axios.get(url, {
        //withCredentials: true,
        params: params
    })
};

export default axios;