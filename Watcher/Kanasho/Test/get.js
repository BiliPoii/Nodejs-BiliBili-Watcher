exports.get = function get() {
    var UID = "21370617";
    var http = require('http');
    var querystring = require('querystring');
    var DB = require('./sqlite3server.js').SqliteDB;
    var file = "database.db";
    var sqliteDB = new DB(file);
    var moment = require('moment');
    moment.locale('zh-cn');

    // 需要提交的数据
    var data = {
        mid: UID
    }

    var dataString = querystring.stringify(data)	// 转换为字符串格式

    var option = {
        hostname: 'api.bilibili.com',	// 要访问的服务器的ip地址
        port: 80,  // 要访问的服务器的端口
        path: '/x/web-interface/card?' + dataString, // 请求的接口和传递的参数
        method: 'GET'	// 请求方式
    }

    var rep = http.request(option, function (res) {
        //console.log('[观察者-获取]状态码:' + res.statusCode)
        //console.log('[观察者-获取]响应头:' + JSON.stringify(res.headers))
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
            //console.log(`[观察者-获取]响应主体: ${chunk}`);
            var infojson = JSON.parse(chunk);
            var insert = JSON.stringify(infojson.data.card.fans);
            var time = moment().format();
            var tileData = [[UID, insert ,time]];
            var insertWatcherSql = `replace into Watcher(UID, FANS ,TIME) values(?, ? ,?)`;
            sqliteDB.insertData(insertWatcherSql, tileData);
            sqliteDB.close();
        });
        res.on('end', () => {
            //console.log('[观察者-获取]响应中已无数据');
        });
    });
    rep.on('error', (e) => {
        //console.error(`[观察者-获取]请求遇到问题: ${e.message}`);
    });
    rep.end(); //请求结束
}