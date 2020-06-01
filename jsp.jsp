<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<title>wipStationByHour</title>
<%@include file="/module/common/module_show_head.jsp"%>
<%@include file="../../common_storage.jsp"%>
<link href="wipStationByHourShow.css" rel="stylesheet">
<script src="wipStationByHourShow.js"></script>
<script>
{
    // 模塊id
    var id;
    // 樣式
    var curStyle = {};
    // 查詢參數
    var dataInfo;
    // 模塊信息
    var module;
    // 點擊事件回調函數
    var _callback;
    var filename ="";
}
{
    // 公開方法
    // 設置title
    function setTitle(title){
        $('.show_title').html(title);
         filename = title;
    }
    // 設置數據時間
    function setDataTime(time){
        $('#dataDate').html(time);
    }
    // 設置單位
    function setUnit(unit){
        $('#unit').html(unit);
    }
    // 設置點擊回調函數
    function setClickCallBack(callback){
        _callback = callback;
    }
    // 顯示圖表
    function showChart(){
        // 刷新樣式
        refreshStyle(module);
    }
    // 平台調用刷新
    function refresh(data) {
        module = data.retObj;
        id = module.id;
        dataInfo = JSON.parse(module.dataInfo);
        // 過濾
        _filter && _filter(dataInfo);
        // 默認值標識
        var defFlag = module['_init'];
        // 刷新頁面
        refreshPage(dataInfo,defFlag);
    }
    // 平台調用樣式切換
    function refreshStyle(data) {
        curStyle=data['styleMap'];
        if(_callback){
        }
    }
}
{
    // 私有方法
}
$(function() {
	$('#main').css('height',$('.container_list').height()-40);
	$('#table').css('height',$('.container_list').height()-80);
//	refresh({
//		'id':'1',
//		'retObj' : {
//			'dataInfo' : '{}',
//			'styleMap' : '{}'
//		}
//	});
});
//***********************************************************//
$(document).ready(function(){
    doPageLoad();
});

{
	function doPageLoad(){
		$("#exportExcel").click(exportFile);
        var idTmr;  
        function  getExplorer() {  
            var explorer = window.navigator.userAgent ;  
            //ie  
            if (explorer.indexOf("MSIE") >= 0) {  
                return 'ie';  
            }  
            //firefox  
            else if (explorer.indexOf("Firefox") >= 0) {  
                return 'Firefox';  
            }  
            //Chrome  
            else if(explorer.indexOf("Chrome") >= 0){  
                return 'Chrome';  
            }  
            //Opera  
            else if(explorer.indexOf("Opera") >= 0){  
                return 'Opera';  
            }  
            //Safari  
            else if(explorer.indexOf("Safari") >= 0){  
                return 'Safari';  
            }  
        }  
        function exportFile() {  
        	var tableid = "reportTable";
            if(getExplorer()=='ie')  
            {  
                var curTbl = document.getElementById(tableid);  
                var oXL = new ActiveXObject("Excel.Application");  
                var oWB = oXL.Workbooks.Add();  
                var xlsheet = oWB.Worksheets(1);  
                var sel = document.body.createTextRange();  
                sel.moveToElementText(curTbl);  
                sel.select();  
                sel.execCommand("Copy");  
                xlsheet.Paste();  
                oXL.Visible = true;  

                try {  
                    var fname = oXL.Application.GetSaveAsFilename("Excel.xls", "Excel Spreadsheets (*.xls), *.xls");  
                } catch (e) {  
                    print("Nested catch caught " + e);  
                } finally {  
                    oWB.SaveAs(fname);  
                    oWB.Close(savechanges = false);  
                    oXL.Quit();  
                    oXL = null;  
                    idTmr = window.setInterval("Cleanup();", 1);  
                }  

            }  
            else  
            {  
               tableToExcel(tableid,filename) ;
            }  
        }  
        function Cleanup() {  
            window.clearInterval(idTmr);  
            CollectGarbage();  
        }  
        var tableToExcel = (function () {  

            var uri = 'data:application/vnd.ms-excel;base64,',  
                    template = '<html><head><meta charset="UTF-8"></head><body><table>{table}</table></body></html>',  
                    base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))); },  
                    format = function(s, c) {  
                        return s.replace(/{(\w+)}/g,  
                                function(m, p) { return c[p]; }); } ; 
            return function(table, name) {  
                if (!table.nodeType) table = document.getElementById(table) ; 
                var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML};  
                let blob = new Blob([format(template, ctx)]); //解決數據量過大時下載網絡異常問題
                document.getElementById("exportExcel").href = URL.createObjectURL(blob);
