var tableContent = "";
/**
 * Function calls when the page is loaded 
 * to populate the drop-down for Function Group 
 * and job level and to populate the report
 */
$(document).ready(function() {
	//populateDropdowns();
	populateReport();
	if (sessionStorage.getItem("occupation")) {
		document.getElementById("ocptnSrchTxtId").value = sessionStorage.getItem("occupation"); 
	}
});

/**
 * Function populates the drop-down for Function Group and job level
 * @param null
 */
function populateDropdowns(){
	var option = null;
	var obj = jQuery.parseJSON(sessionStorage.getItem("jsonStr"));
	var functionGrpSelect = document.getElementById("inputFunctionGroup");
	for (var key in obj.functionGroup) {
		//Create a option element dynamically
		option = document.createElement("option");
		option.text = obj.functionGroup[key];
	    option.value = obj.functionGroup[key];
	    option.className = "form-control-general";
	    if(sessionStorage.getItem("fnLSelected")){
	    	if(option.value == sessionStorage.getItem("fnLSelected")){
		    	option.setAttribute("selected", "selected");
		    }
	    }
	    try {
	    	functionGrpSelect.add(option, null); //Standard 
	    }catch(error) {
	    	//functionGrpSelect.add(option); // IE only
	    }
	}
	
	var jobLevelSelect = document.getElementById("inputJobLevel");
	for (var keys in obj.jobLevel) {
		//Create a option element dynamically
		option = document.createElement("option");
		option.text = obj.jobLevel[keys];
	    option.value = obj.jobLevel[keys];
	    option.className = "form-control-general";
	    if(sessionStorage.getItem("jLSelected")){
	    	if(option.value == sessionStorage.getItem("jLSelected")){
		    	option.setAttribute("selected", "selected");
		    }
	    }
	    
	    try {
	    	jobLevelSelect.add(option, null); //Standard 
	    }catch(error) {
	    	//jobLevelSelect.add(option); // IE only
	    }
	}
	sessionStorage.setItem('bsrptdropdownpopulated','Y');
}

/**
 * Function populates the report 
 * for all job level and function group
 * @param null
 */
