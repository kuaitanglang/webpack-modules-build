//import Vue from 'vue'; // get vue
const Vue = $vue.default;

import { MessageBox, Toast, Indicator} from 'mint-ui';
//import axios from 'axios';
import qs from 'qs';
import store from '@entry/store';

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
    if(config.method  === 'post'){
        config.data = qs.stringify(config.data);
    }
//  //跨域前端会发送OPTIONS验证请求，后台需要处理OPTIONS请求，然后发送正式请求、浏览器会看到两次请求
//  config.headers={
// 		'Accept':"application/json, text/plain, */*; charset=utf-8",
//		'Content-Type':"application/json",
//  }
    return config;
},(err) =>{
	MessageBox.alert('请求错误，请重试！').then(action => {
		//返回主页
		window.location.href = "js://uct?method=closeWebview";
	})
    return Promise.reject(err);
});

// 添加响应拦截器
axios.interceptors.response.use((res) =>{
	Indicator.close();
	
	//用户登录超时，token时效，等返回重新登录
	if(res.data.code!=undefined){
		MessageBox.alert(res.data.message).then(action => {
			//返回主页
    		window.location.href = "js://uct?method=closeWebview";
		})
	};
	return res;
}, (err) => {
	
	Indicator.close();
	Toast({message:'服务器繁忙...',position: 'middle',duration: 2000});
    return Promise.reject(err);
});




Vue.prototype.post=function(url, params,showLoading) {
	if(showLoading||showLoading==undefined){
		Indicator.open();
	}
	if(!navigator.onLine){
		Toast({message:'网络不给力，请检查网络',position: 'bottom',duration: 2000});
		Indicator.close();
	}
	return axios.post(url+store.state.urlParams, params)
};

Vue.prototype.get=function(url, params,showLoading) {
	if(showLoading||showLoading==undefined){
		Indicator.open();
	}
	if(!navigator.onLine){
		Toast({message:'网络不给力，请检查网络',position: 'bottom',duration: 2000});
		Indicator.close();
	}
	return axios.get(url+store.state.urlParams, {
		//withCredentials: true,
    	params:params
    })
};

export default axios;