var db = firebase.firestore();
var t = $('#usertable').DataTable();
Handlebars.registerHelper('noop', function (options) {
    return options.fn(this);
});

var userDB = db.collection("User");


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

var weekOfYear = function (date) {
    var d = new Date(+date);
    d.setHours(0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    return Math.ceil((((d - new Date(d.getFullYear(), 0, 1)) / 8.64e7) + 1) / 7);
};


var time = getUrlParameter('time');
if (time == "daily") {
    showAllUserTableInDay();
    showBlacklistUserTableInDay();
}
if (time == "weekly") {
    showAllUserTableInWeek();
    showBlacklistUserTableInWeek();
} 
if (time == "monthly") {
    showAllUserTableInMonth();
    showBlacklistUserTableInMonth();
}
if (time == "annual") {
    showAllUserTableInYear();
    showBlacklistUserTableInYear();
}else {
    showAllUserTable();
    showBlacklistUserTable();
}

function showAllUserTable() {
    userDB.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            console.log(doc.id, " => ", doc.data());
            $('#exampless').dataTable();
            var table = document.getElementById("listusers");
            var col = '<tr>' +
                '<td>' + doc.id + '</td> ' +
                '<td>' + doc.data().userID + '</td> ' +
                '<td>' + doc.data().firstName + '</td> ' +
                '<td>' + doc.data().sex + '</td> ' +
                '<td>' + doc.data().dateOfBirth + '</td>' +
                '<td>' + doc.data().phone + '</td>' +
                '<td>' + doc.data().secondName + '</td>' +
                '</tr>';
            t.row.add([
                docID = doc.id,
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
    }).catch(function (error) {
        console.log("Error getting documents: ", error);
    });
}

function showAllUserTableInDay() {
    userDB.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            console.log(doc.id, " => ", doc.data());
            var map = doc.data();
            var dateNow = new Date();
            var day = new Date(map.time);
            if (day.getDate() == dateNow.getDate() && day.getMonth() == dateNow.getMonth() && day.getFullYear() == dateNow.getFullYear()) {
                $('#exampless').dataTable();
                var table = document.getElementById("listusers");
                var col = '<tr>' +
                    '<td>' + doc.id + '</td> ' +
                    '<td>' + doc.data().userID + '</td> ' +
                    '<td>' + doc.data().firstName + '</td> ' +
                    '<td>' + doc.data().sex + '</td> ' +
                    '<td>' + doc.data().dateOfBirth + '</td>' +
                    '<td>' + doc.data().phone + '</td>' +
                    '<td>' + doc.data().secondName + '</td>' +
                    '</tr>';
                t.row.add([
                    docID = doc.id,
                    userID = doc.data().userID,
                    fistName = doc.data().firstName,
                    sex = doc.data().sex,
                    dateOfBirth = doc.data().dateOfBirth,
                    phone = doc.data().phone,
                    secondName = doc.data().secondName
                ]).draw();
                table.insertAdjacentHTML('beforeend', col);
                //table.innerHTML(col);
            }
           
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
    }).catch(function (error) {
        console.log("Error getting documents: ", error);
    });
}

function showAllUserTableInWeek() {
    userDB.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            console.log(doc.id, " => ", doc.data());
            var map = doc.data();
            var dateNow = new Date();
            var day = new Date(map.time);
            if (weekOfYear(dateNow) == weekOfYear(day) && day.getMonth() == dateNow.getMonth() && day.getFullYear() == dateNow.getFullYear()) {
                $('#exampless').dataTable();
                var table = document.getElementById("listusers");
                var col = '<tr>' +
                    '<td>' + doc.id + '</td> ' +
                    '<td>' + doc.data().userID + '</td> ' +
                    '<td>' + doc.data().firstName + '</td> ' +
                    '<td>' + doc.data().sex + '</td> ' +
                    '<td>' + doc.data().dateOfBirth + '</td>' +
                    '<td>' + doc.data().phone + '</td>' +
                    '<td>' + doc.data().secondName + '</td>' +
                    '</tr>';
                t.row.add([
                    docID = doc.id,
                    userID = doc.data().userID,
                    fistName = doc.data().firstName,
                    sex = doc.data().sex,
                    dateOfBirth = doc.data().dateOfBirth,
                    phone = doc.data().phone,
                    secondName = doc.data().secondName
                ]).draw();
                table.insertAdjacentHTML('beforeend', col);
                //table.innerHTML(col);
            }
           
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
    }).catch(function (error) {
        console.log("Error getting documents: ", error);
    });
}

