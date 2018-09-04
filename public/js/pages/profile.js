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

var userID = getUrlParameter('userID');
var userDocID;
if (docID != null) {
    console.log("docID para: " + docID);
    loadUserWithDocID();

}
if (userID != null) {
    loadUserWithUserID();
}

function loadUserWithDocID() {

    var userRef = db.collection("User").doc(docID);
    var postRemoved = 0;
    userRef.get().then(function (doc) {
        if (doc.exists) {
            console.log("status user: " + doc.data().status)
            postRemoved = doc.data().postRemoved;
            userStatus = doc.data().status;
            //Display process: 
            userID = doc.data().userID;
            userDocID = doc.id;

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
                            posts: postOfUser,
                            postRemoved: postRemoved
                        }
                        var el_html = template(context);
                        $("#more-info-user").html(el_html);
                        if (postRemoved < 5) {
                            $("#btn-delete").hide();
                            $("#has-locked").hide();
                        } else {
                            if (userStatus == true) {
                                $("#btn-delete").show();
                                $("#has-locked").hide();
                            } else {
                                $("#btn-delete").hide();
                                $("#has-locked").show();
                            }
                        }

                        if (postRemoved == 0) {
                            document.getElementById("process").innerHTML = "<div class=progress>" +
                                "</div>";
                        }
                        if (postRemoved == 1) {
                            document.getElementById("process").innerHTML = "<div class=progress>" +
                                "<div class='progress-bar progress-bar-success' style='width: 20%'><span class=sr-only>1 Reported</span></div>" +
                                "</div>";
                        }
                        if (postRemoved == 2) {
                            document.getElementById("process").innerHTML = "<div class=progress>" +
                                "<div class='progress-bar progress-bar-success' style='width: 20%'><span class=sr-only>1 Reported</span></div>" +
                                "<div class= 'progress-bar progress-bar-warning' style='width:20%'><span class=sr-only>2 Reported</span></div>" +
                                "</div>";
                        }
                        if (postRemoved == 3) {
                            document.getElementById("process").innerHTML = "<div class=progress>" +
                                "<div class='progress-bar progress-bar-success' style='width: 20%'><span class=sr-only>1 Reported</span></div>" +
                                "<div class= 'progress-bar progress-bar-warning' style='width:20%'><span class=sr-only>2 Reported</span></div>" +
                                "<div class= 'progress-bar progress-bar-warning' style='width:20%'><span class=sr-only>2 Reported</span></div>" +
                                "</div>";
                        }
                        if (postRemoved == 4) {
                            document.getElementById("process").innerHTML = "<div class=progress>" +
                                "<div class='progress-bar progress-bar-success' style='width: 20%'><span class=sr-only>1 Reported</span></div>" +
                                "<div class= 'progress-bar progress-bar-warning' style='width:20%'><span class=sr-only>2 Reported</span></div>" +
                                "<div class= 'progress-bar progress-bar-warning' style='width:20%'><span class=sr-only>2 Reported</span></div>" +
                                "<div class= 'progress-bar progress-bar-danger' style='width:20%'><span class=sr-only>2 Reported</span></div>" +
                                "</div>";
                        }
                        if (postRemoved == 5) {
                            document.getElementById("process").innerHTML = "<div class=progress>" +
                                "<div class='progress-bar progress-bar-success' style='width: 20%'><span class=sr-only>1 Reported</span></div>" +
                                "<div class= 'progress-bar progress-bar-warning' style='width:20%'><span class=sr-only>2 Reported</span></div>" +
                                "<div class= 'progress-bar progress-bar-warning' style='width:20%'><span class=sr-only>2 Reported</span></div>" +
                                "<div class= 'progress-bar progress-bar-danger' style='width:20%'><span class=sr-only>2 Reported</span></div>" +
                                "<div class= 'progress-bar progress-bar-danger' style='width:20%'><span class=sr-only>2 Reported</span></div>" +
                                "</div>";
                        }
                    });
            })

            //Load list post of user

            var userPostTable = $('#posttableofuser').DataTable();
            db.collection("Post").where('userID', '==', doc.data().userID)
                .get()
                .then(function (querySnapshot) {
                    querySnapshot.forEach(function (doc) {
                        if (doc.data().status == true) {
                            var table = document.getElementById("listpostofuser");
                            var map = doc.data();
                            var date = new Date(map.postTime);
                            var time = date.toLocaleString();
                            var row = '<tr>' +
                                '<td>' + doc.id + '</td>' +
                                '<td>' + doc.data().title + '</td>' +
                                '<td>' + time + '</td>' +
                                '<td>' + doc.data().like + '</td>' +
                                '<td>' + doc.data().comment + '</td>' +
                                '<td>' + doc.data().countView + '</td>' +
                                '</tr>';
                            userPostTable.row.add([
                                docID = doc.id,
                                title = doc.data().title,
                                time = time,
                                like = doc.data().like,
                                comment = doc.data().comment,
                                view = doc.data().countView,
                            ]).draw();
                            table.insertAdjacentHTML('beforeend', row);
                        }

                    });
                    $('#posttableofuser').DataTable({
                        "destroy": true,
                        "jQueryUI": true,
                        "pagingType": "full_numbers",
                        "columnDefs": [
                            {
                                "targets": 1,
                                "render": function (data, type, row) {
                                    if (type === "display") {
                                        return "<a href=\"post-detail?docID=" + encodeURIComponent(row[0]) + "\">" + data + "</a>";
                                    }
                                    return data;
                                }
                            },
                            {
                                "targets": 0,
                                "visible": false
                            }
                        ]
                    });
                }).catch(function (error) {
                    console.log("Error getting documents: ", error);
                })

            //black list
            var userBlackListPostTable = $('#blacklist-post-table-of-user').DataTable();
            db.collection("Post").where('userID', '==', doc.data().userID)
                .get()
                .then(function (querySnapshot) {
                    querySnapshot.forEach(function (doc) {
                        if (doc.data().numberOfReported > 0 && doc.data().status == true) {

                            var table = document.getElementById("blacklist-post");
                            var map = doc.data();
                            var date = new Date(map.postTime);
                            var time = date.toLocaleString();
                            var row = '<tr>' +
                                '<td>' + doc.id + '</td>' +
                                '<td>' + doc.data().title + '</td>' +
                                '<td>' + time + '</td>' +
                                '<td>' + doc.data().like + '</td>' +
                                '<td>' + doc.data().comment + '</td>' +
                                '<td>' + doc.data().countView + '</td>' +
                                '<td>' + doc.data().numberOfReported + '</td>' +
                                '</tr>';
                            userBlackListPostTable.row.add([
                                docID = doc.id,
                                title = doc.data().title,
                                time = time,
                                like = doc.data().like,
                                comment = doc.data().comment,
                                view = doc.data().countView,
                                numberOfReported = doc.data().numberOfReported
                            ]).draw();
                            table.insertAdjacentHTML('beforeend', row);
                        }
                    });
                    $('#blacklist-post-table-of-user').DataTable({
                        "destroy": true,
                        "jQueryUI": true,
                        "pagingType": "full_numbers",
                        "columnDefs": [
                            {
                                "targets": 1,
                                "render": function (data, type, row) {
                                    if (type === "display") {
                                        return "<a href=\"post-detail?docID=" + encodeURIComponent(row[0]) + "\">" + data + "</a>";
                                    }
                                    return data;
                                }
                            },
                            {
                                "targets": 0,
                                "visible": false
                            }
                        ]
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
}

function loadUserWithUserID() {

    var userRef = db.collection("User").where("userID", "==", userID);
    var postRemoved = 0;
    userRef.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            if (doc.exists) {
                userDocID = doc.id;
                postRemoved = doc.data().postRemoved;
                userStatus = doc.data().status;
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
                            console.log("number of post remove: " + postRemoved);
                            var source = $("#more-info-profile").html();
                            var template = Handlebars.compile(source);
                            var context = {
                                status: status,
                                posts: postOfUser,
                                postRemoved: postRemoved
                            }
                            var el_html = template(context);
                            $("#more-info-user").html(el_html);

                            if (postRemoved < 5) {
                                $("#btn-delete").hide();
                                $("#has-locked").hide();
                            } else {
                                if (userStatus == true) {
                                    $("#btn-delete").show();
                                    $("#has-locked").hide();
                                } else {
                                    $("#btn-delete").hide();
                                    $("#has-locked").show();
                                }
                            }



                            if (postRemoved == 0) {
                                document.getElementById("process").innerHTML = "<div class=progress>" +
                                    "</div>";
                            }
                            if (postRemoved == 1) {
                                document.getElementById("process").innerHTML = "<div class=progress>" +
                                    "<div class='progress-bar progress-bar-success' style='width: 20%'><span class=sr-only>1 Reported</span></div>" +
                                    "</div>";
                            }
                            if (postRemoved == 2) {
                                document.getElementById("process").innerHTML = "<div class=progress>" +
                                    "<div class='progress-bar progress-bar-success' style='width: 20%'><span class=sr-only>1 Reported</span></div>" +
                                    "<div class= 'progress-bar progress-bar-warning' style='width:20%'><span class=sr-only>2 Reported</span></div>" +
                                    "</div>";
                            }
                            if (postRemoved == 3) {
                                document.getElementById("process").innerHTML = "<div class=progress>" +
                                    "<div class='progress-bar progress-bar-success' style='width: 20%'><span class=sr-only>1 Reported</span></div>" +
                                    "<div class= 'progress-bar progress-bar-warning' style='width:20%'><span class=sr-only>2 Reported</span></div>" +
                                    "<div class= 'progress-bar progress-bar-warning' style='width:20%'><span class=sr-only>2 Reported</span></div>" +
                                    "</div>";
                            }
                            if (postRemoved == 4) {
                                document.getElementById("process").innerHTML = "<div class=progress>" +
                                    "<div class='progress-bar progress-bar-success' style='width: 20%'><span class=sr-only>1 Reported</span></div>" +
                                    "<div class= 'progress-bar progress-bar-warning' style='width:20%'><span class=sr-only>2 Reported</span></div>" +
                                    "<div class= 'progress-bar progress-bar-warning' style='width:20%'><span class=sr-only>2 Reported</span></div>" +
                                    "<div class= 'progress-bar progress-bar-danger' style='width:20%'><span class=sr-only>2 Reported</span></div>" +
                                    "</div>";
                            }
                            if (postRemoved == 5) {
                                document.getElementById("process").innerHTML = "<div class=progress>" +
                                    "<div class='progress-bar progress-bar-success' style='width: 20%'><span class=sr-only>1 Reported</span></div>" +
                                    "<div class= 'progress-bar progress-bar-warning' style='width:20%'><span class=sr-only>2 Reported</span></div>" +
                                    "<div class= 'progress-bar progress-bar-warning' style='width:20%'><span class=sr-only>2 Reported</span></div>" +
                                    "<div class= 'progress-bar progress-bar-danger' style='width:20%'><span class=sr-only>2 Reported</span></div>" +
                                    "<div class= 'progress-bar progress-bar-danger' style='width:20%'><span class=sr-only>2 Reported</span></div>" +
                                    "</div>";
                            }
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
                                '<td>' + doc.data().title + '</td>' +
                                '<td>' + time + '</td>' +
                                '<td>' + doc.data().like + '</td>' +
                                '<td>' + doc.data().comment + '</td>' +
                                '<td>' + doc.data().countView + '</td>' +
                                '</tr>';
                            userPostTable.row.add([
                                docID = doc.id,
                                title = doc.data().title,
                                time = time,
                                like = doc.data().like,
                                comment = doc.data().comment,
                                view = doc.data().countView,
                            ]).draw();
                            console.log("DATATABLE: " + userPostTable.length);
                            table.insertAdjacentHTML('beforeend', row);
                        });
                        $('#posttableofuser').DataTable({
                            "destroy": true,
                            "jQueryUI": true,
                            "pagingType": "full_numbers",
                            "columnDefs": [
                                {
                                    "targets": 1,
                                    "render": function (data, type, row) {
                                        if (type === "display") {
                                            return "<a href=\"post-detail?docID=" + encodeURIComponent(row[0]) + "\">" + data + "</a>";
                                        }
                                        return data;
                                    }
                                },
                                {
                                    "targets": 0,
                                    "visible": false
                                }
                            ]
                        });
                    }).catch(function (error) {
                        console.log("Error getting documents: ", error);
                    })
                //end
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        })
    }).catch(function (error) {
        console.log("Error getting document:", error);
    });
}


