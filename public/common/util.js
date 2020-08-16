/**
 * Created by Tony on 2017/2/20.
 * 公共方法，正则
 */

//pako-gzip
import pako from 'pako/dist/pako.min.js';

var  common = {};

/**
 * 设备类型判断
 */
common.system = function(){
	var userAgent = navigator.userAgent.toLowerCase();
	if(userAgent.indexOf('iphone') != -1 && userAgent.indexOf('mac') != -1){
		return 'iphone';
	}else if(userAgent.indexOf('ipad') != -1 && userAgent.indexOf('mac') != -1){
		return 'ipad';
	}else if(userAgent.indexOf('linux') != -1 && userAgent.indexOf('android') != -1){
		return "android";
	}else{
		return "other";
	}
}

/*提取手机号和座机号码*/
common.formatPhone = function(value){
	if(!value)return '';
	var phoneString=value.replace(/[^0-9\-]/ig,"、");
	var phoneList = phoneString.split('、');
	var phoneReturn = [];
	phoneList.forEach((item,index)=>{
		if(item){
			phoneReturn.push(item);
		}
	})
	return phoneReturn.join('、');
};

/**
 *emoji表情正则
 */
common.emojiReg = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig;

/**
 * 年月日
 **/
common.year = (new Date).getFullYear();
common.month = (new Date).getMonth()+1;
common.date = (new Date).getDate();
common.time = (new Date).getTime();
/**
 *时间格式化 
 */
common.formatTime=function(value) {
	if (value == null)return '';
	var val = new Date(value);
	var year = parseInt(val.getFullYear());
	var month = parseInt(val.getMonth()) + 1;
	month = month > 9 ? month : ('0' + month);
	var date = parseInt(val.getDate());
	date = date > 9 ? date : ('0' + date);
	var hours = parseInt(val.getHours());
	hours = hours > 9 ? hours : ('0' + hours);
	var minutes = parseInt(val.getMinutes());
	minutes = minutes > 9 ? minutes : ('0' + minutes);
	var seconds = parseInt(val.getSeconds());
	seconds = seconds > 9 ? seconds : ('0' + seconds);
	var time = year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds;
	return time; 
}

/**
*
*  Base64 encode / decode
*  var base = new common.Base64();
*  var base64 = base.encode(str);
*  var str = base.decode(base64);
*
*/
common.Base64= function(){
 
	// private property
	var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
 
	// public method for encoding
	this.encode = function (input) {
		var output = "";
		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		var i = 0;
		input = _utf8_encode(input);
		while (i < input.length) {
			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);
			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;
			if (isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if (isNaN(chr3)) {
				enc4 = 64;
			}
			output = output +
			_keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
			_keyStr.charAt(enc3) + _keyStr.charAt(enc4);
		}
		return output;
	}
 
	// public method for decoding
	this.decode = function (input) {
		var output = "";
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;
		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
		while (i < input.length) {
			enc1 = _keyStr.indexOf(input.charAt(i++));
			enc2 = _keyStr.indexOf(input.charAt(i++));
			enc3 = _keyStr.indexOf(input.charAt(i++));
			enc4 = _keyStr.indexOf(input.charAt(i++));
			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;
			output = output + String.fromCharCode(chr1);
			if (enc3 != 64) {
				output = output + String.fromCharCode(chr2);
			}
			if (enc4 != 64) {
				output = output + String.fromCharCode(chr3);
			}
		}
		output = _utf8_decode(output);
		return output;
	}
 
	// private method for UTF-8 encoding
	var _utf8_encode = function (string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";
		for (var n = 0; n < string.length; n++) {
			var c = string.charCodeAt(n);
			if (c < 128) {
				utftext += String.fromCharCode(c);
			} else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			} else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}
 
		}
		return utftext;
	}
 
	// private method for UTF-8 decoding
	var _utf8_decode = function (utftext) {
		var string = "";
		var i = 0;
		var c=0, c1=0, c2=0, c3=0;
		while ( i < utftext.length ) {
			c = utftext.charCodeAt(i);
			if (c < 128) {
				string += String.fromCharCode(c);
				i++;
			} else if((c > 191) && (c < 224)) {
				c2 = utftext.charCodeAt(i+1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			} else {
				c2 = utftext.charCodeAt(i+1);
				c3 = utftext.charCodeAt(i+2);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}
		}
		return string;
	}
}


/*
 *	gzip压缩与解压
 * 	var b64Data = zip(ticketData)
 * 	var str = unzip(b64Data);
 * 
 * */
common.pako = function(){
	
	this.unzip = function(b64Data) {
          //console.time('test');
          //Base64解码
          var strData = atob(b64Data);
          //将二进制字符串转换为字符数组
          var charData = strData.split('').map(function(x) {
              return x.charCodeAt(0);
          });
          //将字符数据放入byte数组
          var binData = new Uint8Array(charData);
          //解压
          var data = pako.inflate(binData);
          //根据解压的ByteArray返回ASCII字符串
          //strData     = String.fromCharCode.apply(null, new Uint16Array(data));
          if (!("TextDecoder" in window)) {
              strData = arrayBufferToString(data);
          } else {
              var decoder = new TextDecoder("utf-8");
              //var binData = new Uint8Array(data);
              var buffer = decoder.decode(data).replace(/\+/g, " ");
              strData = decodeURIComponent(buffer).replace(/\\/g, '\\\\');
          }
          //console.timeEnd('test');
          return strData;
  	};
	
	this.zip = function(str){
		 var binaryString = pako.gzip(str, { to: 'string' });
  		return btoa(binaryString);
	}
	
}

export default common;