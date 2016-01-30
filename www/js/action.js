function switchMode() {
    switch (timeTable.mode) {
        case "view":
            // switch to edit
            timeTable.mode = "edit";
            setMode();
            break;
        case "edit":
            // open save alert modal
            modalController('#modal-SaveAlert', "show");
            break;
    }
}

function switchTableType() {
    switch (timeTable.tableType) {
        case "day":
            // switch to night
            timeTable.tableType = "night";
            break;
        case "night":
            // switch to both
            timeTable.tableType = "both";
            break;
        case "both":
            // switch to day
            timeTable.tableType = "day";
            break;
    }
    setTableType();
}

function switchWeekType() {
    switch (timeTable.weekType) {
        case "normal":
            // switch to weekend
            timeTable.weekType = "weekend";
            break;
        case "weekend":
            // switch to normal
            timeTable.weekType = "normal";
            break;
    }
    setWeekType();
}

function saveChange() {
    // save change and switch to view
    cancelAll(function(){
        console.log("CancelAll done");
        getIds();
        setSchedule();
    });
    modalController('#modal-SaveAlert', "hide");
    updateDB(1, "tableField", JSON.stringify(timeTable.data.tableField));
    clearSelected();
    timeTable.mode = "view";
    setMode();
}

function edit() {
    console.log(timeTable.onSelected);
    if (timeTable.onSelected.length != 0) {
        modalController('#modal-ClassEdit', "show");
        document.getElementById("remindSelect").disabled = true;
    } else {
        modalController('#modal-SelectAlert', "show");
    };
}

function save() {
    for (var i = 0; i < timeTable.onSelected.length; i++) {
        var course = document.getElementById("input_class_name").value;
        var classRoom = document.getElementById("input_class_room").value;
        var isRemind = document.getElementById("remindCheckbox").checked;
        if (isRemind) {
            var remindTime = document.getElementById("remindSelect").options[document.getElementById("remindSelect").selectedIndex].value;
        } else {
            var remindTime = "";
        };
        timeTable.data.tableField[timeTable.onSelected[i].row - 1][timeTable.onSelected[i].cell - 1].course = course;
        timeTable.data.tableField[timeTable.onSelected[i].row - 1][timeTable.onSelected[i].cell - 1].classRoom = classRoom;
        timeTable.data.tableField[timeTable.onSelected[i].row - 1][timeTable.onSelected[i].cell - 1].isRemind = isRemind;
        timeTable.data.tableField[timeTable.onSelected[i].row - 1][timeTable.onSelected[i].cell - 1].remindTime = remindTime;

    };
    modalController('#modal-ClassEdit', "hide");
    setData();
}

function restore() {
    clearSelected();
    if (device.platform == "Android") {
        loadDB();
    } else if (device.platform == "browser") {
        initTableField();
        setData();
    }
    modalController('#modal-RestoreAlert', "hide");
}

function reset() {
    cancelAll(function(){
        console.log("CancelAll done");
        getIds();
    });
    clearSelected();
    if (device.platform == "Android") {
        initTableField();
        modalController('#modal-SaveAlert', "hide");
        updateDB(1, "tableField", JSON.stringify(timeTable.data.tableField));
        setData();
        clearSelected();
    } else if (device.platform == "browser") {
        initTableField();
        setData();
    }
    modalController('#modal-Reset', "hide");
}

function clearSelected() {
    var table = document.getElementById("tableArea");
    for (var i = timeTable.onSelected.length - 1; i >= 0; i--) {
        var target = table.rows[timeTable.onSelected[i].row].cells[timeTable.onSelected[i].cell];
        target.classList.remove("selected");
    };
    timeTable.onSelected.splice(0, timeTable.onSelected.length);
}

