function route(handler,pathname,response,request){
	//console.log('your urlname is',pathname);
	if(typeof handler[pathname]==='function'){
		handler[pathname](response,request);//把返回对象传给事件处理程序
	}else{
		response.writeHead(404,{"Content-Type":"text/plain"});
    	response.write("404 Not found");
    	response.end();
	}
}

exports.route = route;