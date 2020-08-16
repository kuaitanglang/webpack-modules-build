/**
 * Created by Tony on 2018/7/5.
 * 优速通原生交互
 */
window.Hybrid={};

var YST = {};
/**
 * 获取用户信息
 */
YST.userInfo = function(callback){
	window.Hybrid.userInfo=function (data) {
		let Data = JSON.parse(data);
		callback&&callback(Data);
	}
	window.location.href = "js://uct?method=Hybrid.userInfo";
}

/**
 * 修改状态栏
 * @param:bgColor 背景色
 * @param:fontStyle 字体颜色，0黑色，1白色
 */
YST.setStatusBarColor = function(bgColor,fontStyle){
	window.location.href = "js://uct?method=setStatusBarColor&color="+bgColor+"&statusBarMode="+fontStyle;
}

/**
 * 关闭webview
 */
YST.closeWebview = function(){
	window.location.href = "js://uct?method=closeWebview";
}

/**
 * 选择照片
 * @length：选取照片的个数，大于等于1
 * @successCallback：选择照片确认的成功回调
 * @cancelCallback ：取消选择照片的取消回调
 */
YST.getPhotos = function(length,successCallback,cancelCallback){
	window.Hybrid.getPhotos = function(data){
		let DATA = JSON.parse(data);
		successCallback && successCallback(DATA); 
	}
	window.Hybrid.cancelPhotos = function(){
		cancelCallback && cancelCallback(); 
	}
	window.location.href = "js://uct?method=Hybrid.getPhotos&length="+length;
}
/**
 * 根据索引(从0开始)删除照片
 * @param：index;
 */
YST.delPhoto = function(index){
	window.location.href = "js://uct?method=Hybrid.delPhoto&index="+index;
}
/**
 * 清除已选择的照片
 */
YST.cleanPhotos = function(){
	window.location.href = "js://uct?method=Hybrid.cleanPhotos";
}

/**
 * 条码及二维码扫描
 */
YST.QRScan = function(successCallback){
	window.QRcodeSuccess=function (data) {
    	successCallback && successCallback(data); 
 	};
 	window.location.href ="js://uct?method=scan";
}

export default YST;
