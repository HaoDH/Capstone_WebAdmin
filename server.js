var express = require('express');
var app = express();

app.get('/', function (req, res) {
   res.sendFile(__dirname + '/index.html');
   res.sendFile(__dirname + '/table-users.html');
});
app.use(express.static(__dirname + '/public'));

app.get('/posttable', function (req, res,html) {
    res.sendFile(__dirname+'/table-users.html');
   });

var server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Ung dung Node.js dang hoat dong tai dia chi: http://%s:%s", host, port)
});


