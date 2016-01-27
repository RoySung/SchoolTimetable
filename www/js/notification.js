// Schedule Object Demo
// {
//     id: 2,
//     title: "",
//     text: "",
//     firstAt: Date(),
//     every: type,
//     sound: "file://bells.mp3",
//     icon: "img/logo.png",
//     data: {
//         test: "test data"
//     }
// }
function cancelAll() {
    console.log("Cancel All Schedule");
    // cordova.plugins.notification.local.cancelAll();
}

function setSchedule() {
	var scheduleArray = setScheduleArray();
    console.log(scheduleArray);
    // cordova.plugins.notification.local.schedule(scheduleArray);
}

function initScheduleObj () {
	return {
		"id" : null,
		"title" : "Remind",
		"text" : null,
		"firstAt" : null,
		"every" : "week"	
	}
}

function setScheduleArray(){
    var scheduleArray = [];
    var x = 0;
    for (var i = timeTable.data.tableField.length - 1; i >= 0; i--) {
    	for (var j = timeTable.data.tableField[i].length - 1; j >= 0; j--) {
    			if (timeTable.data.tableField[i][j].isRemind) {
    				console.log("i= " + i + "j= " + j);
    				var firstAt = convertRemindTime(i, j, timeTable.data.tableField[i][j].remindTime);
    				console.log(firstAt);
    				var scheduleObj = initScheduleObj();
    				scheduleObj.id = x;
    				scheduleObj.firstAt = firstAt;
    				scheduleObj.text = "Next Class is " + timeTable.data.tableField[i][j].course + ", Class Room in the " + timeTable.data.tableField[i][j].classRoom;
    				console.log(scheduleObj);
    				scheduleArray.push(scheduleObj);
    				x++;
    			};
    		};	
    };
	return scheduleArray;
}

function convertRemindTime(i, j, rt) {
	// Def 0-6 = Mon - Sun
	var dateNow = new Date();
	var firstAt = new Date();
	var weekdayNow = dateNow.getDay();
    var hourNow = dateNow.getHours();
	var dataWeekday = j;
	var dataHour = convertHour(i);
	// convert weekday format
	if ((weekdayNow - 1) < 0 ) {
		weekdayNow = 6;
	} else{
		weekdayNow = weekdayNow - 1;
	};
	// Get firstAt
	if (dataWeekday > weekdayNow) {
		firstAt.setDate(dateNow.getDate() + (dataWeekday - weekdayNow));
	} else if(dataWeekday == weekdayNow){
		if (dataHour < hourNow) {
			firstAt.setDate(dateNow.getDate() + 7);
		} else{
			firstAt.setDate(dateNow.getDate());
		};
	} else if(dataWeekday < weekdayNow){
		firstAt.setDate(dateNow.getDate() - (weekdayNow - dataWeekday) + 7);
	};
	firstAt.setHours(dataHour);
	firstAt.setMinutes(0);
	firstAt.setMinutes(firstAt.getMinutes() - rt);
	firstAt.setSeconds(0);
	return firstAt;
}

function convertHour(i){
	if (i <= 3) {
		dataHour = i + 8;
	} else if (i > 3 && i <= 7) {
		dataHour = i + 9;
	} else {
		dataHour = i + 10;
	};
	return dataHour;
}