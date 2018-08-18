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
console.log(docID);

var postRef = db.collection("Post").doc(docID);
4

postRef.get().then(function(doc) {
    if (doc.exists) {
        reportRef = db.collection("Report").where('postID', '==', doc.data().postID);
        console.log("Document data:", doc.data());
        $(document).ready(function() {
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
            //get report
        var reportTable = $("#reporttable").DataTable();
        reportRef.get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                console.log("Document data:", doc.data());
                var i = 0;
                for (i = 0; i < doc.data().report.length; i++) {
                    var table = document.getElementById("listreport");
                    var rows = '<tr>' +
                        '<td>' + doc.data().report[i].userID + '</td>' +
                        '<td>' + doc.data().report[i].userName + '</td>' +
                        '<td>' + doc.data().report[i].content + '</td>' +
                        '<td>' + doc.data().report[i].time + '</td>' +
                        '<td>' + '<button class="btn btn-default" style="border-color: RED; color: red">Approval</button>' + '</td>' +
                        '<td>' + '<button onclick="deleteReport(' + i + ',' + "'" + doc.id + "'" + ')" class="btn btn-default">Cancel</button>' + '</td>' +
                        '</tr>';
                    reportTable.row.add([
                        postID = doc.data().report[i].userID,
                        userName = doc.data().report[i].userName,
                        like = doc.data().report[i].content,
                        comment = doc.data().report[i].time,
                        approval = '<button class="btn btn-default" style="border-color: RED; color: red">Approval</button>',
                        cancel = '<button onclick="deleteReport(' + i + ',' + "'" + doc.id + "'" + ')" class="btn btn-default">Cancel</button>'
                    ]).draw(true);
                    // table.insertAdjacentHTML('beforeend', rows);
                    console.log("document customdata foo: " + doc.data().report[i].content);
                }
            });
            $(document).ready(function() {
                var table = $('#reporttable').DataTable();

                $('#reporttable tbody').on('click', 'tr', function() {
                    if ($(this).hasClass('selected')) {
                        $(this).removeClass('selected');
                    } else {
                        table.$('tr.selected').removeClass('selected');
                        $(this).addClass('selected');
                    }
                });

                $('#button').click(function() {
                    table.row('.selected').remove().draw(false);
                });
            });
        })
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});

// $('#reporttable').dataTable();

function deleteReport(index, docID) {
    var indexOfReport = index;
    if (confirm("Are you sure you want to delete this report? " + index + " " + docID)) {
        var smallReportRef = db.collection("Report").doc(docID);
        var array;
        var hashMap = new Object;
        array = smallReportRef.report;
        console.log(typeof(array));
    } else {
        console.log("Why!!!")
        return false;
    }
}

function deletePost() {
    if (confirm("Are you sure you want to delete this Post? : ")) {
        db.collection("Post").doc(docID).delete().then(function() {
            console.log("Document successfully deleted!");
            window.location.href = "table-post";
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
    } else {
        console.log("Why!!!")
        return false;
    }
}
