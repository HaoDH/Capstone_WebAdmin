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
    .then(function (querySnapshot) {
        var newPostInTheMonth = 0;
        querySnapshot.forEach(function (doc) {
            var map = doc.data();
            var dateNow = new Date();
            var month = new Date(map.postTime);
            if (month.getMonth()  == dateNow.getMonth()) {
                console.log((month.getMonth()- dateNow.getMonth()));
                newPostInTheMonth = newPostInTheMonth + 1;
                console.log("new post: " + newPostInTheMonth);
            } else {
                console.log("something happen");
            } 
        });
        var size = querySnapshot.size;
        var context = document.getElementById("totalpost");
        context.innerText = size;
        var newPost = document.getElementById("new-post-in-the-month");
        newPost.innerText = newPostInTheMonth;
    })
    .catch(function (error) {
        console.log("Error getting documents: ", error);
    });
db.collection("User")
    .get()
    .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {

        });
        var size = querySnapshot.size;
        var context = document.getElementById("totaluser");
        context.innerText = size;
    })
    .catch(function (error) {
        console.log("Error getting documents: ", error);
    });

function addData() {
    var paren = document.getElementById("totalpost");
    paren.innerText = size;
}

function getdhm(timestamp) {
    var date = Date.parse(timestamp);
    var month = date.getMonth();
    var day = date.getDay();
    var year = date.getYear();

    var formattedTime = month + '/' + day + '/' + year;
    return formattedTime;

}