// Lock button
function lockUser() {
    if (confirm("Are you sure you want to delete this user?")) {
        var user = db.collection("User").doc(userDocID);
        console.log("Doc ID: " + userDocID);
        var postRemoved = 0;
        var status;
        user.get().then(function (doc) {
            if (doc.exists) {
                postRemoved = doc.data().postRemoved;
                status = doc.data().status;
                console.log(postRemoved + " : " + status + " : " + docID);
                if (status == true) {
                    if (postRemoved >= 5) {
                        user.update({
                            status: false
                        }).then(function () {
                            // window.alert(userID);
                            var cast = [];
                            function Data(postDocID) {
                                this.postDocID = postDocID;
                            }
                            var userPostTable = $('#posttableofuser').DataTable();
                            var listPostOfUserDB = db.collection("Post").where('userID', '==', userID);
                            listPostOfUserDB.get().then(function (querySnapshot) {
                                querySnapshot.forEach(function (doc) {
                                    cast.push(new Data(doc.id));
                                    console.log("Doc ID of Post:" + doc.id);
                                })
                                for (var x in cast) {
                                    // alert(cast[x].description);
                                    db.collection("Post").doc(cast[x].postDocID).update({
                                        status: false
                                    }).catch(function (error) {
                                        console.log("Error getting document:", error);
                                    });
                                }
                            })
                            console.log("Document successfully updated!");
                        })
                        window.location.reload(true);
                    } else {
                        window.alert("You can't delete this account!!! + Number Post has been delete: " + user.postRemoved);
                        return false;
                    }
                } else {
                    window.alert("You can't lock again the locked account!!!");
                    return false;
                }
            } else {
                console.log("No such document!");
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });

    } else {
        console.log("Why!!!")
        return false;
    }
}
