var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/index.html', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/table-post', function (req, res, html) {
    res.sendFile(__dirname + '/table-posts.html');
});

app.get('/table-user', function (req, res, html) {
    res.sendFile(__dirname + '/table-users.html');
});

app.get('/table-report', function (req, res, html) {
    res.sendFile(__dirname + '/table-reports.html');
});

app.get('/profile', function (req, res, html) {
    res.sendFile(__dirname + '/profile.html');
});

app.use(express.static(__dirname + '/public'));
var server = app.listen(3000, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Ung dung Node.js dang hoat dong tai dia chi: http://%s:%s", host, port)
});

app.get('*', function(req, res){
    res.sendFile(__dirname + '/404.html', 404);
  });

  
var admin = require("firebase-admin");

var serviceAccount = require("path/to/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://capstone-project-1d078.firebaseio.com"
});
