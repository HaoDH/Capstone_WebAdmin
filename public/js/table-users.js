var db = firebase.firestore();
var t = $('#usertable').DataTable();
Handlebars.registerHelper('noop', function(options) {
    return options.fn(this);
  });
db.collection("User")
    .get()
    .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            console.log(doc.id, " => ", doc.data());
            $('#exampless').dataTable();
            var table = document.getElementById("listusers");
            var col = '<tr>' +
                '<td>' + doc.data().userID + '</td> ' +
                '<td>' + doc.data().firstName + '</td> ' +
                '<td>' + doc.data().sex + '</td> ' +
                '<td>' + doc.data().dateOfBirth + '</td>' +
                '<td>' + doc.data().phone + '</td>' +
                '<td>' + doc.data().secondName + '</td>' +
                '</tr>';
            t.row.add([
                userID = doc.data().userID,
                fistName = doc.data().firstName,
                sex = doc.data().sex,
                dateOfBirth = doc.data().dateOfBirth,
                phone = doc.data().phone,
                secondName = doc.data().secondName
            ]).draw();
            console.log(col);
            table.insertAdjacentHTML('beforeend', col);
            //table.innerHTML(col);
        });
        // $('#usertable').dataTable();
        $('#usertable').DataTable({
            "destroy": true,
            "jQueryUI": true,
            "pagingType": "full_numbers",
            "columnDefs": [
                {
                    "targets": 0,
                    "render": function (data, type, row) {
                        if (type === "display") {
                            return "<a href=\"profile?account=" + encodeURIComponent(data) + "\">" + data + "</a>";
                        }
                        return data;
                    }
                }
            ]
        });
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

// t.row.add([
//     userID = doc.data().userID,
//     fistName = doc.data().firstName,
//     sex = doc.data().sex,
//     dateOfBirth = doc.data().dateOfBirth,
//     phone = doc.data().phone,
//     secondName = doc.data().secondName
// ])
// });

Handlebars.registerHelper('imgURL', function(value){
    return profile.photos[0].value;});