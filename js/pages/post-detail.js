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
var postID = getUrlParameter('postID');
console.log(postID);


db.collection("Post").where('postID', '==', postID)
    .get()
    .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
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
            console.log(doc.data());
        });
    })
    .catch(function (error) {
        console.log("Error getting documents: ", error);
    });

var reportTable = $("#reporttable").DataTable();    
db.collection("Report").where('postID', '==', postID)
    .get()
    .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {

            $('#reporttable').parents('div.dataTables_wrapper').first().hide();
            console.log("Document data:", doc.data());
            var i = 0;
            for (i = 0; i < doc.data().report.length; i++) {
                var table = document.getElementById("listreport");
                var row = '<tr>' +
                    '<td>' + doc.data().report[i].userID + '</td>' +
                    '<td>' + doc.data().report[i].userName + '</td>' +
                    '<td>' + doc.data().report[i].content + '</td>' +
                    '<td>' + doc.data().report[i].time + '</td>' +
                    '<td>' + '<button  class="btn btn-default" style="border-color: RED; color: red">Approval</button>' + '</td>' +
                    '<td>' + '<button onclick="deleteReport(' + i + ',' + "'" + doc.id + "'" + ')" class="btn btn-default">Cancel</button>' + '</td>' +
                    '</tr>';
                reportTable.row.add([
                    postID = doc.data().report[i].userID,
                    userName = doc.data().report[i].userName,
                    like = doc.data().report[i].content,
                    comment = doc.data().report[i].time
                ]).draw();
                table.insertAdjacentHTML('beforeend', row);
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
    .catch(function (error) {
        console.log("Error getting documents: ", error);
    })

// $('#reporttable').dataTable();



function deleteReport(index, docID) {
    var indexOfReport = index;
    if (confirm("Are you sure you want to delete this report? " + index + " " + docID)) {
        db.collection("Report").doc(docID).collection("report").delete().then(function () {
            console.log("Document successfully deleted! ");
        });

    } else {
        console.log("Why!!!")
        return false;
    }
}

function deletePost() {
    if (confirm("Are you sure you want to delete this Post? : " + postID)) {
        db.collection("Post").doc(postID).delete().then(function () {  
            console.log("Document successfully deleted!");
            window.location.href = "table-posts.html";
        }).catch(function (error) {
            console.error("Error removing document: ", error);
        });
    } else {
        console.log("Why!!!")
        return false;
    }
}

// function deletePost() {
//     if (confirm("Are you sure you want to delete this Post? : " + postID)) {
//         var postRef = db.collection("Post").doc(postID);
//         var removeCapital = postRef.update({
//             capital: firebase.firestore.FieldValue.delete()
//         });  
//         window.location.href = "table-posts.html";  
//     } else {
//         console.log("Why!!!")
//         return false;
//     }
// }