function ClassEvent() {
    var table = document.getElementById("tableArea");
    switch (timeTable.mode) {
        case "view":
            console.log(timeTable.data.tableField[this.parentNode.rowIndex - 1][this.cellIndex - 1]);
            var txtHead = [{
                "week": "Mon"
            }, {
                "week": "Tue"
            }, {
                "week": "Wed"
            }, {
                "week": "Thu"
            }, {
                "week": "Fri"
            }, {
                "week": "Sat"
            }, {
                "week": "Sun"
            }];
            var period = this.parentNode.rowIndex;
            var day = this.cellIndex;
            document.getElementById("classInfo-title").innerHTML = txtHead[day-1].week + " - The " + period + " Class"
            document.getElementById("classInfo-className").innerHTML = timeTable.data.tableField[period - 1][day - 1].course;
            document.getElementById("classInfo-classRoom").innerHTML = timeTable.data.tableField[period - 1][day - 1].classRoom;
            if (timeTable.data.tableField[this.parentNode.rowIndex - 1][this.cellIndex - 1].isRemind) {
                document.getElementById("classInfo-remindMe").innerHTML = " Yes ";
                document.getElementById("classInfo-remindTime").innerHTML = timeTable.data.tableField[period - 1][day - 1].remindTime;;
                document.getElementById("classInfo-remindTime").className = "displayTrue";
                document.getElementById("classInfoText-remindTime").className = "displayTrue";
            } else {
                document.getElementById("classInfo-remindMe").innerHTML = " No ";
                document.getElementById("classInfo-remindTime").className = "displayNone";
                document.getElementById("classInfoText-remindTime").className = "displayNone";
            };
            modalController('#modal-ClassInfo', "show");
            break;
        case "edit":
            var target = table.rows[this.parentNode.rowIndex].cells[this.cellIndex];
            if (target.classList.contains("selected")) {
                for (var i = timeTable.onSelected.length - 1; i >= 0; i--) {
                    if (timeTable.onSelected[i].row == this.parentNode.rowIndex && timeTable.onSelected[i].cell == this.cellIndex) {
                        var rmIndex = i;
                    };
                };
                if (rmIndex > -1) {
                    timeTable.onSelected.splice(rmIndex, 1);
                }
                target.classList.remove("selected");
            } else {
                timeTable.onSelected.push({
                    "row": this.parentNode.rowIndex,
                    "cell": this.cellIndex
                });
                target.classList.add("selected");
            };
            break;
    }
}

function modalController(modalId, method) {
    $(modalId).modal(method);
}

function exportCSV() {
    var exportArray = new Array();
    for (var i = 0; i < 15; i++) {
        for (var j = 0; j < 7; j++) {
            exportArray[i * 7 + j] = new Object();
            exportArray[i * 7 + j].period = i + 1;
            exportArray[i * 7 + j].day = j + 1;
            exportArray[i * 7 + j].course = timeTable.data.tableField[i][j].course;
            exportArray[i * 7 + j].classRoom = timeTable.data.tableField[i][j].classRoom;
            exportArray[i * 7 + j].isRemind = timeTable.data.tableField[i][j].isRemind;
            exportArray[i * 7 + j].remindTime = timeTable.data.tableField[i][j].remindTime;
            exportArray[i * 7 + j].cellColor = timeTable.data.tableField[i][j].cellColor;
        }
    }
    exportArray[105] = new Object();
    exportArray[105].tableName = "news";
    exportArray[105].tableType = "day";

    JSONToCSVConvertor(exportArray, timeTable.data.tableName, true);
}

function importCSV() {
    var file = $('#ImportFile')[0].files[0];
    if (file == null) {
        alert("Please Select File.");
        return;
    }
    timeTable.mode = "edit";
    setMode();
    if (device.platform == "Android") {
        //In Android
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
            fileSystem.root.getFile(file[1], {
                create: true,
                exclusive: false
            }, function(fileEntry) {
                fileEntry.file(function(file) {
                    var reader = new FileReader();
                    reader.readAsText(file);
                    reader.onloadend = function(e) {
                        var json = csvJSON(this.result);
                        importData(json);
                        $('#path_android').html('Path');
                        $('#ImportFile')[0].files[0] = null;
                    };
                }, errorHandler);
            }, errorHandler);
        }, errorHandler);
    } else if (device.platform == "browser") {
        if (file.type.match(/text\/csv/) || file.type.match(/vnd\.ms-excel/)) {
            oFReader = new FileReader();
            oFReader.readAsText(file);
            oFReader.onloadend = function() {
                var json = csvJSON(this.result);
                importData(json);
            };
        } else {
            console.log("This file does not seem to be a CSV.");
        }
    }
    $('#modal-Import').modal('hide');
}

function importData(json) {
    var inputData = JSON.parse(json);
    timeTable.data.tableName = inputData[inputData.length - 1].period;
    timeTable.data.tableType = inputData[inputData.length - 1].day;
    for (var i = 0; i < inputData.length - 1; i++) {
        period = inputData[i].period - 1;
        day = inputData[i].day - 1;
        timeTable.data.tableField[period][day].course = inputData[i].course;
        timeTable.data.tableField[period][day].classRoom = inputData[i].classRoom;
        timeTable.data.tableField[period][day].isRemind = inputData[i].isRemind;
        timeTable.data.tableField[period][day].remindTime = inputData[i].remindTime;
        timeTable.data.tableField[period][day].cellColor = inputData[i].cellColor;
    }
    setData();
}
