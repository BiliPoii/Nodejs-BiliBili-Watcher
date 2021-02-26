exports.api = function api() {
    var sqlite3 = require('sqlite3');  // 引入 sqlite3 模块
    var path = require('path');  // 引入路径处理模块
    var dbName = path.join(__dirname, 'database.db');  // 获取当前运行目录下的 data.db 文件
    // 打开数据库
    var db = new sqlite3.Database(dbName, err => {
        if (err !== null) console.log(err);  // 输出错误信息
    });
    var express = require('express');
    var server = express();
    var url = require('url');
    server.listen(8081);

    server.get('/api/getinfo', (req, res) => {
        var params = url.parse(req.url, true).query;
        if (params.uid == null) {
            res.json({
                code: 400,
                message: 'Error',
                data: {}
            });
        } else {
            if (params.uid == "") {
                res.json({
                    code: 400,
                    message: 'Error',
                    data: {}
                });
            } else {
                db.all("SELECT * FROM Watcher", (err, rows) => {
                    if (err) console.log(err);  // 如果出现错误就输出错误信息
                    var fanss = rows;  // 输出查询结果
                    res.json({
                        code: 200,
                        message: 'Successful',
                        data:{fanss}
                    });
                });
            }
        }
    })
}