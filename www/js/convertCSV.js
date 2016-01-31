function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
    var CSV = '';
    var fileName, uri, link;

    if (ShowLabel) {
        var row = "";
        for (var index in arrData[0]) {
            row += index + ',';
        }
        row = row.slice(0, -1);
        CSV += row + '\r\n';
    }

    for (var i = 0; i < arrData.length; i++) {
        var row = "";
        for (var index in arrData[i]) {
            row += '"' + arrData[i][index] + '",';
        }
        row.slice(0, row.length - 1);
        CSV += row + '\r\n';
    }

    if (CSV == '') {
        alert("Invalid data");
        return;
    }

    fileName = "SchoolTimeTable_";
    fileName += ReportTitle.replace(/ /g, "_");

    uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(CSV);
    link = document.createElement("a");
    link.href = uri;
    link.style = "visibility:hidden";
    link.download = fileName + ".csv";


    if (device.platform == "Android") {
        Filecontroller("write", fileName + ".csv", CSV);
        //For Android
        window.plugins.toast.showLongBottom('匯出 CSV , 檔案名稱 :' + fileName + ".csv", function(a) {
            console.log('toast Export CSV Success');
        }, function(b) {
            alert('toast error: ' + b)
        });    
    } else if (device.platform == "browser") {
        link.click();
    }

    modalController('#modal-Export', "hide");
}

function csvJSON(csv) {

    var lines = csv.split("\r\n");
    var result = [];
    var headers = lines[0].split(",");

    for (var i = 1; i < lines.length; i++) {
        var obj = {};

        var row = lines[i],
            queryIdx = 0,
            startValueIdx = 0,
            idx = 0;

        if (row.trim() === '') {
            continue;
        }

        while (idx < row.length) {
            /* if we meet a double quote we skip until the next one */
            var c = row[idx];

            if (c === '"') {
                do {
                    c = row[++idx];
                } while (c !== '"' && idx < row.length - 1);
            }

            if (c === ',' || /* handle end of line with no comma */ idx === row.length - 1) {
                /* we've got a value */
                var value = row.substr(startValueIdx, idx - startValueIdx).trim();

                /* skip first double quote */
                if (value[0] === '"') {
                    value = value.substr(1);
                }
                /* skip last comma */
                if (value[value.length - 1] === ',') {
                    value = value.substr(0, value.length - 1);
                }
                /* skip last double quote */
                if (value[value.length - 1] === '"') {
                    value = value.substr(0, value.length - 1);
                }

                var key = headers[queryIdx++];
                obj[key] = value;
                startValueIdx = idx + 1;
            }

            ++idx;
        }

        result.push(obj);
    }

    //return result; //JavaScript object
    return JSON.stringify(result); //JSON
}
