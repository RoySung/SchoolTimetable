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

function saveChange() {
    // save change and switch to view
    modalController('#modal-SaveAlert', "hide");
    clearSelected();
    timeTable.mode = "view";
    setMode();
}

function edit() {
    console.log(timeTable.onSelected);
    if (timeTable.onSelected.length != 0) {
        modalController('#modal-ClassEdit', "show");
    } else {
        modalController('#modal-SelectAlert', "show");
    };
}

function restore() {
    clearSelected();
    modalController('#modal-RestoreAlert', "hide");
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
    timeTable = new timeTable();
    timeTable.data.tableName = "News";
    timeTable.data.tableType = "day";
    initTableField();
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
