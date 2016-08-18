var path = require('path');
var express =   require("express");
var multer  =   require('multer');
var app     = express();
var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './upload');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now());
  }
});
var upload = multer({ storage : storage}).single('userPhoto');

app.use('/', express.static(path.join(__dirname, '/public')));

app.get('/',function(req,res){
      res.sendFile(__dirname + "/public/index.html");
});

app.post('/api/photo',function(req,res){
    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
        res.end("{size : " + req.file.size + "}");
    });
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});