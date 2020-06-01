// 全局變量
{
	var statTime = '';
	var endTime = '';
}
// 刷新頁面
function refreshPage(dataInfo,defFlag) {
	var params = {
				'params.wipStation2h' : storage.get('wipStation2h', defFlag, dataInfo),
			 	'params.processDate':storage.get('wipStartDate',defFlag,dataInfo),
		        'params.wipStartHour':storage.get('wipStartDate',defFlag,dataInfo)+' '+storage.get('wipStartHour',defFlag,dataInfo),
		        'params.checkDate':storage.get('wipEndDate',defFlag,dataInfo),
		        'params.wipEndHour':storage.get('wipEndDate',defFlag,dataInfo)+' '+storage.get('wipEndHour',defFlag,dataInfo)
	};
	statTime = params['params.wipStartHour'];
	endTime = params['params.wipEndHour'];
	$.post(ctx + '/keyFactor/keyFactor_getWipStationByHour.action', params,function(result) {
        if (result.statusCode == '0000') {
			var data = result.retObj;
			// 標題
			//var work_class=data.result[0].WORK_CLASS+'班';
			//var date = data.result[0].DATA_DATE;
			 setTitle('902 組裝製程工站每2H流存量');
            // 數據時間
            setDataTime('數據時間：'+statTime+':00:00'+' ~ '+endTime+':00:00');
			// 單位
//			setUnit('Unit:(自定義)');
			// 數據封裝
			setData(data);
		}
	});
}
// 數據封裝
function setData(list){
	//***start***
	var hourList=[],dataList=[],dateList=[],stationList=[];
	var newList = [];
	hourList = list.hourList;
	dataList = list.result;
	for(var i= 0;i<dataList.length;i++){
		var time = dataList[i].DATA_DATE;
		var stationCount = dataList[i].STATION;
		var label = 0;
		var stationLabel = 0;
		if(i==0){
			dateList.push(time);
			stationList.push(stationCount);
		}else{			
			for(var j =0;j<dateList.length;j++){
				if(time==dateList[j]){
					label = 1;
				}
			}
			if(label == 0){
				dateList.push(time);
			}
			
			for(var j =0;j<stationList.length;j++){
				if(stationCount==stationList[j]){
					stationLabel = 1;
				}
			}
			if(stationLabel == 0){
				stationList.push(stationCount);
			}
		}
	}
	var k = dateList.length;
	var stationLen = stationList.length;
	// 封裝表頭數據
	var head = [],tr = [];
	tr.push({'name':'序號','rowspan':3,'colspan':1,'class':'class-hid'});
	tr.push({'name':'日期','rowspan':3,'colspan':1,'class':'class-hstation'});
	tr.push({'name':'工站','rowspan':3,'colspan':1,'class':'class-hstation'});
	

	tr.push({'name':'全天','rowspan':2,'colspan':3,'class':'class_head'});
	tr.push({'name':'白天','rowspan':2,'colspan':3,'class':'class_head'});
	tr.push({'name':'夜班','rowspan':2,'colspan':3,'class':'class_head'});
	
	
	tr.push({'name':'工站情況','rowspan':1,'colspan':36,'class':'class_head'});
	newList.push(tr);
	tr = [];
	
	for(var i=0;i<hourList.length;i++){
		tr.push({'name':hourList[i].HOUR_INTERVAL,'rowspan':1,'colspan':3,'class':'class_head'});
	}
	newList.push(tr);
	tr = [];
	tr.push({'name':'投入/重工','rowspan':1,'colspan':1,'class':'class_head'});	
	tr.push({'name':'良品/不良品','rowspan':1,'colspan':1,'class':'class_head'});
	tr.push({'name':'良率','rowspan':1,'colspan':1,'class':'class_head'});
	
	tr.push({'name':'投入/重工','rowspan':1,'colspan':1,'class':'class_head'});	
	tr.push({'name':'良品/不良品','rowspan':1,'colspan':1,'class':'class_head'});
	tr.push({'name':'良率','rowspan':1,'colspan':1,'class':'class_head'});
	
	tr.push({'name':'投入/重工','rowspan':1,'colspan':1,'class':'class_head'});	
	tr.push({'name':'良品/不良品','rowspan':1,'colspan':1,'class':'class_head'});
	tr.push({'name':'良率','rowspan':1,'colspan':1,'class':'class_head'});
	
	
	
	for(var i=0;i<hourList.length;i++){
		tr.push({'name':'投入/重工','rowspan':1,'colspan':1,'class':'class_head'});
		tr.push({'name':'良品/不良品','rowspan':1,'colspan':1,'class':'class_head'});
		tr.push({'name':'良率','rowspan':1,'colspan':1,'class':'class_head'});
	}
	newList.push(tr);
	// 假數據 end
	// 模板函數
//	newList.push(head);
//	var headFunc = doT.template($('#head-template').html());
	var reportFunc = doT.template($('#report-template').html());
	var listNumb = [];
	for(var i=1;i<=k;i++){
		listNumb.push(stationLen*i);
	}
	var numb = 0;
			for(var j=0;j<stationLen*k;j++){
				
				var dtList = [];
				for(var m =0;m<listNumb.length;m++){
					if(j==listNumb[m]){
						numb = 0;
					}
				}
				numb = numb +1;
				if(numb == 1 && j != 0){
					dtList.push({'name':numb,'class':'class-id-color'});
					dtList.push({'name':dataList[j*12].DATA_DATE,'class':'class-station-color'});
					dtList.push({'name':dataList[j*12].STATION,'class':'class-station-color'});
					
					dtList.push({'name':dataList[j*12].IN_COUNT_ALL+'/'+dataList[j*12].REDO_COUNT_ALL,'class':'class-station-color'});
					
					dtList.push({'name':dataList[j*12].PASS_COUNT_ALL+'/'+dataList[j*12].FAIL_COUNT_ALL,'class':'class-station-color'});
				
					dtList.push({'name':dataList[j*12].PASS_RATE_ALL.toFixed(2)+'%','class':'class-station-color'});
					
					
					dtList.push({'name':dataList[j*12].IN_COUNT_A+'/'+dataList[j*12].REDO_COUNT_A,'class':'class-station-color'});
				
					dtList.push({'name':dataList[j*12].PASS_COUNT_A+'/'+dataList[j*12].FAIL_COUNT_A,'class':'class-station-color'});
				
					dtList.push({'name':dataList[j*12].PASS_RATE_A.toFixed(2)+'%','class':'class-station-color'});
					
					
					dtList.push({'name':dataList[j*12].IN_COUNT_B+'/'+dataList[j*12].REDO_COUNT_B,'class':'class-station-color'});
					
					dtList.push({'name':dataList[j*12].PASS_COUNT_B+'/'+dataList[j*12].FAIL_COUNT_B,'class':'class-station-color'});
					
					dtList.push({'name':dataList[j*12].PASS_RATE_B.toFixed(2)+'%','class':'class-station-color'});
					
					
					
					
					
					var i=j*12,len=(j+1)*12;
					for(;i<len;i++){
						dtList.push({'name':dataList[i].IN_COUNT+'/'+dataList[i].REDO_COUNT,'class':'class-0-color'});
						if (dataList[i].STATION.indexOf('Rcam')>-1|| dataList[i].STATION == 'ALT-BG to Band'|| dataList[i].STATION == 'UMP-T3') {
							dtList.push({'name':dataList[i].PASS_COUNT+'/'+dataList[i].FAIL_COUNT,'class':'class-0-color'});
							dtList.push({'name':dataList[i].PASS_RATE.toFixed(2)+'%','class':'class-0-color'});
						}else{
							dtList.push({'name':'/','class':'class-0-color'});
							dtList.push({'name':'/','class':'class-0-color'});
						}
					}	
					
				}else{
					dtList.push({'name':numb,'class':'class-id'});
					dtList.push({'name':dataList[j*12].DATA_DATE,'class':'class-station'});
					dtList.push({'name':dataList[j*12].STATION,'class':'class-station'});
					
					dtList.push({'name':dataList[j*12].IN_COUNT_ALL+'/'+dataList[j*12].REDO_COUNT_ALL,'class':'class-station'});
					
					dtList.push({'name':dataList[j*12].PASS_COUNT_ALL+'/'+dataList[j*12].FAIL_COUNT_ALL,'class':'class-station'});
				
					dtList.push({'name':dataList[j*12].PASS_RATE_ALL.toFixed(2)+'%','class':'class-station'});
					
					
					dtList.push({'name':dataList[j*12].IN_COUNT_A+'/'+dataList[j*12].REDO_COUNT_A,'class':'class-station'});
				
					dtList.push({'name':dataList[j*12].PASS_COUNT_A+'/'+dataList[j*12].FAIL_COUNT_A,'class':'class-station'});
				
					dtList.push({'name':dataList[j*12].PASS_RATE_A.toFixed(2)+'%','class':'class-station'});
					
					
					dtList.push({'name':dataList[j*12].IN_COUNT_B+'/'+dataList[j*12].REDO_COUNT_B,'class':'class-station'});
					
					dtList.push({'name':dataList[j*12].PASS_COUNT_B+'/'+dataList[j*12].FAIL_COUNT_B,'class':'class-station'});
					
					dtList.push({'name':dataList[j*12].PASS_RATE_B.toFixed(2)+'%','class':'class-station'});
					
					var i=j*12,len=(j+1)*12;
					for(;i<len;i++){
						dtList.push({'name':dataList[i].IN_COUNT+'/'+dataList[i].REDO_COUNT,'class':'class-0'});
						if (dataList[i].STATION.indexOf('Rcam')>-1|| dataList[i].STATION == 'ALT-BG to Band'|| dataList[i].STATION == 'UMP-T3') {
							dtList.push({'name':dataList[i].PASS_COUNT+'/'+dataList[i].FAIL_COUNT,'class':'class-0'});
							dtList.push({'name':dataList[i].PASS_RATE.toFixed(2)+'%','class':'class-0'});
						}else{
							dtList.push({'name':'/','class':'class-0'});
							dtList.push({'name':'/','class':'class-0'});
						}
					}	
				}
				
				newList.push(dtList);				
		}

	
	
	
    // 添加報表數據
    $('#reportTable').html(reportFunc(newList));
    // 添加表頭
//    $('#headTable').html(headFunc(head));
    $('#headTable').css({width:$('#reportTable').outerWidth()});
//    $('#hiddenTable').css({height:'93px'});
//    $('#hiddenTable').css({height:$('#headTable').height()});
   //***end***
}
