//创建一个简单的server服务器

var http=require('http');//引入http模块
http.createServer(function(req,res){res.writeHead(200,{'Content-Type':'text/plain'});//写入HTTP状态和类型信息

									res.end('hello world\n');//输出内容

						}).listen(1337,'127.0.0.1');//创建服务监听本地1337端口
console.log('服务器创建成功！Server running at http://127.0.0.1:1337/');