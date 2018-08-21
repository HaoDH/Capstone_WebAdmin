var db = firebase.firestore();

var allReportDataTable = $('#report-table').DataTable();

function showAllReport() {

    var reportDB = db.collection("Report");

    reportDB.get().then(function (querySnapshot) {
        var numberOfReport = 0;
        var countReport = document.getElementById("count-report");
        querySnapshot.forEach(function (doc) {
            var listreportDB = db.collection("Report");
            var status;
            listreportDB.doc(doc.id).collection("listreport").get().then(function (_querySnapshot) {
                _querySnapshot.forEach(function (_doc) {
                    var allReportTable = document.getElementById("list-report");
                    if (_doc.data().status == 0) {
                        status = "waiting";
                    }
                    if (_doc.data().status == 1) {
                        status = "approved";
                    }
                    if (_doc.data().status == 2) {
                        status = "deleted";
                    }
                    var map = _doc.data();
                    var date = new Date(map.time);
                    var time = date.toLocaleString();
                    var rows = '<tr>' +
                        '<td>' + _doc.id + '</td>' +
                        '<td>' + doc.data().postID + '</td>' +
                        '<td>' + _doc.data().userID + '</td>' +
                        '<td>' + status + '</td>' +
                        '<td>' + _doc.data().content + '</td>' +
                        '<td>' + time + '</td>' +
                        '</tr>';
                    allReportDataTable.row.add([
                        docID = _doc.id,
                        postID = doc.data().postID,
                        userID = _doc.data().userID,
                        status = status,
                        content = _doc.data().content,
                        time = time,
                    ]).draw();
                    console.log("Content: " + rows);
                    allReportTable.insertAdjacentHTML('beforeend', rows);
                    // setToDataTable();
                    $('#report-table').DataTable();
                })

            }).catch(function (error) {
                console.log("Error getting documents: ", error);
            });

        })
    }).catch(function (error) {
        console.log("Error getting documents: ", error);
    });
}
showAllReport();


function showApprovalReport() {

    var reportDB = db.collection("Report");
    var approvalReportDatatable = $('#approval-report-table').DataTable();
    reportDB.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            var listreportDB = db.collection("Report");
            var status;
            listreportDB.doc(doc.id).collection("listreport").get().then(function (_querySnapshot) {
                _querySnapshot.forEach(function (_doc) {
                    if (_doc.data().status == 1) {
                        var allReportTable = document.getElementById("approval-report");
                        if (_doc.data().status == 0) {
                            status = "waiting";
                        }
                        if (_doc.data().status == 1) {
                            status = "approved";
                        }
                        if (_doc.data().status == 2) {
                            status = "deleted";
                        }
                        var map = _doc.data();
                        var date = new Date(map.time);
                        var time = date.toLocaleString();
                        var rows = '<tr>' +
                            '<td>' + _doc.id + '</td>' +
                            '<td>' + doc.data().postID + '</td>' +
                            '<td>' + _doc.data().userID + '</td>' +
                            '<td>' + status + '</td>' +
                            '<td>' + _doc.data().content + '</td>' +
                            '<td>' + time + '</td>' +
                            '</tr>';
                        allReportDataTable.row.add([
                            docID = _doc.id,
                            postID = doc.data().postID,
                            userID = _doc.data().userID,
                            status = status,
                            content = _doc.data().content,
                            time = time,
                        ]).draw();
                        allReportTable.insertAdjacentHTML('beforeend', rows);
                        $('#approval-report-table').DataTable();
                        // setToDataTable();

                    }
                  
                })

            }).catch(function (error) {
                console.log("Error getting documents: ", error);
            });

        })
    }).catch(function (error) {
        console.log("Error getting documents: ", error);
    });
}
showApprovalReport();


function showDeletedReport() {

    var reportDB = db.collection("Report");
    var deleteReportDatatable = $('#delete-report-table').DataTable();
    reportDB.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            var listreportDB = db.collection("Report");
            var status;
            listreportDB.doc(doc.id).collection("listreport").get().then(function (_querySnapshot) {
                _querySnapshot.forEach(function (_doc) {
                    if (_doc.data().status == 2) {
                        var deleteReportTable = document.getElementById("delete-report");
                        if (_doc.data().status == 0) {
                            status = "waiting";
                        }
                        if (_doc.data().status == 1) {
                            status = "approved";
                        }
                        if (_doc.data().status == 2) {
                            status = "deleted";
                        }
                        var map = _doc.data();
                        var date = new Date(map.time);
                        var time = date.toLocaleString();
                        var rows = '<tr>' +
                            '<td>' + _doc.id + '</td>' +
                            '<td>' + doc.data().postID + '</td>' +
                            '<td>' + _doc.data().userID + '</td>' +
                            '<td>' + status + '</td>' +
                            '<td>' + _doc.data().content + '</td>' +
                            '<td>' + time + '</td>' +
                            '</tr>';
                            deleteReportDatatable.row.add([
                            docID = _doc.id,
                            postID = doc.data().postID,
                            userID = _doc.data().userID,
                            status = status,
                            content = _doc.data().content,
                            time = time,
                        ]).draw();
                        deleteReportTable.insertAdjacentHTML('beforeend', rows);
                        $('#delete-report-table').DataTable();
                    }
                 
                })
            }).catch(function (error) {
                console.log("Error getting documents: ", error);
            });

        })
    }).catch(function (error) {
        console.log("Error getting documents: ", error);
    });
}
showDeletedReport();

function setToDataTable() {
    $('#report-table').DataTable({
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
}