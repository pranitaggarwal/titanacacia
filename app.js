$(document).ready(function(){
	var data;

	$(".burger").click(function(){
		$('#nav-links').toggleClass("show-nav");
	});
	$("#dropbtn1").click(function(){
		$("#dropdown1").toggleClass("show1");
		$("#dropdown2").removeClass("show2");
		$("#dropdown3").removeClass("show3");
	});
	$("#dropbtn2").click(function(){
		$("#dropdown1").removeClass("show1");
		$("#dropdown2").toggleClass("show2");
		$("#dropdown3").removeClass("show3");
	});
	$("#dropbtn3").click(function(){
		$("#dropdown1").removeClass("show1");
		$("#dropdown2").removeClass("show2");
		$("#dropdown3").toggleClass("show3");
	});

	for(i = 0;i < document.getElementsByClassName("dropdown-content-in").length;i++){
		document.getElementsByClassName("dropdown-content-in")[i].style.top =  i*48 + 'px';	
	}

	$.ajax({
		  	type: "GET",  
		  	url: "data.csv",
		  	dataType: "text",       
		  	success: function(response)  
		  	{
		  		data = $.csv.toArrays(response);
				generateHtmlTable(data);
			}
		});
	$("#container").change(function(){
		$("#csv-display").css("display:none;");
		$.ajax({
		  	type: "GET",  
		  	url: "data.csv",
		  	dataType: "text",       
		  	success: function(response)  
		  	{
		  		var rdata = [];
				data = $.csv.toArrays(response);
				for(i = 1; i < 51;  i++){
					if(data[i][0] == $("#container").find(':selected').data("state")){
						rdata.push(data[0]);
						rdata.push(data[i]);
					}
					else if($("#container").find(":selected").data("state") == "Select"){
						rdata.push(data[i-1]);
					}
				}
				generateHtmlTable(rdata);
		  	}   
		  });
		});
});

var cnt = 0;

function generateHtmlTable(data) {
	cnt++;
    var html = `<table  class="table table-condensed table-hover table-striped" id=${cnt}>`

      if(typeof(data[0]) === 'undefined'){
      	return null;
      }
      else {
		$.each(data, function( index, row ) {
		  //bind header
		  if(index == 0) {
			html += '<thead>';
			html += '<tr class="row">';
			$.each(row, function( index, colData ) {
				html += '<th class="heading">';
				html += colData;
				html += '</th>';
			});
			html += '</tr>';
			html += '</thead>';
			html += '<tbody>';
		  } else {
			html += '<tr class="row">';
			$.each(row, function( index, colData ) {
				html += '<td class="data">';
				if(index == 4){
					html += '<a href="';
					html += colData;
					html += '"><button class="tlink">'+'Register Here'+'</button></a>';
				}
				else if(index == 5){
					html += '<a href="';
					html += colData;
					html += '"><button class="tlink">'+'Vote Here'+'</button></a>';
				}
				else{
					html += colData;
				}
				html += '</td>';
			});
			html += '</tr>';
		  }
		});
		html += '</tbody>';
		html += '</table>';
		$(`#${cnt-1}`).remove();
		$('#csv-display').append(html);
	  }
	}	