function setTimeTable() {
    // define table
    var tableWeekLenght = 7;
    var tableClassLenght = 15;
    var tableHead = document.getElementById("tableHeadArea");
    var trHead = document.getElementById("trHead");
    var tableBody = document.getElementById("tableBodyArea");
    // append table head
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
    for (var i = 0; i < tableWeekLenght; i++) {
        var th = document.createElement('th');
        trHead.appendChild(th);
        trHead.cells[i + 1].appendChild(document.createTextNode(txtHead[i].week));
    };
    // append table body
    for (var i = 0; i < tableClassLenght; i++) {
        var tr = document.createElement('tr');
        // append class cell
        for (var j = 0; j <= tableWeekLenght; j++) {
            var td = document.createElement('td');
            if (j != 0) {
                td.className = "classCells";
                td.addEventListener("click", ClassEvent);
            };
            tr.appendChild(td);
        };
        tableBody.appendChild(tr);
        tr.cells[0].appendChild(document.createTextNode(i + 1));
    };
}

function setTableType() {
    switch (timeTable.tableType) {
        case "day":
            document.getElementById("tableTypeIcon").className = "fa fa-fw fa-sun-o";
            for (var i = 0; i <= 15; i++) {
                if (i <= 9) {
                    document.getElementById("tableArea").rows[i].className = "displayTrue";
                } else {
                    document.getElementById("tableArea").rows[i].className = "displayNone";
                };
            };
            break;
        case "night":
            document.getElementById("tableTypeIcon").className = "fa fa-fw fa-moon-o";
            for (var i = 0; i <= 15; i++) {
                if (i > 9) {
                    document.getElementById("tableArea").rows[i].className = "displayTrue";
                } else {
                    document.getElementById("tableArea").rows[i].className = "displayNone";
                };
                document.getElementById("tableArea").rows[0].className = "displayTrue";
            };
            break;
        case "both":
            for (var i = 0; i <= 15; i++) {
                document.getElementById("tableArea").rows[i].className = "displayTrue";
            };
            document.getElementById("tableTypeIcon").className = "fa fa-fw fa-star-o";
            break;
    }
}

function setWeekType() {
    switch (timeTable.weekType) {
        case "normal":
            document.getElementById("weekTypeIcon").className = "fa fa-fw fa-circle";
            for (var i = 0; i <= 15; i++) {
                for (var j = 0; j <= 7; j++) {
                    if (j <= 5) {
                        document.getElementById("tableArea").rows[i].cells[j].className = "displayTrue";
                    } else {
                        document.getElementById("tableArea").rows[i].cells[j].className = "displayNone";
                    };
                };
            };
            break;
        case "weekend":
            document.getElementById("weekTypeIcon").className = "fa fa-fw fa-circle-o";
            for (var i = 0; i <= 15; i++) {
                for (var j = 0; j <= 7; j++) {
                    if (j <= 5 && j != 0) {
                        document.getElementById("tableArea").rows[i].cells[j].className = "displayNone";
                    } else {
                        document.getElementById("tableArea").rows[i].cells[j].className = "displayTrue";
                    };
                };
            };
            break;
    }
}

function setMode() {
    switch (timeTable.mode) {
        case "view":
            document.getElementById("ModeIcon").className = "fa fa-fw fa-eye";
            document.getElementById("editBtn").classList.add("displayNone");
            document.getElementById("editBtn").classList.remove("displayTrue");
            document.getElementById("restoreBtn").classList.add("displayNone");
            document.getElementById("restoreBtn").classList.remove("displayTrue");

            break;
        case "edit":
            document.getElementById("ModeIcon").className = "fa fa-fw fa-pencil";
            document.getElementById("editBtn").classList.add("displayTrue");
            document.getElementById("editBtn").classList.remove("displayNone");
            document.getElementById("restoreBtn").classList.add("displayTrue");
            document.getElementById("restoreBtn").classList.remove("displayNone");
            break;
    }
}

function setData() {
    var tableClassLenght = 15;
    var tableWeekLenght = 7;
    var table = document.getElementById("tableArea");
    console.log(timeTable.data.tableField);
    for (var i = 0; i < tableClassLenght; i++) {
        for (var j = 0; j < tableWeekLenght; j++) {
            table.rows[i + 1].cells[j + 1].appendChild(document.createTextNode(timeTable.data.tableField[i][j].course));
            // table.rows[i + 1].cells[j + 1].appendChild(document.createTextNode('test'));
        }
    }
}
