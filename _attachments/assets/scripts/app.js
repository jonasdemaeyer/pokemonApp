var ALL_DOCS = '../../_all_docs?include_docs=true';
var BY_DATE = '_view/byDate';

function createDoc(){
	
	var pokemon = $("#pokemonText").val();
	var name = $("#name").val();
	var doc = {};
	
	doc.name = name;
	doc.type = type;
	doc.trainer = trainer;
	doc.gender = gender;
	doc.owned = date;
	doc.type = 'pokemon';
	var json = JSON.stringify(doc);
	console.log(json);
	
	$.ajax({
		type:			'PUT',
		url:				'../../' + name,
		data:			json,
		contentType: 	'pokemon2/json',
		async:			true,
		success:		function(data){
			buildOutput(ALL_DOCS, 0, '');
		},
		error:		function(XMLHttpRequest, textStatus, errorThrown){
			console.log(errorThrown); 
		}
	});
}

function buildOutput(view, tag, param){
	$('#output').empty();
	var viewString = view;
	if(param) {
		viewString += '?key=' + param;
	}
	
	console.log(viewString);
	
	$.ajax({
		type:		'GET',
		url:			viewString,
        async:  		true,
        contentType: 'pokemon2/json',
        success:	function(data){
		        		var arr = JSON.parse(data).rows;
			        	var htmlString = '<table>';
			        	for(var i=0; i<arr.length; i++){
			        		if(tag === 0) {
			        			var doc = arr[i].doc;
			        		}
			        		else if(tag === 1){
			        			var doc = arr[i].value;
			        		}
			        		if(doc.type === 'pokemon'){
			        			htmlString += '<tr><td>' + doc.name + '</td><td>' + doc.type + '</td><td>' + doc.trainer + '</td><td>' + doc.gender + '</td><td>' + doc.owned + '</td></tr>';
			        		}
			        	}
			        	htmlString += '</table>';
			        	console.log(htmlString);
			        	$('#output').html(htmlString);
        },
		error: 			function(XMLHttpRequest, textStatus, errorThrown){ 
			console.log(errorThrown); 
		}
	});
}

function search() {
	var dateOne_search = $("#dateOne_search").val();
	var dateTwo_search = $("#dateTwo_search").val();
	date_search = dateOne_search - dateTwo_search;
	buildOutput(BY_DATE, 1, date_search);
}

//
