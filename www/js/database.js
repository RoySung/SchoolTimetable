function loadDB() {
    db.transaction(function(tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS timeTable (id integer primary key AUTOINCREMENT, tableName TEXT NOT NULL, tableType TEXT NOT NULL, tableField TEXT NOT NULL)', [], function(tx, res) {
            console.log("create new db table");
            tx.executeSql('SELECT COUNT(*) AS cnt FROM timeTable', [], function(tx, res) {
                console.log("enter select query");
                console.log(res.rows.item(0).cnt);

                if (res.rows.item(0).cnt == 0) {
                    //create new data 
                    console.log("create new db data");
                    timeTable.data.tableName = "News";
                    timeTable.data.tableType = "day";
                    initTableField();
                    tx.executeSql("INSERT INTO timeTable (tableName, tableType, tableField) VALUES (?,?,?)", [timeTable.data.tableName, timeTable.data.tableType, JSON.stringify(timeTable.data.tableField)], function(tx, res) {
                        tx.executeSql("select * from timeTable", [], function(tx, res) {
                            console.log("Select * from timeTable :" + res.rows.item(0));
                        	timeTable.data.tableName = res.rows.item(0).tableName;
                        	timeTable.data.tableType = res.rows.item(0).tableType;
                        	timeTable.data.tableField = JSON.parse(res.rows.item(0).tableField);
                        	console.log(timeTable.data);
                            setData();
                        });
                    }, function(e) {
                        console.log("ERROR: " + e.message);
                    });
                } else {
                    //read data
                    console.log("read data");
                    tx.executeSql("select * from timeTable ", [], function(tx, res) {
                        console.log("Select * from timeTable :" + res.rows.item(0));
                        timeTable.data.tableName = res.rows.item(0).tableName;
                        timeTable.data.tableType = res.rows.item(0).tableType;
                        timeTable.data.tableField = JSON.parse(res.rows.item(0).tableField);
                        console.log(timeTable.data);
                        setData();
                    });
                }
            });
        });
    });
}

function updateDB(field, value) {
    db.transaction(function(tx) {
        tx.executeSql("UPDATE timeTable  SET tableType=?, tableField=?", [type, JSON.stringify(array)], function(tx, res) {
            console.log("UPDATE timeTable :");
            tx.executeSql("select * from timeTable", [], function(tx, res) {
                console.log("Select * from timeTable :" + res.rows.item(0));
            });
        });
    }, function(e) {
        console.log("ERROR: " + e.message);
    });
    switch (field) {
        case "tableName":
            //update tableName
            break;
        case "tableType":
            //update tableType
            break;
        case "tableField":
            //update tableField
        case "all":
            //Update all
            break;
    }
}

function initTableField() {
    timeTable.data.tableField = new Array();
    for (var i = 0; i < 15; i++) {
        timeTable.data.tableField[i] = new Array();
        for (var j = 0; j <= 7; j++) {
            timeTable.data.tableField[i][j] = new Object();
            timeTable.data.tableField[i][j].course = '';
            timeTable.data.tableField[i][j].classRoom = '';
            timeTable.data.tableField[i][j].isRemind = false;
            timeTable.data.tableField[i][j].remindTime = "";
            timeTable.data.tableField[i][j].cellColor = "#FFFFFF";
        }
    }
}
