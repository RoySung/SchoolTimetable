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
    cordova.plugins.notification.local.cancelAll(callback);
}

function setSchedule(scheduleArray) {
	var scheduleArray = setScheduleArray();
    alert("Setting Schedule : " + scheduleArray);
    cordova.plugins.notification.local.schedule(scheduleArray);
}

function setScheduleArray(){
	var weekday = get Date().getDay;
    var hour = Date().getHours;
    var scheduleArray;
    for (var i = timeTable.data.tableField[] - 1; i >= 0; i--) {
    	for (var i = timeTable.data.tableField[][].length - 1; i >= 0; i--) {
    			if (timeTable.data.tableField[i][j].isRemind) {
    				console.log(timeTable.data.tableField[i][j].isRemind);
    				console.log(timeTable.data.tableField[i][j].remindTime);
    			};
    		};	
    };
	return scheduleArray;
}

function convertRemindTime(i, rt) {

}