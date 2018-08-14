/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global firebase, consile */

var db = firebase.firestore();
var btn = document.getElementById("btn2");

db.collection("Post")
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            console.log(doc.id, " => ", doc.data());
        });
        var size = querySnapshot.size;
        var context = document.getElementById("totalpost");
        context.innerText = size;// Bước 1: Import module http và fs
        var http = require('http');
        var fs = require('fs');
         
        // Bước 2: Khởi tạo server
        var server = http.createServer(function(request, response){
            // Biến request: là biến lưu trữ thông tin gửi lên của client
            // Biến response: là biến lưu trữ các thông tin trả về cho client
             
            // Kiểm tra URL truy cập phải trang about ko
            if (request.url == '/index.html')
            {
                // Thiết lập Header
                response.writeHead(200, {
                    "Context-type" : "text/html"
                });
                 
                // Show thông tin trang about
                fs.createReadStream('./index.html').pipe(response);
            }
            else // trường hợp ngược lại ko tìm thấy file
            {
                // Thiết lập Header
                response.writeHead(404, {
                    "Context-type" : "text/plain"
                });
                 
                // Show lỗi không tìm thấy trang
                response.write('404 Not Found ' + request.url);
                 
                // Kết thúc
                response.end();
            }
        });
         
        // Bước 3: Lắng nghe cổng 300 thì thực hiện chương trình
        server.listen(3000, function(){
            console.log('Connected Successfull!');
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });


db.collection("User")
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            console.log(doc.id, " => ", doc.data());
        });
        var size = querySnapshot.size;
        var context = document.getElementById("totaluser");
        context.innerText = size;
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });

function addData() {
    var paren = document.getElementById("totalpost");
    paren.innerText = size;
}

// $(document).ready(function() {
//     var source = $("#load-post").html();
//     var template = Handlebars.compile(source);
//     var context = {
//         context: size
//     }
//     var el_html = template(context);
//     $("#divtotalpost").html(el_html);
//     window.alert("2");
// })