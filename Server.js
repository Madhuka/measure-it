var express =   require("express");
var bodyParser =    require("body-parser");
var multer  =   require('multer');
var app =   express();

app.use(bodyParser.json());
var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './photos');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-shoes-photo-' + Date.now());
  }
});
var upload = multer({ storage : storage }).array('photo',2);

app.get('/',function(req,res){
      res.sendFile(__dirname + "/index.html");
});

app.post('/api/photo',function(req,res){
    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading photo.");
        }
        res.end("photo is uploaded");
    });
});

app.listen(3000,function(){
    console.log("Server is started on port 3000");
});