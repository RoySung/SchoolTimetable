function cancelAll() {
    console.log("Cancel All Schedule");
    cordova.plugins.notification.local.cancelAll(callback);
}

function setSchedule(scheduleArray) {
    alert("Setting Schedule : " + scheduleArray);
    cordova.plugins.notification.local.schedule(scheduleArray);
}