function loadDB() {
    db.transaction(function(tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS timeTable (id integer primary key AUTOINCREMENT, tableName TEXT NOT NULL, tableType integer NOT NULL, tableField TEXT NOT NULL)', [], function(tx, res) {
            tx.executeSql('SELECT COUNT(*) FROM timeTable', [], function(res) {
                if (res.rows.item(0) == 0) {
                    //create new data 
                    timeTable.data.tableName = "News";
                    timeTable.data.tableType = "day";
                    initTableField();
                    tx.executeSql("INSERT INTO timeTable (tableName, tableType, tableField) VALUES (?,?,?)", ["new", 0, JSON.stringify(this.data.tableField)], function(tx, res) {
                        tx.executeSql("select * from timeTable", [], function(tx, res) {
                            console.log("Select * from timeTable :" + res.rows.item(0));
                        });
                    }, function(e) {
                        console.log("ERROR: " + e.message);
                    });
                } else {
                    //read data
                    tx.executeSql("select * from timeTable ", [], function(tx, res) {
                        console.log("Select * from timeTable :" + res.rows.item(0));
                        timeTable.data = JSON.parse(res.rows.item(0).tableField);
                    });

                }
            });
        });
    });
}

function updateDB(type, array) {
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
}

function initTableField() {
    timeTable.data.tableField = new Array();
    for (var i = 0; i < 15; i++) {
        timeTable.data.tableField[i] = new Array();
        for (var j = 0; j < 7; j++) {
            timeTable.data.tableField[i][j] = new Object();
            timeTable.data.tableField[i][j].course = null;
            timeTable.data.tableField[i][j].classRoom = null;
            timeTable.data.tableField[i][j].isRemind = false;
            timeTable.data.tableField[i][j].remindTime = "";
            timeTable.data.tableField[i][j].cellColor = "#FFFFFF";
        }
    }
}
