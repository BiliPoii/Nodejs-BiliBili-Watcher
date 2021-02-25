exports.sql = function sql() {
    var fs = require('fs');
    var sqlite3 = require('sqlite3').verbose();
    var DB = DB || {};

    DB.SqliteDB = function (file) {
        DB.db = new sqlite3.Database(file);

        DB.exist = fs.existsSync(file);
        if (!DB.exist) {
            console.log("[观察者-主进程]检测到数据库不存在，正在创建数据库.....");
            fs.openSync(file, 'database');
            console.log("[观察者-主进程]创建数据库完毕");
        };
        console.log("[观察者-主进程]检测到数据存在，正在连接至数据库.....");

    };
    console.log("[观察者-主进程]数据库连接完毕");

    DB.printErrorInfo = function (err) {
        console.log("[观察者-ERROR]:" + err.message + " 错误代码:" + errno);
    };


    DB.SqliteDB.prototype.createTable = function (sql) {
        DB.db.serialize(function () {
            DB.db.run(sql, function (err) {
                if (null != err) {
                    DB.printErrorInfo(err);
                    return;
                }
            });
        });
    };
    /// tilesData format; [[level, column, row, content], [level, column, row, content]]
    DB.SqliteDB.prototype.insertData = function (sql, objects) {
        DB.db.serialize(function () {
            var stmt = DB.db.prepare(sql);
            for (var i = 0; i < objects.length; ++i) {
                stmt.run(objects[i]);
            }

            stmt.finalize();
        });
    };

    DB.SqliteDB.prototype.queryData = function (sql, callback) {
        DB.db.all(sql, function (err, rows) {
            if (null != err) {
                DB.printErrorInfo(err);
                return;
            }

            /// deal query data.
            if (callback) {
                callback(rows);
            }
        });
    };

    DB.SqliteDB.prototype.executeSql = function (sql) {
        DB.db.run(sql, function (err) {
            if (null != err) {
                DB.printErrorInfo(err);
            }
        });
    };

    DB.SqliteDB.prototype.close = function () {
        DB.db.close();
    };

    /// export SqliteDB.
    exports.SqliteDB = DB.SqliteDB;
}