import { MessageBox, Toast, Indicator} from 'mint-ui';

var uceAMap = {};


var mapObject = null;//地图实例对象
/*销毁地图*/
uceAMap.distoryMap = function(){
	mapObject&&mapObject.distory();
}

//添加网点位置
function addOrgLocation(map, data) {
    addRangeName(map, [data.lng, data.lat], data.orgName, data.orgCode);
};
 
//显示信息
function showMsg(id, msg) {
    document.getElementById(id).innerHTML = msg;
    document.getElementById(id).style.display = 'block';
};
 
//添加网点范围
function addOrgRange(map, orgRanges, orgCode) {
    if(orgRanges != null && orgRanges instanceof Array && orgRanges.length > 0) {
        orgRanges.forEach(function(range) {
            //遍历绘制多边形
            if(range) {
                drawOrgRange(map, range);
            }
        });
    }
};
 
//绘制网点范围
function drawOrgRange(map, points, rangeColor, orgCode) {
    var polygonArr = new Array(); //多边形覆盖物节点坐标数组
    var pointArr = points.split(';');
    pointArr.forEach(function(pointStr) {
        if(pointStr) {
            polygonArr.push(pointStr.split(','));
        }
    });
    rangeColor = '#00FF00';
    var polygon = new AMap.Polygon({
        path: polygonArr, //设置多边形边界路径
        strokeColor: '#32CD32', //线颜色
        strokeOpacity: 1, //线透明度
        strokeWeight: 2, //线宽
        fillColor: rangeColor, //填充色
        fillOpacity: 0.3, //填充透明度
        bubble: true //是否将覆盖物的鼠标或touch等事件冒泡到地图上
    });
    polygon.orgCode = orgCode;
    //双击网点范围缩放到对应位置
    polygon.on('dblclick', function(event) {
        map.setFitView(event.target);
    });
    polygon.setMap(map);
};
 
//显示网点名称
function addRangeName(map, point, orgName, orgCode) {
	// 创建标记
    var marker = new AMap.Marker({
        position: point,
        offset: new AMap.Pixel(-18, -30),
        map: map,
        bubble: true, //是否将覆盖物的鼠标或touch等事件冒泡到地图上
        icon: 'https://download.uce.cn/update/gis/prod/marker/marker_2.png'
    });
    // 添加说明
    marker.setLabel({ //样式className为：amap-marker-label
        offset: new AMap.Pixel(30, 5), //修改label相对于maker的位置
        content: orgName + "(点击导航)"
    })
    //绑定事件
    marker.on('click', function(e){
    	//跳转原生导航
    	window.location.href = "js://uct?method=getNavigationToDotAction&longitude="+point[0]+"&Latitude="+point[1]+"&targetName="+orgName;
    });
};

/**
 * 初始化网点服务范围
 * @param {Object}
 * containerId：地图容器id，必填，
 * data：数据，必填，数据结构为：{orgCode(网点编码):xx,orgName(网点名称):xx,lat(网点作为纬度):xx,lng(网点所在经度):xx,orgRanges(电子围栏坐标):["lng,lat;lng,lat;","lng,lat;lng,lat"]}，
 * showWarnMsg：是否显示补充信息（如网点地址不详等，默认为true），
 * showToolbar（是否显示缩放工具栏，默认为true）
 */
uceAMap.showOrgMap = function(params) {
    var mapName = params.containerId + "_map";
    var mapContainerId = mapName + "_div";
    var msgContainerId = mapName + "_msg_div";
    var container = document.getElementById(params.containerId);
    //添加地图容器
    var mapDiv = document.getElementById(mapContainerId);
    if(!mapDiv) {
        mapDiv = document.createElement("div");
        mapDiv.setAttribute("id", mapContainerId);
        mapDiv.setAttribute("style", "width:100%;height:100%");
        container.appendChild(mapDiv);
    }
    container.style.position="relative";
    //添加信息窗体
    var msgDiv = document.getElementById(msgContainerId);
    if(msgDiv==null) {
        msgDiv = document.createElement("div");
        msgDiv.setAttribute("id", msgContainerId);
        msgDiv.setAttribute("style", "font-size: 13px;padding: .25rem .5rem;margin-bottom: 1rem;border-radius: .25rem;position: absolute;top: 1rem;background-color: white;font-weight: bold;color: red;width: auto;border-width: 0;left: 1rem;box-shadow: 0 2px 6px 0 rgba(114, 124, 245, .5);");
        container.appendChild(msgDiv);
    }
    //重复调用时须要先隐藏信息窗口
    msgDiv.setAttribute("hidden", true);
    //初始化参数
    params.showWarnMsg = params.showWarnMsg != undefined ? params.showWarnMsg : true;
    params.showToolbar = params.showToolbar != undefined ? params.showToolbar : true;
    params.rangeType = params.rangeType ? params.rangeType : 2;
    mapObject = new AMap.Map(mapContainerId, {
        zoom: 12, //默认缩放级别
        center: [params.data.lng, params.data.lat], //地图默认中心点
        zooms: [3, 20], // 缩放界别范围
        scrollWheel: true, //滚动缩放
        expandZoomRange: true,
        showIndoorMap: false,//关闭自动展示室内地图
        resizeEnable: true
    });
    if(params.showToolbar) {
        AMap.plugin('AMap.ToolBar', function() {
            var toolbar = new AMap.ToolBar({
                liteStyle: true,
                position: 'RT',
                offset: new AMap.Pixel(0, 20)
            });
            //添加缩放工具栏
            mapObject.addControl(toolbar)
        });
    }
    //清理地图覆盖物
    mapObject.clearMap();
    //没有设置数据则只初始化地图
    if(!params.data) {
        return;
    }
    //添加网点范围
    if(params.data.orgRanges) {
        addOrgRange(mapObject, params.data.orgRanges, params.data.orgCode);
    }
    //添加网点位置
    if(params.data.lng && params.data.lat) {
        addOrgLocation(mapObject, params.data);
    }
    if(params.showWarnMsg && params.data.info) {
        showMsg(msgContainerId, params.data.info);
    }
    //调整地图显示范围
    mapObject.setFitView();
    
};

export default uceAMap;