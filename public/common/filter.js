/**
 * Created by Tony on 2017/2/20.
 */
//import Vue from 'vue'; // get vue
const Vue = $vue.default;

Vue.filter('uppercase', function (value, gg) {
  if (!value) { return '' }
  value = value.toString()
  if (gg === 'first') {
    return value.charAt(0).toUpperCase() + value.slice(1)
  } else {
    return value.toUpperCase()
  }
})

Vue.filter('formatTime', function (value, gg) {
  	if (value === null||value === ''||value==undefined)return '';
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
})

Vue.filter('formatDate', function (value, gg) {
	var today = new Date().toLocaleDateString();
	
  	if (value === null||value === ''|| typeof value!='number')return value;
	var val = new Date(value);
	var thisDay = val.toLocaleDateString();
	
	var isToday = false;
	if(thisDay==today){
		isToday = true;
	}
	
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
	if(gg=='yyyy')return year
	if(gg=='mm')return month
	if(gg=='dd')return date
	if(gg=='yyyy-mm')return year +'-'+ month;
	if(gg=='yyyy-mm-dd')return year +'-'+ month +'-'+ date;
	if(gg=='mm-dd')return month +'-'+ date;
	if(gg=='yyyy-mm-dd hh:mm:ss' || gg==undefined)return year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds;
	if(gg=='hh:mm:ss')return hours + ':' + minutes + ':' + seconds;
	if(gg=='day')return isToday?"今天":"周"+"日一二三四五六".charAt(val.getDay())
})

Vue.filter('telPhone', function (value, gg) {
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
})