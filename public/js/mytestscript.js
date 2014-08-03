function createXHR() {
	if (typeof XMLHttpRequest != 'undefined') {
		return new XMLHttpRequest();
	} else {
		try {
			return new ActiveXObject('Msxml2.XMLHTTP');
		} catch (e1) {
			try {
				return new ActiveXObject('Microsoft.XMLHTTP');
			} catch (e2) {
			}
		}
	}
	return null;
}

var result;
var code;
var statusheader = document.getElementById('infoheader');
function submitAccessCode(){
	code = document.getElementsByName("key")[0];
	var container = document.getElementsByClassName('container')[0];
	var xhr = createXHR();

	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			var formhtml = "<div id='reminderform'><label>Reminder to send:<textarea id='remindertext' class='block' rows='10' cols='50'></textarea></label><input type='text' id='datepicker'><button class='btn btn-primary center block' id='formsubmit' onclick='postReminder()'>Remind me!</button></div>";
			//var result = JSON.parse(xhr.responseText);	
			result = JSON.parse(xhr.responseText);
			//document.getElementById('results').innerHTML = result[0].user;
			container.innerHTML = formhtml;	
			statusheader.innerHTML = "Enter the message you would like to recieve as your Reminder below";
			loadTimePicker();
		} else {
			container.innerHTML = "Failed to find matching account";	
		}
	}

	xhr.open("GET", "user/"+code.value, true);
	xhr.send(null);
	container.innerHTML = "Retrieving information...";
}

function postReminder(){
	var reminder = document.getElementById('remindertext');
	if(!code) return "key is not defined";
	
	var xhr = createXHR();
		
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			//do something
			statusheader.innerHTML = xhr.responseText;

		} else {
			//do something else
		}
	}
	var datepicker = document.getElementById('datepicker');
	var totalstring = datepicker.value;
	var month = totalstring.slice(0,2);
	var day = totalstring.slice(3,5);
	var year = totalstring.slice(6,10);
	//UNTESTED CHANGE - CHANGED TIHS TO -1
	var hour = totalstring.slice(11,13) - 1;
	var minute = totalstring.slice(14,16);

	var newdate = new Date(year,month,day,hour,minute,0);
	console.log(newdate);

	xhr.open("POST", "user/"+code.value+"/"+reminder.value+"&"+day+"&"+month+"&"+year+"&"+minute+"&"+hour, true);
	xhr.send(null);
}

function loadTimePicker(){
	$('#datepicker').datetimepicker({
		timeFormat: "HH:mm"
	});
}

function sendRequest(operation) {
	var xhr = createXHR();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			//var result = JSON.parse(xhr.responseText);
			//var value = result.value;
			//var meta = result.meta;
			if (operation == "get") {
					document.getElementById('val').innerHTML = xhr.responseText;
					if(meta){
						document.getElementById('meta').innerHTML = meta;
					}
					else{
						document.getElementById('meta').innerHTML = '';
					}
			}
		}
	};

	if (operation == "get") {
		xhr.open("GET", "ayy/", true);
		xhr.send(null);
	} else if (operation == "put") {
		xhr.open("PUT", "cache?key=" + key + "&value=" + value, true);
		xhr.send(null);
	} else {
		xhr.open("DELETE", "cache/" + key, true);
		xhr.send(null);
	}
}

function getCache() {
	sendRequest('get');
	console.log('called from getCache()');
}
function putCache() {
	sendRequest('put');
}
function removeCache() {
	sendRequest('delete');
}
