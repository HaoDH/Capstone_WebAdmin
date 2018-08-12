
var db = firebase.firestore();

console.log("Loaded");
db.collection("User")
    .get()
    .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            console.log(doc.id, " => ", doc.data());
            $(document).ready(function () {
                var source = $("#load-list-users").html();
                var template = Handlebars.compile(source);
                var context = {
                    userID: doc.data().userID,
                    firstName: doc.data().firstName,
                    sex: doc.data().sex,
                    dateOfBirth: doc.data().dateOfBirth,
                    phone: doc.data().phone,
                    secondName: doc.data().secondName
                }
                var el_html = template(context);
                $("#listusers").html(el_html);
            });
        })
    })
    .catch(function (error) {
        console.log("Error getting documents: ", error);
    });

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