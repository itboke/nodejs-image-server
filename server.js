var http  = require('http');
//引入url模块
var url = require('url');
//启动Http
function start(router,handler){
	function onresponse(request,response){

		//var postData = '';//数据临时变量
		//request.setEncoding = 'utf-8';//设置请求的内容是utf-8 
		//操作url
		if(request.url!= '/favicon.ico'){
			var pathName = url.parse(request.url).pathname;			
			router(handler,pathName,response,request);
		}
		//http请求特定事件
		/*request.addListener('data',function(dataChunk){
			postData+=dataChunk;
		});
		request.addListener('end',function(){
			router(handler,pathName,response,postData);
		});*/

	}
	http.createServer(onresponse).listen(8888);
}

exports.start = start;