function populateReport(){
	var obj = jQuery.parseJSON(sessionStorage.getItem("jsonStr"));
	tableContent = "";
	var tableDiv = document.getElementById("beforeSketchRptDiv");
	var hdrDiv = document.getElementById('beforeSketchRptHdrDiv');
	var gXLDiv = document.getElementById('genearteXLDiv');	
	var headerDispTable = obj.tableHeaderString.split("&&&");
	var headingString = "<table width='100%' class='etable'><thead class='tab_header'><tr><th width='18%'>"+headerDispTable[0]+"</th><th width='18%'>"+headerDispTable[1]+"</th><th width='6%'>"+headerDispTable[13]+"</th><th width='30%'>"+headerDispTable[3]+"</th><th width='10%'>"+headerDispTable[4]+"</th><th width='8%'>"+headerDispTable[5]+"</th></tr></thead><tbody>";
	var dispTable = obj.reportList.split("$^$");
	var indFirst = parseInt(sessionStorage.getItem("firstResult")) + 1;
	var indSecond = 0;
	if(sessionStorage.getItem("firstResult") == 0){
		indSecond = 20;
	} else {
		var total = obj.totalCount;
		indSecond = parseInt(sessionStorage.getItem("firstResult")) + 20;
		if(indSecond >= total){
			//calculate how much more
			indSecond = parseInt(sessionStorage.getItem("firstResult")) + parseInt(dispTable.length-1);
		} 
	}
	if(indSecond > parseInt(obj.totalCount)){
		indSecond = obj.totalCount;
	}
	if(dispTable.length-1 > 0){
		hdrDiv.innerHTML = "<table width='100%'><tr><td><b>"+headerDispTable[6]+" </b>"+indFirst+" <b> "+headerDispTable[7]+" </b>"+indSecond+" <b>"+headerDispTable[8]+" </b>"+obj.totalCount+"</td></tr></table>";
		gXLDiv.innerHTML = "<table width='100%'><tr><td align='right'><b>"+headerDispTable[9]+" </b><a id='generateXL' href='#' onclick='generateReport()'><img src='../img/Excel-icon.png' /></td></tr></table>";
	}
	
	// Body content
	for(var index=0; index<obj.bsList.length; index++) {
		var headerId = index;
		if(headerId % 2 == 0) {
			var content = "<tr id = '"+headerId+"' bgcolor='#D2EAF0'>";
			textareaBgColor = "#D2EAF0";
		} else {
			var content = "<tr id = '"+headerId+"' bgcolor='#F1F1F1'>";
			textareaBgColor = "#F1F1F1";
		}
		var individualObject = obj.bsList[index];
		var totalTask = 0;
		for (var innerIndex = 0; innerIndex<individualObject.list.length; innerIndex++) {
			totalTask = totalTask + 1;
		}
		if (totalTask > 2) {
			content = content + "<td align='center'>"+individualObject.emailId+"</td>";
			//content = content + "<td align='center'>"+individualObject.functionGroup+"</td>";
			//content = content + "<td align='center'>"+individualObject.jobLevel+"</td>";
			content = content + "<td><textarea rows='2' cols='38' readonly style='background-color: "+textareaBgColor+"; border: none; text-align:center;'>"+individualObject.functionGroup+"</textarea></td>";
			
			/*var totalTask = 0;
			for (var innerIndex = 0; innerIndex<individualObject.list.length; innerIndex++) {
				totalTask = totalTask + 1;
			}*/
			content = content + "<td align='center'>"+totalTask+"</td>";
			
			var innerTable = "<table>";
			for (var innerIndex = 0; innerIndex<individualObject.list.length; innerIndex++) {
				var innerObject = individualObject.list[innerIndex]; 
				//var allocation = innerObject.allocation;
				var taskDescription = innerObject.taskDescription;
				innerTable = innerTable + "<tr><td><textarea rows='2' cols='68' readonly style='background-color: "+textareaBgColor+"; border: none; text-align:center;'>"+taskDescription+"</textarea></td></tr>";
			}
			innerTable = innerTable + "</table>";
			content = content + "<td align='center'>"+innerTable+"</td>";
			
			var innerTable = "<table>";
			for (var innerIndex = 0; innerIndex<individualObject.list.length; innerIndex++) {
				var innerObject = individualObject.list[innerIndex]; 
				//var taskDescription = innerObject.taskDescription;
				var allocation = innerObject.allocation;
				innerTable = innerTable + "<tr><td><textarea rows='2' cols='34' readonly style='background-color: "+textareaBgColor+"; border: none;text-align:center;'>"+allocation+"</textarea></td></tr>";
			}
			innerTable = innerTable + "</table>";
			content = content + "<td align='center'>"+innerTable+"</td>";
			
			content = content + "<td align='center'>"+secondsToTime(individualObject.totalTime)+"</td>";
			
			content = content + "</tr>";
			tableContent = tableContent + content;
		}
		
	}
	if(dispTable.length-1 > 0){
		document.getElementById("beforeSketchResultDiv").style.display = "block";
		var mainContent = headingString + tableContent+"</tbody></table>";
		//Both disabled
		if((obj.previousDisabled == 1) && (obj.nextDisabled == 1)) {
			mainContent = mainContent + "<br /> <div align='center'> <span><< &nbsp; "+headerDispTable[10]+"</span> &nbsp;&nbsp;&nbsp;&nbsp; <span>"+headerDispTable[11]+" &nbsp; >></span>";
		} else if((obj.previousDisabled == 1) && (obj.nextDisabled == 0)) {
			mainContent = mainContent + "<br /> <div align='center'> <span><< &nbsp; "+headerDispTable[10]+"</span> &nbsp;&nbsp;&nbsp;&nbsp; <a href='#' onClick='next()'>"+headerDispTable[11]+" &nbsp; >></a>";
		} else if((obj.previousDisabled == 0) && (obj.nextDisabled == 1)) {
			mainContent = mainContent + "<br /> <div align='center'> <a href='#' onClick='previous()'><< &nbsp; "+headerDispTable[10]+"</a> &nbsp;&nbsp;&nbsp;&nbsp; <span>"+headerDispTable[11]+" &nbsp; >></span>";
		} else {
			mainContent = mainContent + "<br /> <div align='center'> <a href='#' onClick='previous()'><< &nbsp; "+headerDispTable[10]+"</a> &nbsp;&nbsp;&nbsp;&nbsp; <a href='#' onClick='next()'>"+headerDispTable[11]+" &nbsp; >></a>";
		}
		
	} else {
		mainContent = "<div align='center'> <br /><br /><br /><img src='../img/no-record.png'><br /><div class='textStyleNoExist'>"+headerDispTable[12]+"</div></div>";
		document.getElementById("beforeSketchResultDiv").style.display = "none";
	}	
	tableDiv.innerHTML = mainContent;
}

