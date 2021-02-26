var sqlserver = require('./sqlite3server.js');
var sql = require('./sqlite3.js');
var get = require('./get.js');
var api = require('./getapi.js');
sqlserver.sql();
sql.sql();
get.get();
api.api();