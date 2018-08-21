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
var docID = getUrlParameter('docID');
var reportRef;
var postRef = db.collection("Post").doc(docID);
var reportID;

postRef.get().then(function (doc) {
    if (doc.exists) {
        reportRef = db.collection("Report").where('postID', '==', doc.data().postID);
        $(document).ready(function () {
            var source = $("#load-post-detail").html();
            var template = Handlebars.compile(source);
            var context = {
                urlImage: doc.data().urlImage,
                title: doc.data().title,
                userID: doc.data().userID,
                userName: doc.data().userName,
                postID: doc.data().postID,
                dateCreate: doc.data().dateCreate
            }
            var el_html = template(context);
            $("#post-detail-panel-div").html(el_html);
        })
        $(document).ready(function () {
            var source = $("#load-info-post").html();
            var template = Handlebars.compile(source);
            var context = {
                description: doc.data().description,
                numberOfReported: doc.data().numberOfReported,
            }
            var el_html = template(context);
            $("#more-info-post").html(el_html);
        })
        //get report
        var reportTable = $("#reporttable").DataTable();
        try {
            reportRef.get().then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    reportID = doc.id;
                    console.log("reportDocID: " + doc.id);
                    var report_2 = db.collection("Report").doc(doc.id).collection("listreport");
                    report_2.get().then(function (querySnapshot) {
                        console.log("Report size: " + querySnapshot.size);
                        querySnapshot.forEach(function (doc) {
                            if (doc.data().status == 0) {
                                var table = document.getElementById("listreport");
                                var status;
                                if (doc.data().status == 0) {
                                    status = "waiting";
                                }
                                if (doc.data().status == 1) {
                                    status = "approved";
                                }
                                if (doc.data().status == 2) {
                                    status = "deleted";
                                }
                                var rows = '<tr>' +
                                    '<td>' + doc.data().userID + '</td>' +
                                    '<td>' + doc.data().userName + '</td>' +
                                    '<td>' + status+ '</td>' +
                                    '<td>' + doc.data().content + '</td>' +
                                    '<td>' + doc.data().time + '</td>' +
                                    '<td>' + '<button onclick="addApproval(' + "'" + doc.id + "'" + ')" class="btn btn-default" style="border-color: RED; color: red">Approval</button>' + '</td>' +
                                    '<td>' + '<button onclick="deleteReport(' + "'" + doc.id + "'" + ')" class="btn btn-default">Cancel</button>' + '</td>' +
                                    '</tr>';
                                reportTable.row.add([
                                    postID = doc.data().userID,
                                    userName = doc.data().userName,
                                    status = status,
                                    like = doc.data().content,
                                    comment = doc.data().time,
                                    approval = '<button onclick="addApproval(' + "'" + doc.id + "'" + ')" class="btn btn-default" style="border-color: RED; color: red">Approval</button>',
                                    cancel = '<button onclick="deleteReport(' + "'" + doc.id + "'" + ')" class="btn btn-default">Cancel</button>'
                                ]).draw(true);
                                // table.insertAdjacentHTML('beforeend', rows);
                            }

                        })
                    })
                })
            })
        } catch (error) {
            console.log("Data error: " + error);
        }
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch(function (error) {
    console.log("Error getting document:", error);
});

// $('#reporttable').dataTable();

function deleteReport(docID) {
    if (confirm("Are you sure you want to delete this report? " + docID)) {
        db.collection("Report").doc(reportID).collection("listreport").doc(docID).delete().then(function () {
            console.log("Document successfully deleted!");
            location.reload();
        }).catch(function (error) {
            console.error("Error removing document: ", error);
        });
    } else {
        console.log("Why!!!")
        return false;
    }
}

function deletePost() {
    if (confirm("Are you sure you want to delete this Post?")) {
        postRef.get().then(function (doc) {
            if (doc.exists) {
                number = doc.data().numberOfReported;
                if (number >= 3) {
                    postRef.update({
                        status: false,
                    });

                } else {
                    window.alert("You can't delete this post!!!");
                    return false;
                }
            } else {

            }
        }).catch(function (error) {
            console.log("Data error: " + error);
        })


    } else {
        console.log("Why!!!")
        return false;
    }
}

function addApproval(_docID) {
    var number = 0;
    postRef.get().then(function (doc) {
        if (doc.exists) {
            number = doc.data().numberOfReported;
            console.log("Number: " + number);
            if (confirm("Are you sure you want to approval this report?")) {
                db.collection("Post").doc(docID).update({
                    numberOfReported: number + 1,
                });
                console.log(_docID + " : " + docID);
                db.collection("Report").doc(reportID).collection("listreport").doc(_docID).delete().then(function () {
                    console.log("Document successfully deleted!");
                    location.reload();
                }).catch(function (error) {
                    console.error("Error removing document: ", error);
                });
            } else {
                console.log("Why!!!")
                return false;
            }
        }
    }).catch(function (error) {
        console.log("Data error: " + error);
    })
}