/**
 * Function populates the report 
 * for the selected job level and function group
 * @param dist
 */
function populateBeforeSketchSelectedReport(dist){
	if(dist == 'newid'){
		if(sessionStorage.getItem("firstResult")){
			sessionStorage.setItem("firstResult", 0);
		}
	}
	var occupationVal = "";
	if (document.getElementById("ocptnSrchTxtId")) {
		if (document.getElementById("ocptnSrchTxtId").value.trim().length != 0) {
			occupationVal = document.getElementById("ocptnSrchTxtId").value;
		} 
	}
	
	var bsModel = Spine.Model.sub();
	bsModel.configure("/admin/reports/populateBeforeSketchSelectedReport", "occupationVal", "recordIndex");
	bsModel.extend( Spine.Model.Ajax );
	
	//Populate the model
	var populateModel = new bsModel({  
		occupationVal: occupationVal,
		recordIndex: sessionStorage.getItem("firstResult")
	});
	populateModel.save(); //POST
	
	bsModel.bind("ajaxError", function(record, xhr, settings, error) {
		alertify.alert("Unable to contact the server.");
		$(".loader_bg").fadeOut();
	    $(".loader").hide();
	});
	
	bsModel.bind("ajaxSuccess", function(record, xhr, settings, error) {
		var jsonStr = JSON.stringify(xhr);
		var obj = jQuery.parseJSON(jsonStr);
		if(obj.statusCode == 200){
			sessionStorage.setItem("occupation",occupationVal);
			sessionStorage.setItem("jsonStr",jsonStr); //contains whole population string
			window.location = "reportsBeforeSketch.jsp";
		}
	});
}

/**
 * Function call while clicking on next button 
 * @param null
 */
function next(){
	if(sessionStorage.getItem("firstResult")){
		var count = parseInt(sessionStorage.getItem("firstResult")) + 20;
		sessionStorage.setItem("firstResult",count);
		populateBeforeSketchSelectedReport('existing');
	}
}

/**
 * Function call while clicking on previous button
 * @param null
 */
function previous(){
	if(sessionStorage.getItem("firstResult")){
		var count = parseInt(sessionStorage.getItem("firstResult")) - 20;
		sessionStorage.setItem("firstResult",count);
		populateBeforeSketchSelectedReport('existing');
	}
}

/**
 * Function call to generate the excel report
 * @param null
 */
function generateReport(){
	var link = document.getElementById('generateXL');
	var reportLink = "../../admin/reports/generateExcel/";
	/*var functionGrp = document.getElementById("inputFunctionGroup").options[document.getElementById("inputFunctionGroup").selectedIndex].value;
	var jobLevel = document.getElementById("inputJobLevel").options[document.getElementById("inputJobLevel").selectedIndex].value;
	if(functionGrp == ""){
		functionGrp = "JCTDUMMYVARJCTFN";
	}
	if(jobLevel == ""){
		jobLevel = "JCTDUMMYVARJCTJL";
	}*/
	
	var occupation = "";
	if (sessionStorage.getItem("occupation")) {
		occupation = sessionStorage.getItem("occupation");
	} else {
		sessionStorage.setItem("occupation", "NA");
		occupation = "NA";
	}
	reportLink = reportLink + occupation + "/before_sketch_report.xls";	
	link.setAttribute("href", reportLink);
}

/**
 * Function to calculate the total time
 * @param secs
 */
function secondsToTime(secs) {
    var hours = Math.floor(secs / (60 * 60));
    if (hours < 10) {
    	hours = "0"+hours;
    }
    var divisor_for_minutes = secs % (60 * 60);
    var minutes = Math.floor(divisor_for_minutes / 60);
    if (minutes < 10) {
    	minutes = "0"+minutes;
    }
    var divisor_for_seconds = divisor_for_minutes % 60;
    var seconds = Math.ceil(divisor_for_seconds);
    if (seconds < 10) {
    	seconds = "0"+seconds;
    }
    return "<b>"+hours+" : "+minutes+ " : "+seconds+"</b>";
}



