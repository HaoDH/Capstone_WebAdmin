var db = firebase.firestore();
function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        var key = decodeURIComponent(sParameterName[0]);
        var value = decodeURIComponent(sParameterName[1]);

        if (key === sParam) {
            return value === undefined ? true : value;
        }
    }
};

var docID = getUrlParameter('account');

var userRef = db.collection("User").doc(docID);
userRef.get().then(function (doc) {
    if (doc.exists) {
        console.log("Document data:", doc.data());
        $(document).ready(function () {
            var source = $("#load-user-profile").html();
            var template = Handlebars.compile(source);
            var context = {
                imgURL: doc.data().imgUrl,
                firstName: doc.data().firstName,
                userID: doc.data().userID,
                sex: doc.data().sex,
                phone: doc.data().phone,
                dateOfBirth: doc.data().dateOfBirth
            }
            var el_html = template(context);
            $("#profile-panel-div").html(el_html);

        })
        var boolStatus = doc.data().status;
        var status;
        if (boolStatus == true || boolStatus == null) {
            status = "Actived";
        } else {
            status = "Locked";
        }
        $(document).ready(function () {
            var postOfUser = 0;
            db.collection("Post").where('userID', '==', doc.data().userID)
                .get().then(function (querySnapshot) {
                    postOfUser = querySnapshot.size;
                    var source = $("#more-info-profile").html();
                    var template = Handlebars.compile(source);
                    var context = {
                        status: status,
                        posts: postOfUser
                    }
                    var el_html = template(context);
                    $("#more-info-user").html(el_html);
                });
        })

        //Load list post of user

        var userPostTable = $('#posttableofuser').DataTable();
        db.collection("Post").where('userID', '==', doc.data().userID)
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    console.log(doc.data());
                    var table = document.getElementById("listpostofuser");
                    var map = doc.data();
                    var date = new Date(map.postTime);
                    var time = date.toLocaleString();
                    var row = '<tr>' +
                        '<td>' + doc.id + '</td>' +
                        '<td>' + doc.data().like + '</td>' +
                        '<td>' + doc.data().comment + '</td>' +
                        '<td>' + doc.data().countView + '</td>' +
                        '<td>' + time + '</td>' +
                        '<td>' + doc.data().title + '</td>' +
                        '</tr>';
                    userPostTable.row.add([
                        docID = doc.id,
                        like = doc.data().like,
                        comment = doc.data().comment,
                        view = doc.data().countView,
                        time = time,
                        title = doc.data().title
                    ]).draw();
                    console.log("DATATABLE: " + userPostTable.length);
                    table.insertAdjacentHTML('beforeend', row);
                })
                $(document).ready(function () {
                    // var table = $('#posttableofuser').DataTable();
                    $('#posttableofuser').DataTable();
                    $('#posttableofuser tbody').on('click', 'tr', function () {
                        if ($(this).hasClass('selected')) {
                            $(this).removeClass('selected');
                        } else {
                            userPostTable.$('tr.selected').removeClass('selected');
                            $(this).addClass('selected');
                        }
                    });

                    $('#button').click(function () {
                        userPostTable.row('.selected').remove().draw(false);
                    });
                });
                $('#posttableofuser').DataTable({
                    "destroy": true,
                    "jQueryUI": true,
                    "pagingType": "full_numbers",
                    "columnDefs": [{
                        "targets": 0,
                        "render": function (data, type, row) {
                            if (type === "display") {
                                return "<a href=\"post-detail?docID=" + encodeURIComponent(data) + "\">" + data + "</a>";
                            }
                            return data;
                        }
                    }]
                });
            }).catch(function (error) {
                console.log("Error getting documents: ", error);
            })
        //end
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch(function (error) {
    console.log("Error getting document:", error);
});

// Lock button
function lockUser() {
    if (confirm("Are you sure you want to delete this user?")) {
        var user = db.collection("User").doc(docID);
        if (user.postRemoved >= 3) {
            return user.update({
                status: false
            }).then(function () {
                console.log("Document successfully updated!");
            })
        }else {
            window.alert("You can't delete this account!!!");
            return false;
        }
    } else {
        console.log("Why!!!")
        return false;
    }
}
