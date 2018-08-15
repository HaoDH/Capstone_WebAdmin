var db = firebase.firestore();
var pTable = $('#posttable').DataTable();

db.collection("Post")
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            console.log(doc.id, " => ", doc.data());
            var table = document.getElementById("listpost");
            var row = '<tr>' +
                '<td>' + doc.id + '</td>' +
                '<td>' + doc.data().postID + '</td>' +
                '<td>' + doc.data().userID + '</td>' +
                '<td>' + doc.data().like + '</td>' +
                '<td>' + doc.data().comment + '</td>' +
                '<td>' + doc.data().difficult + '</td>' +
                '<td>' + doc.data().description + '</td>' +
                '</tr>';
            pTable.row.add([
                docID = doc.id,
                postID = doc.data().postID,
                userName = doc.data().userID,
                like = doc.data().like,
                comment = doc.data().comment,
                difficult = doc.data().difficult,
                description = doc.data().description
            ]).draw();
            console.log(row);
            table.insertAdjacentHTML('beforeend', row);
        });
        
        // $('#usertable').dataTable();
        $('#posttable').DataTable({
            "destroy": true,
            "jQueryUI": true,
            "pagingType": "full_numbers",
            "columnDefs": [{
                "targets": 0,
                "render": function(data, type, row) {
                    if (type === "display") {
                        return "<a href=\"post-detail?docID=" + encodeURIComponent(data) + "\">" + data + "</a>";
                    }
                    return data;
                }
            }]
        });


        $(document).ready(function() {
            var table = $('#posttable').DataTable();

            $('#posttable tbody').on('click', 'tr', function() {
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
    });