function searchOccupationSearch() {
	var occupationSearchVal = document.getElementById("ocptnSrchTxtId").value.trim();
	if (occupationSearchVal.trim().length == 0) {		
		alertify.alert("<p>Please provide occupation search String");
		$("#searchOccupation").click(function() {$.fancybox.close({});});
		return false;
	} else {
		document.getElementById("occupationPlottingDiv").innerHTML = "<br /><br /><img src='../img/Processing.gif' />";			
		$("#searchOccupation").click(function() {
			$.fancybox.open({
				href : '#occupationDiv',
				closeClick : false,
				openEffect : 'elastic',
				openSpeed  : 150,
				closeEffect: 'elastic',
				closeSpeed : 150,
				padding    : 5,
				closeClick : true,
				modal      : true,
				showCloseButton : true,
				afterShow : function() {
					$('.fancybox-skin').append('<a title="Close" class="fancybox-item fancybox-close" href="javascript:jQuery.fancybox.close();"></a>');
				}
			});
		});
	}
	
	// Search the o* net list
	var stub = Spine.Model.sub();
	stub.configure("/admin/authAdmin/searchOccupationList", "searchString");
	stub.extend( Spine.Model.Ajax );
		
	//Populate the model with data to transfer
	var modelPopulation = new stub({ 
		searchString: occupationSearchVal
	});
	modelPopulation.save(); //POST the data
	
	stub.bind("ajaxError", function(record, xhr, settings, error) {
		$(".loader_bg").fadeOut();
	    $(".loader").hide();
		alertify.alert("Unable to connect to the server.");
	});
	
	stub.bind("ajaxSuccess", function(record, xhr, settings, error) {
		var jsonStr = JSON.stringify(xhr);
		var obj = jQuery.parseJSON(jsonStr);
		var statusCode = obj.statusCode;
		if (statusCode == "200") {
			plotData(obj.dtoList);
		} else {
			document.getElementById("occupationPlottingDiv").innerHTML = "";
			var plottingDiv = document.getElementById("dataPlottingDiv");
			plottingDiv.innerHTML = "<div align='center'><br /><br /><img src='../img/not-found.png'><br /><p><b>"+occupationSearchVal+"</b> "+obj.statusMsg+"</p></div>";
		}
	});	
}

function plotData(dtoList) {
	document.getElementById("occupationPlottingDiv").innerHTML = "";
	var plottingDiv = document.getElementById("dataPlottingDiv");
	plottingDiv.innerHTML = "";
	var str = "<table width='65%' class='custom_table_onet'><thead><tr class='tab_header'></tr></thead><tbody>";
	
	for (var index = 0; index < dtoList.length; index++) {
		var trColor = "";
		 var titleId = "title_" + index;
		 var descId = "desc_" + index;
		str = str + "<tr id='"+titleId+"' bgcolor="+trColor+"><td class='custom_td_onet' ><input type='radio' class='custom_radio_onet' name='occupation' value='"+dtoList[index].code+"' onclick='showDescription(\""+descId+"\", \""+dtoList.length+"\")'>"+dtoList[index].title+"</td></tr><tr id= '"+descId+"' style='display:none;'><td class='onet_desc_custom_cls' >"+dtoList[index].desc+"</td></tr>";
	}
	str = str + "</tbody></table>";
	plottingDiv.innerHTML = str;
	document.getElementById("goDiv").style.display = "block";
}


function validateOnetData(){
    var textInput = document.getElementById("ocptnSrchTxtId").value;
    //textInput = textInput.replace(/[^A-Za-z]/g, "");
    textInput = textInput.replace(/%/g, "");
    document.getElementById("ocptnSrchTxtId").value = textInput;
}

function showDescription(descId, length) {
	for (var index = 0; index < length; index++) {
		var allDsecId = "desc_" + index;
		document.getElementById(allDsecId).style.display = "none";
	}
	document.getElementById(descId).style.display = "block";
	
}

function closeDiv() {
	if (undefined != $("input[name=occupation]:checked").val()) {
		document.getElementById("ocptnSrchTxtId").value = $("input[name=occupation]:checked").val();
		sessionStorage.setItem("occupation", document.getElementById("ocptnSrchTxtId").value);
		//populateBeforeSketchSelectedReport('newid');
		jQuery.fancybox.close();
	} else {
		alertify.alert("<p>Please select an occupation from the list</p>");
		return false;
	}
}