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
        context.innerText = size;
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