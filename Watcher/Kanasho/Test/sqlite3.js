exports.sql = function sql() {
    /// Import SqliteDB.
    var DB = require('./sqlite3server.js').SqliteDB;
    var file = "database.db";
    var sqliteDB = new DB(file);
    /// create table.
    var createTileTableSql = "create table if not exists Watcher(UID INTEGER, FANS INTEGER, TIME TEXT);";
    sqliteDB.createTable(createTileTableSql);
}