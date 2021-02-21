var fs = require('fs'),
    md5 = require('md5');
var chrome="";
var filePath="database.txt";
var Web = require('./web.js');
let preveMd5 = null
// 创建事件处理程序
//异步执行后回调
function yibu(){
fs.readFile("database.txt",function(err,date){
if(err){
return console.log(err);
}
chrome=date;
});
}

//监测文件变动后更新文字流
function watch(){
    fs.watch(filePath,(event,filename)=>{
        var currentMd5 = md5(fs.readFileSync("database.txt"))
        if (currentMd5 == preveMd5) {
            return
        }
        preveMd5 = currentMd5;
        console.log('[观察者-监测]文件已更新，后端同步更新');
        yibu();
    });
}
yibu();
watch();
console.log('[观察者-主进程]文字流服务器正在创建');
var http = require('http');
http.createServer(function(request, response){
// 发送 HTTP 头部
// HTTP 状态值: 200 : OK
// 内容类型: text/plain
response.writeHead(200,{'Content-Type':'text/plain;charset=utf-8'});
// 输出文字流
response.end(chrome);
}).listen(8888);
// 终端打印Log
console.log('[观察者-主进程]文字流服务器正在监听端口8888,请用浏览器访问http://<IP>:8888/');
Web.Web();