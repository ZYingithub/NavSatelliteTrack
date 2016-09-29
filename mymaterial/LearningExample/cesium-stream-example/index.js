// most basic dependencies
//NPM 即 Node Package Manage，是 NodeJS 模块管理工具，当前已经内置于 NodeJS 中，所以不需要特意安装了
/** require() 用于在当前模块中加载和使用其他模块
express 模块是一个简洁而灵活的 node.js Web应用框架, 提供了一系列强大特性帮助你创建各种 Web 应用，和丰富的 HTTP 工具。
使用 Express 可以快速地搭建一个完整功能的网站；
http 模块主要用于搭建 HTTP 服务端和客户端，使用 HTTP 服务器或客户端功能必须调用 http 模块；
fs 模块， Node.js 文件系统
Chance:Chance - Random generator helper for JavaScript, this single library can generate random numbers, 
characters, strings, names, addresses, dice, and pretty much anything else.
**/
/*c/c++编译的二进制模块
在 node.js 中模块分为核心模块和文件模块两种，核心模块是通过 require('xxxx') 导入的，
文件模块是以 require('/xxxx') 或 require('./xxxx')、require('../xxxx') 形式导入的；核心模块是用，
而文件模块是后缀为.js、.json、.node 的文件，在 node.js 中一个文件/文件夹也可以称之为一个模块。
*/
// start from the code: http.createServer, 创建服务器
var express = require('express')
  , http = require('http')
  , os = require('os')
  , path = require('path')
  , fs = require('fs')
  , Chance = require('chance');
// create the app,表示创建express应用程序
var app = express();
var chance = new Chance();
// configure everything, just basic setup
//app.set('port', process.env.PORT || 3000)”就是设置项目的port,在下面可以使用app.get('port')来获取
//app.set(name, value)：设置 name 的值为 value，
//是设置服务器中的常量，，环境变量要是设置了PORT，那么就用环境变量的PORT
app.set('port', process.env.PORT || 3000);
//app.use([path], function)：使用中间件 function，可选参数path默认为"/"
//app.use 加载用于处理http請求的middleware（中间件），当一个请求来的时候，会依次被这些 middlewares处理
//引入一个所谓的中间件，其实就是用来再实际请求发生之前hack req和res对象来实现一些功能,顺序先里后外
//每一个请求都会到app.use里面去先过滤一遍
//app.use是express“调用中间件的方法”。所谓“中间件（middleware），就是处理HTTP请求的函数，用来完成各种特定的任务，
//比如检查用户是否登录、分析数据、以及其他在需要最终将数据发送给用户之前完成的任务。”。这是阮一峰文章的原话。
//app.use() 里面使用的参数，主要是函数。但这个使用，
//并不是函数调用，而是使能的意思。当用户在浏览器发出请求的时候，这部分函数才会启用，进行过滤、处理。
//express的路由，众所周知，是app.get(),app.post(),app.all()，。。。，但其实，它们都是app.use的别名
app.use(function(req, resp, next) {
    //next()????
    //修饰所有的response
  resp.header("Access-Control-Allow-Origin", "*");
  resp.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Serve the www directory statically
//设置静态目录
//通过 Express 内置的 express.static 可以方便地托管静态文件，
//例如图片、CSS、JavaScript 文件等。
//将静态资源文件所在的目录作为参数传递给 express.static 中间件就可以提供静态资源文件的访问了。
//例如，假设在 public 目录放置了图片、CSS 和 JavaScript 文件，你就可以：
//app.use(express.static('public'));
//如果你的静态资源存放在多个目录下面，你可以多次调用 express.static 中间件：
//app.use(express.static('public'));
//app.use(express.static('files'));
//访问静态资源文件时，express.static 中间件会根据目录添加的顺序查找所需的文件。
app.use(express.static('www'));
//---------------------------------------
// mini app
//---------------------------------------
//openConnections从start开始存储若干个response
var openConnections = [];
//向谁发送请求
//./czml是不行的，说明当前目录不是www
app.get('/czml', function(req, resp) {
    //response隔多长做出一次回应
    req.socket.setTimeout(2 * 60 * 1000);

    // send headers for event-stream connection
    // see spec for more information
    //头信息
    resp.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    });
    resp.write('\n');

    // push this res object to our global variable
    //将response的结果放到数组中
    openConnections.push(resp);

    // send document packet
    var d = new Date();
    //packet的id由date()类产生各不相同
    resp.write('id: ' + d.getMilliseconds() + '\n');
    //packet的？？？
    resp.write('data:' + JSON.stringify({ "id":"document", "version":"1.0" })+   '\n\n'); 
    // Note the extra newline

    // When the request is closed, e.g. the browser window
    // is closed. We search through the open connections
    // array and remove this connection.
    //object.method('signal', call the function)
    req.on("close", function() {
        var toRemove;
        for (var j =0 ; j < openConnections.length ; j++) {
            if (openConnections[j] == resp) {
                toRemove =j;
                break;
            }
        }
        openConnections.splice(j,1);
    });
});

setInterval(function() {
    // we walk through each connection
    openConnections.forEach(function(resp) {
        //为packet添加数据
        // send doc,返回response
        var d = new Date();
        resp.write('id: ' + d.getMilliseconds() + '\n');
        resp.write('data:' + createMsg() +   '\n\n'); // Note the extra newline
    });
//每隔1000ms调用一次SetInterval
}, 1000);
//createMsg()是真正用来生成packet的自定义函数，并返回序列化的JSON数据
function createMsg() {
    var d = new Date();
    var entity = {
        "id": d.getMilliseconds(),
        "polyline": {
            "positions": {
                "cartographicDegrees": [
                  chance.latitude(), chance.longitude(), 0
                  ,chance.latitude(), chance.longitude(), 0
              ]
        },
        "width": 2,
        "material":
            { "solidColor":
                { "color" :
                    {"rgba": [0,0,255,255]}
                }
            }
        }
    };
//返回序列化的JSON数据
    return JSON.stringify(entity);;
}

// startup everything, 创建服务器
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
})