function showAllUserTableInMonth() {
    userDB.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            console.log(doc.id, " => ", doc.data());
            var map = doc.data();
            var dateNow = new Date();
            var day = new Date(map.time);
            if (day.getMonth() == dateNow.getMonth() && day.getFullYear() == dateNow.getFullYear()) {
                $('#exampless').dataTable();
                var table = document.getElementById("listusers");
                var col = '<tr>' +
                    '<td>' + doc.id + '</td> ' +
                    '<td>' + doc.data().userID + '</td> ' +
                    '<td>' + doc.data().firstName + '</td> ' +
                    '<td>' + doc.data().sex + '</td> ' +
                    '<td>' + doc.data().dateOfBirth + '</td>' +
                    '<td>' + doc.data().phone + '</td>' +
                    '<td>' + doc.data().secondName + '</td>' +
                    '</tr>';
                t.row.add([
                    docID = doc.id,
                    userID = doc.data().userID,
                    fistName = doc.data().firstName,
                    sex = doc.data().sex,
                    dateOfBirth = doc.data().dateOfBirth,
                    phone = doc.data().phone,
                    secondName = doc.data().secondName
                ]).draw();
                table.insertAdjacentHTML('beforeend', col);
                //table.innerHTML(col);
            }
           
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
    }).catch(function (error) {
        console.log("Error getting documents: ", error);
    });
}

function showAllUserTableInYear() {
    userDB.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            console.log(doc.id, " => ", doc.data());
            var map = doc.data();
            var dateNow = new Date();
            var day = new Date(map.time);
            if (day.getFullYear() == dateNow.getFullYear()) {
                $('#exampless').dataTable();
                var table = document.getElementById("listusers");
                var col = '<tr>' +
                    '<td>' + doc.id + '</td> ' +
                    '<td>' + doc.data().userID + '</td> ' +
                    '<td>' + doc.data().firstName + '</td> ' +
                    '<td>' + doc.data().sex + '</td> ' +
                    '<td>' + doc.data().dateOfBirth + '</td>' +
                    '<td>' + doc.data().phone + '</td>' +
                    '<td>' + doc.data().secondName + '</td>' +
                    '</tr>';
                t.row.add([
                    docID = doc.id,
                    userID = doc.data().userID,
                    fistName = doc.data().firstName,
                    sex = doc.data().sex,
                    dateOfBirth = doc.data().dateOfBirth,
                    phone = doc.data().phone,
                    secondName = doc.data().secondName
                ]).draw();
                table.insertAdjacentHTML('beforeend', col);
                //table.innerHTML(col);
            }
           
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
    }).catch(function (error) {
        console.log("Error getting documents: ", error);
    });
}
function showBlacklistUserTable() {
    userDB.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            if (doc.data().postRemoved != null || doc.data().postRemoved > 0) {
                $('#exampless').dataTable();
                var table = document.getElementById("blacklist-user");
                var col = '<tr>' +
                    '<td>' + doc.id + '</td> ' +
                    '<td>' + doc.data().userID + '</td> ' +
                    '<td>' + doc.data().firstName + '</td> ' +
                    '<td>' + doc.data().sex + '</td> ' +
                    '<td>' + doc.data().dateOfBirth + '</td>' +
                    '<td>' + doc.data().phone + '</td>' +
                    '<td>' + doc.data().secondName + '</td>' +
                    '<td>' + doc.data().postRemoved + '</td>' +
                    '</tr>';
                t.row.add([
                    docID = doc.id,
                    userID = doc.data().userID,
                    fistName = doc.data().firstName,
                    sex = doc.data().sex,
                    dateOfBirth = doc.data().dateOfBirth,
                    phone = doc.data().phone,
                    secondName = doc.data().secondName,
                    postRemoved = doc.data().postRemoved
                ]).draw();
                console.log(col);
                table.insertAdjacentHTML('beforeend', col);
            }

            //table.innerHTML(col);
        });
        // $('#usertable').dataTable();
        $('#blacklist-user-table').DataTable({
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
    }).catch(function (error) {
        console.log("Error getting documents: ", error);
    });
}

function showBlacklistUserTableInDay() {
    userDB.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            var map = doc.data();
            var dateNow = new Date();
            var day = new Date(map.time);
            if (day.getDate() == dateNow.getDate() && day.getMonth() == dateNow.getMonth() && day.getFullYear() == dateNow.getFullYear()) {
                if (doc.data().postRemoved != null || doc.data().postRemoved > 0) {
                    $('#exampless').dataTable();
                    var table = document.getElementById("blacklist-user");
                    var col = '<tr>' +
                        '<td>' + doc.id + '</td> ' +
                        '<td>' + doc.data().userID + '</td> ' +
                        '<td>' + doc.data().firstName + '</td> ' +
                        '<td>' + doc.data().sex + '</td> ' +
                        '<td>' + doc.data().dateOfBirth + '</td>' +
                        '<td>' + doc.data().phone + '</td>' +
                        '<td>' + doc.data().secondName + '</td>' +
                        '<td>' + doc.data().postRemoved + '</td>' +
                        '</tr>';
                    t.row.add([
                        docID = doc.id,
                        userID = doc.data().userID,
                        fistName = doc.data().firstName,
                        sex = doc.data().sex,
                        dateOfBirth = doc.data().dateOfBirth,
                        phone = doc.data().phone,
                        secondName = doc.data().secondName,
                        postRemoved = doc.data().postRemoved
                    ]).draw();
                    console.log(col);
                    table.insertAdjacentHTML('beforeend', col);
                }
    
            }
            
            //table.innerHTML(col);
        });
        // $('#usertable').dataTable();
        $('#blacklist-user-table').DataTable({
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
    }).catch(function (error) {
        console.log("Error getting documents: ", error);
    });
}