//                 document.getElementById("exportExcel").href = uri + base64(format(template, ctx));
                document.getElementById("exportExcel").download = name+".xls";
            };  
        })();  

	};
};
</script>
<style>
    .container_list {
        width: 1800px;
		height: 850px;
		overflow-y:auto;
    }
    #main{
        width: 1800px;
        margin: 0 auto;
       /* overflow-y:auto;*/
    }
    #unit{
        width: 100px;
        height: 30px;
        float: left;
    }
    #dataDate{
        width: 400px;
        height: 30px;
        float: right;
    }
    #table{
        width: 100%;
        overflow-y: auto;
    }
    #table table{
        width:3600px;
        ovarflow-y: auto;
        margin-left:40px;
       
    }
    #table td{
        text-align: center;
        height:30px;
        
    }
    #headTable{
        position: fixed;
        width: 95%!important;
        background: #c5c4c4;
    }
    .class-id{
    	width:30px;
    }
    .class-id-color{
    	width:30px;
    	background: #70bce1;
    }
    .class-station{
    	width:128px;
    }
    .class-station-color{
    	width:128px;
    	background: #70bce1;
    }
    .class-hid{
    	width:30px;
    	background:  rgba(255, 255, 255, 0.25);
    }
    .class-hstation{
    	width:128px;
    	background:  rgba(255, 255, 255, 0.25);
    }
   .class-0{
   		width:100px;
   }
   .class-0-color{
   		width:100px;
   		background: #70bce1;
   }
   .expor_btn{
   		float: right;
   		margin-right:50px;
   }
   
   
</style>
</head>
<body>
<div class="container_list">
<a href="##" id="exportExcel" class="expor_btn">導出Excel</a>
    <div id="title" class="show_title">title</div>
    <div id="main" class="main" style="width:1800px;height:800px;">
        <div>
            <div id="unit"></div>
            <div id="dataDate"></div>
        </div>
        <div id="table">
    	     <table id="headTable" border="1"></table> 
             <table id="hiddenTable" border="1"></table> 
             <table id="reportTable" border="1"></table>
        </div>
    </div>
</div>
</body>
<script type="dot/x-dot-template" id="head-template">
		{{
			for(var i=0,l=3;i<l;i++){
				var tr = it[i];
		}}
 		<tr>
		
		{{
				for(var j=0,m=tr.length;j<m;j++){
					var td = tr[j];	
		}}
			
			<th rowspan="{{=td.rowspan}}" colspan="{{=td.colspan}}" class="{{=td.class}}">{{=td.name}}</th>		
		
		{{	}	}}
	
	    </tr>
		{{	}	}}
</script>
<script type="dot/x-dot-template" id="report-template">
	{{
		for(var i=0,l=it.length;i<l;i++){
			var tr = it[i];	
	}}
	<tr>
	
	{{	for(var j=0,m=tr.length;j<m;j++){	
			var td = tr[j];	
	}}
		<td rowspan="{{=td.rowspan}}" colspan="{{=td.colspan}}"  class="{{=td.class}}">{{=td.name}}</td>
	{{	}	}}
	
	</tr>
	{{	}	}}
</script>
</html>
