var db = firebase.firestore();
console.log("Loaded");
db.collection("User")
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            console.log(doc.id, " => ", doc.data());
            var table = document.getElementById("listusers");
            var col = '<tr>' +
                '<td>' + doc.data().userID + '</td> ' +
                '<td >' + doc.data().firstName + ' </td> ' +
                '<td >' + doc.data().sex + '</td> ' +
                '<td>' + doc.data().dateOfBirth + '</td>' +
                '<td>' + doc.data().phone + '</td>' +
                '<td>' + doc.data().secondName + '</td>' +
                '</tr>';
            console.log(col);
            table.insertAdjacentHTML('beforeend', col);
            //table.innerHTML(col);
        });
    })
    .catch(function(error) {
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