function showBlacklistUserTableInWeek() {
    userDB.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            var map = doc.data();
            var dateNow = new Date();
            var day = new Date(map.time);
            if (weekOfYear(dateNow) == weekOfYear(day) && day.getMonth() == dateNow.getMonth() && day.getFullYear() == dateNow.getFullYear()) {
                if (doc.data().postRemoved != null || doc.data().postRemoved > 0) {
                    $('#exampless').dataTable();
                    var table = document.getElementById("blacklist-user");
                    var col = '<tr>' +
                        '<td>' + doc.id + '</td> ' +
                        '<td>' + doc.data().userID + '</td> ' +
                        '<td>' + doc.data().firstName + '</td> ' +
                        '<td>' + doc.data().sex + '</td> ' +
                        '<td>' + doc.data().dateOfBirth + '</td>' +
                        '<td>' + doc.data().phone + '</td>' +
                        '<td>' + doc.data().secondName + '</td>' +
                        '<td>' + doc.data().postRemoved + '</td>' +
                        '</tr>';
                    t.row.add([
                        docID = doc.id,
                        userID = doc.data().userID,
                        fistName = doc.data().firstName,
                        sex = doc.data().sex,
                        dateOfBirth = doc.data().dateOfBirth,
                        phone = doc.data().phone,
                        secondName = doc.data().secondName,
                        postRemoved = doc.data().postRemoved
                    ]).draw();
                    console.log(col);
                    table.insertAdjacentHTML('beforeend', col);
                }
    
            }
            
            //table.innerHTML(col);
        });
        // $('#usertable').dataTable();
        $('#blacklist-user-table').DataTable({
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
    }).catch(function (error) {
        console.log("Error getting documents: ", error);
    });
}

function showBlacklistUserTableInMonth() {
    userDB.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            var map = doc.data();
            var dateNow = new Date();
            var day = new Date(map.time);
            if (day.getMonth() == dateNow.getMonth() && day.getFullYear() == dateNow.getFullYear()) {
                if (doc.data().postRemoved != null || doc.data().postRemoved > 0) {
                    $('#exampless').dataTable();
                    var table = document.getElementById("blacklist-user");
                    var col = '<tr>' +
                        '<td>' + doc.id + '</td> ' +
                        '<td>' + doc.data().userID + '</td> ' +
                        '<td>' + doc.data().firstName + '</td> ' +
                        '<td>' + doc.data().sex + '</td> ' +
                        '<td>' + doc.data().dateOfBirth + '</td>' +
                        '<td>' + doc.data().phone + '</td>' +
                        '<td>' + doc.data().secondName + '</td>' +
                        '<td>' + doc.data().postRemoved + '</td>' +
                        '</tr>';
                    t.row.add([
                        docID = doc.id,
                        userID = doc.data().userID,
                        fistName = doc.data().firstName,
                        sex = doc.data().sex,
                        dateOfBirth = doc.data().dateOfBirth,
                        phone = doc.data().phone,
                        secondName = doc.data().secondName,
                        postRemoved = doc.data().postRemoved
                    ]).draw();
                    console.log(col);
                    table.insertAdjacentHTML('beforeend', col);
                }
    
            }
            
            //table.innerHTML(col);
        });
        // $('#usertable').dataTable();
        $('#blacklist-user-table').DataTable({
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
    }).catch(function (error) {
        console.log("Error getting documents: ", error);
    });
}

function showBlacklistUserTableInYear() {
    userDB.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            var map = doc.data();
            var dateNow = new Date();
            var day = new Date(map.time);
            if (day.getFullYear() == dateNow.getFullYear()) {
                if (doc.data().postRemoved != null || doc.data().postRemoved > 0) {
                    $('#exampless').dataTable();
                    var table = document.getElementById("blacklist-user");
                    var col = '<tr>' +
                        '<td>' + doc.id + '</td> ' +
                        '<td>' + doc.data().userID + '</td> ' +
                        '<td>' + doc.data().firstName + '</td> ' +
                        '<td>' + doc.data().sex + '</td> ' +
                        '<td>' + doc.data().dateOfBirth + '</td>' +
                        '<td>' + doc.data().phone + '</td>' +
                        '<td>' + doc.data().secondName + '</td>' +
                        '<td>' + doc.data().postRemoved + '</td>' +
                        '</tr>';
                    t.row.add([
                        docID = doc.id,
                        userID = doc.data().userID,
                        fistName = doc.data().firstName,
                        sex = doc.data().sex,
                        dateOfBirth = doc.data().dateOfBirth,
                        phone = doc.data().phone,
                        secondName = doc.data().secondName,
                        postRemoved = doc.data().postRemoved
                    ]).draw();
                    console.log(col);
                    table.insertAdjacentHTML('beforeend', col);
                }
    
            }
            
            //table.innerHTML(col);
        });
        // $('#usertable').dataTable();
        $('#blacklist-user-table').DataTable({
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
    }).catch(function (error) {
        console.log("Error getting documents: ", error);
    });
}
