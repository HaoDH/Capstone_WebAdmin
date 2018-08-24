var db = firebase.firestore();
var reportDB = db.collection("Report");
// var reportDataTable = $('#report-table').DataTable();;
// var aprovalReportDatatable = $('#approval-report-table').DataTable();
var deleteReportDataTable = $('#delete-report-table').DataTable();


function showAllReport() {

    reportDB.get().then(function (querySnapshot) {
        var reportDataTable = $('#report-table').DataTable({
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
                    "targets": 3,
                    "render": function (data, type, row) {
                        if (type === "display") {
                            return "<a href=\"profile?userID=" + encodeURIComponent(row[2]) + "\">" + data + "</a>";
                        }
                        return data;
                    }
                },
                {
                    "targets": [0],
                    "visible": false
                },
                {
                    "targets": [2],
                    "visible": false
                },
            ]
        });

        querySnapshot.forEach(function (doc) {
            var postID = doc.data().postID;
            var docID;
            var postName;
            postRef = db.collection("Post").where('postID', '==', doc.data().postID);
            postRef.get().then(function (querySnapshot) {
               querySnapshot.forEach(function (doc){
                postName = doc.data().title;
                docID = doc.id;
               })
            });
            var report_2 = db.collection("Report").doc(doc.id).collection("listreport");
            report_2.get().then(function (querySnapshot) {
                console.log("Report size: " + querySnapshot.size);
                querySnapshot.forEach(function (doc) {
                    if (doc.data().status == 0) {
                        var ReportTable = document.getElementById("list-report");
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
                        var map = doc.data();
                        var date = new Date(map.time);
                        var time = date.toLocaleString();
                        var rows = '<tr>' +
                            '<td>' + docID + '</td>' +
                            '<td>' + postName + '</td>' +
                            '<td>' + doc.data().userID + '</td>' +
                            '<td>' + doc.data().userName + '</td>' +
                            '<td>' + doc.data().content + '</td>' +
                            '<td>' + status + '</td>' +
                            '<td>' + time + '</td>' +
                            '</tr>';

                        reportDataTable.row.add([
                            docID = docID,
                            postName = postName,
                            userID = doc.data().userID,
                            userName = doc.data().userName,
                            content = doc.data().content,
                            status = status,
                            time = time,
                        ]).draw(true);
                        // ReportTable.insertAdjacentHTML('beforeend', rows);
                        // setToDataTable();
                    }

                });
            }).catch(function (error) {
                console.log("Error getting documents: ", error);
            });

        });
    }).catch(function (error) {
        console.log("Error getting documents: ", error);
    });
}

showAllReport();


function showApprovalReport() {

    reportDB.get().then(function (querySnapshot) {
        var reportDataTable = $('#approval-report-table').DataTable({
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
                    "targets": 3,
                    "render": function (data, type, row) {
                        if (type === "display") {
                            return "<a href=\"profile?userID=" + encodeURIComponent(row[2]) + "\">" + data + "</a>";
                        }
                        return data;
                    }
                },
                {
                    "targets": [0],
                    "visible": false
                },
                {
                    "targets": [2],
                    "visible": false
                },
            ]
        });

        querySnapshot.forEach(function (doc) {
            var postID = doc.data().postID;
            var docID_1;
            var postName;
            db.collection("Post").where('postID', '==', doc.data().postID).get().then(function (querySnapshot) {
               querySnapshot.forEach(function (doc){
                postName = doc.data().title;
                docID_1 = doc.id;
               })
            });
            var report_3 = db.collection("Report").doc(doc.id).collection("listreport");
            report_3.get().then(function (querySnapshot) {
                console.log("Report size: " + querySnapshot.size);
                querySnapshot.forEach(function (doc) {
                    if (doc.data().status == 1) {
                        var ReportTable = document.getElementById("list-report");
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
                        var map = doc.data();
                        var date = new Date(map.time);
                        var time = date.toLocaleString();
                        var rows = '<tr>' +
                            '<td>' + docID_1 + '</td>' +
                            '<td>' + postName + '</td>' +
                            '<td>' + doc.data().userID + '</td>' +
                            '<td>' + doc.data().userName + '</td>' +
                            '<td>' + doc.data().content + '</td>' +
                            '<td>' + status + '</td>' +
                            '<td>' + time + '</td>' +
                            '</tr>';
                        console.log("Row content: " + rows);
                        reportDataTable.row.add([
                            docID = docID_1,
                            postName = postName,
                            userID = doc.data().userID,
                            userName = doc.data().userName,
                            content = doc.data().content,
                            status = status,
                            time = time,
                        ]).draw(true);
                        // ReportTable.insertAdjacentHTML('beforeend', rows);
                        // setToDataTable();
                    }

                });
            }).catch(function (error) {
                console.log("Error getting documents: ", error);
            });

        });
    }).catch(function (error) {
        console.log("Error getting documents: ", error);
    });
}
showApprovalReport();


function showDeletedReport() {

    reportDB.get().then(function (querySnapshot) {
        var reportDataTable = $('#delete-report-table').DataTable({
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
                    "targets": 3,
                    "render": function (data, type, row) {
                        if (type === "display") {
                            return "<a href=\"profile?userID=" + encodeURIComponent(row[2]) + "\">" + data + "</a>";
                        }
                        return data;
                    }
                },
                {
                    "targets": [0],
                    "visible": false
                },
                {
                    "targets": [2],
                    "visible": false
                },
            ]
        });

        querySnapshot.forEach(function (doc) {
            var postID = doc.data().postID;
            var docID;
            var postName;
            postRef = db.collection("Post").where('postID', '==', postID);
            postRef.get().then(function (querySnapshot) {
               querySnapshot.forEach(function (doc){
                postName = doc.data().title;
                docID = doc.id;
               })
            }).catch(function (error){
                console.log(error);
            });
            var report_2 = db.collection("Report").doc(doc.id).collection("listreport");
            report_2.get().then(function (querySnapshot) {
                console.log("Report size: " + querySnapshot.size);
                querySnapshot.forEach(function (doc) {
                    if (doc.data().status == 2) {
                        var ReportTable = document.getElementById("list-report");
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
                        var map = doc.data();
                        var date = new Date(map.time);
                        var time = date.toLocaleString();
                        var rows = '<tr>' +
                            '<td>' + docID + '</td>' +
                            '<td>' + postName + '</td>' +
                            '<td>' + doc.data().userID + '</td>' +
                            '<td>' + doc.data().userName + '</td>' +
                            '<td>' + doc.data().content + '</td>' +
                            '<td>' + status + '</td>' +
                            '<td>' + time + '</td>' +
                            '</tr>';

                        reportDataTable.row.add([
                            docID = docID,
                            postName = postName,
                            userID = doc.data().userID,
                            userName = doc.data().userName,
                            content = doc.data().content,
                            status = status,
                            time = time,
                        ]).draw(true);
                        // ReportTable.insertAdjacentHTML('beforeend', rows);
                        // setToDataTable();
                    }

                });
            }).catch(function (error) {
                console.log("Error getting documents: ", error);
            });

        });
    }).catch(function (error) {
        console.log("Error getting documents: ", error);
    });
}
showDeletedReport();