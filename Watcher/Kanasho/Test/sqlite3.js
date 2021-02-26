exports.sql = function sql() {
    /// Import SqliteDB.

    var SqliteDB = require('./sqlite3server.js').SqliteDB;



    var file = "database.db";

    var sqliteDB = new SqliteDB(file);



    /// create table.

    var createTileTableSql = "create table if not exists tiles(UID INTEGER, FANS INTEGER);";

    var createLabelTableSql = "create table if not exists labels(UID INTEGER, FANS INTEGER);";

    sqliteDB.createTable(createTileTableSql);

    sqliteDB.createTable(createLabelTableSql);



    /// insert data.

    var tileData = [[1, 10], [1, 11]];

    var insertTileSql = "insert into tiles(UID, FANS) values(?, ?)";

    sqliteDB.insertData(insertTileSql, tileData);


    sqliteDB.close();



    function dataDeal(objects) {

        for (var i = 0; i < objects.length; ++i) {

            console.log(objects[i]);

        }

    }

}