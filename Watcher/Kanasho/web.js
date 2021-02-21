exports.Web = function Web(){
  console.log('[观察者-主进程]网页服务器正在创建');
  var express = require('express');
  var fs = require('fs');
  var path = require('path');
  var bodyParser = require('body-parser');
  var app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  // 访问静态资源
  app.use(express.static(path.resolve(__dirname, 'dist')));
  // 访问单页
  app.get('*', function (req, res) {
  var html = fs.readFileSync(path.resolve(__dirname, 'dist/index.html'), 'utf-8');
   res.send(html);
  });
  // 监听
  app.listen(8081, function () {
    console.log('[观察者-网页服务]网页服务器正在监听8081,请用浏览器访问http://<IP>:8081/');
  });
};