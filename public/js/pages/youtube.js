var db = firebase.firestore();

var youtubeDB = db.collection("Youtube");
var btnYoutube = document.getElementById("btn-youtube");

youtubeDB.doc("da4TQIAv0u1pcmKpbquN").delete();
var ID = function () {
    return '' + Math.random().toString(36).substr(2, 9);
};
function uploadYoutube() {
    if (confirm("Are you sure you want to upload this video?")) {
        var yTitle = document.getElementById("titleYoutube").value;
        var yCode = document.getElementById("codeYoutube").value;
        var yID = ID();
        var timestamp = firebase.firestore.FieldValue.serverTimestamp();
        if (yCode != "" && yTitle != "") {
            console.log("Title: " + yTitle + " - Code: " + yCode);
            youtubeDB.doc().set({
                tipID: yID,
                title: yTitle,
                youtubeUrl: yCode,
                timestamp: timestamp
            })
            window.alert("Video uploaded!!!");
        } else {
            window.alert("Please enter value in the title and youtube code")
        }
        window.location.reload(true);
    } else {
        return false;
    }
}

var reportTable = $("#youtube-table").DataTable();
youtubeDB.get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
        console.log("Document data:", doc.data());
        var i = 0;
        var table = document.getElementById("list-youtube");
        var map = doc.data();
        var date = new Date(map.timestamp);
        var time = date.toLocaleString();
        var rows = '<tr>' +
            // '<td>' + doc.id + '</td>' +
            '<td>' + doc.data().tipID + '</td>' +
            '<td>' + doc.data().title + '</td>' +
            '<td>' + doc.data().youtubeUrl + '</td>' +
            '<td>' + time + '</td>' +
            '<td>' + '<button class="btn btn-default" style="border-color: RED; color: red" onclick="deleteVideo(' + "'" + doc.id + "'" + ')" class="btn btn-default">Delete</button>' + '</td>' +
            '</tr>';
        reportTable.row.add([
            // docID = doc.id,
            tipID = doc.data().tipID,
            title = doc.data().title,
            youtubeCode = doc.data().youtubeUrl,
            timestamp = time,
            cancel = '<button class="btn btn-default" style="border-color: RED; color: red" onclick=deleteVideo(' + doc.id + ')" class="btn btn-default">Delete</button>'
        ]).draw();
        table.insertAdjacentHTML('beforeend', rows);
    });

    $('#youtube-table').DataTable({
        "destroy": true,
        "jQueryUI": true,
        "pagingType": "full_numbers",
        "columnDefs": [
            {
                "targets": 2,
                "render": function (data, type, row) {
                    if (type === "display") {
                        return "<a  target=_blank href=\"https://www.youtube.com/watch?v=" + data + "\">" + data + "</a>";
                    }
                    return data;
                }
            },
            {
                "targets": 1,
                "render": function (data, type, row) {
                    if (type === "display") {
                        return "<a  target=_blank href=\"https://www.youtube.com/watch?v=" + row[2] + "\">" + data + "</a>";
                    }
                    return data;
                }
            }
        ]
    });
    var table = $('#youtube-table').DataTable();

})

function deleteVideo(docID) {
    if (confirm("Are you sure you want to delete this Post? : ")) {
        db.collection("Youtube").doc(docID).delete().then(function () {
            console.log("Youtube successfully deleted!");
            // window.location.href = "youtube";
            window.location.reload(true);
        }).catch(function (error) {
            console.error("Error removing document: ", error);
        });
    } else {
        console.log("Why!!!")
        return false;
    }
}