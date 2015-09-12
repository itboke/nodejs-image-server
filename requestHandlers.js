var exec = require("child_process").exec;
var queryString = require('querystring');
var fs = require('fs');
var formidable = require("formidable");
//默认
function start(response){
	var body ='<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" method="post" enctype="multipart/form-data">'+
    '<input type="file" name="upload"><br/>'+
    '<input type="submit" value="upload file" />'+
    '</form>'+
    '</body>'+
    '</html>';
    response.writeHead(200,{"Content-Type":"text/html"});
    response.write(body);
    response.end();
}
//上传
function upload(response,request){
	//exec("ls",function(error, stdout, stderr){...}
	var form = new formidable.IncomingForm();
	form.parse(request,function(err,fields,files){

		var is = fs.createReadStream(files.upload.path);  
	    var os = fs.createWriteStream("F:\\node\\web\\tmp\\emituofo.png");  
	    is.pipe(os);  
	    is.on('end',function(){  
	        fs.unlinkSync(files.upload.path);  
	    });
	    response.writeHead(200,{"Content-Type":"text/html;charset:utf-8"});
	    response.write("received image:<br/>");
	    response.write("<img src='/show' />");
	    response.end();
	});
}
function show(response){
	fs.readFile("./tmp/emituofo.png","binary",function(error, file){
    if(error){
      response.writeHead(500,{"Content-Type":"text/plain"});
      response.write(error +"\n");
      response.end();
    }else{
      response.writeHead(200,{"Content-Type":"image/jpg"});
      response.write(file,"binary");
      response.end();
    }
  });
}

exports.upload = upload;
exports.start = start;
exports.show = show;