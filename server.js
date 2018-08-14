var express = require('express');
var app = express();

var flash = require('connect-flash');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');

app.get('/', function (req, res) {
    if (sess.email) {
        /*
        * This line check Session existence.
        * If it existed will do some action.
        */
        res.redirect('/');
    }
    else {
        res.render('login.html');
    }
    // res.sendFile(__dirname + '/index.html');
});
app.post('/login', function (req, res) {
    sess = req.session;
    //In this we are assigning email to sess.email variable.
    //email comes from HTML page.
    sess.email = req.body.email;
    res.end('done');
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

app.get('/login', function (req, res, html) {
    res.sendFile(__dirname + '/login.html');
});

app.use(express.static(__dirname + '/public'));
var server = app.listen(3000, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Ung dung Node.js dang hoat dong tai dia chi: http://%s:%s", host, port)
});

app.get('*', function (req, res) {
    res.sendFile(__dirname + '/404.html', 404);
});
