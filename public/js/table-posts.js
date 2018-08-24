var db = firebase.firestore();
var pTable = $('#posttable').DataTable();
var blacklistTable = $('#blacklist-post-table').DataTable();
var deleteTable = $('#delete-post-table').DataTable();
var postDB = db.collection("Post");

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
    showAllPostTableInDay();
    showBlacklistPostTableInDay();
    showDeletePostTableInDay();
}
if (time == "weekly") {
    showAllPostTableInWeek();
    showBlacklistPostTableInWeek();
    showDeletePostTableInWeek();
}
if (time == "monthly") {
    showAllPostTableInMonth();
    showBlacklistPostTableInMonth();
    showDeletePostTableInMonth();
}
if (time == "annual") {
    showAllPostTableInYear();
    showBlacklistPostTableInYear();
    showDeletePostTableInYear();
} else {
    showAllPostTable();
    showBlacklistPostTable();
    showDeletePostTable();
}

function showAllPostTable() {
    postDB.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            console.log(doc.id, " => ", doc.data());
            var table = document.getElementById("listpost");
            var map = doc.data();
            var date = new Date(map.postTime);
            var n = date.toLocaleString();
            var row = '<tr>' +
                '<td>' + doc.id + '</td>' +
                '<td>' + doc.data().postID + '</td>' +
                '<td>' + doc.data().userID + '</td>' +
                '<td>' + doc.data().title + '</td>' +
                '<td>' + doc.data().userName + '</td>' +
                '<td>' + doc.data().like + '</td>' +
                '<td>' + doc.data().comment + '</td>' +
                '<td>' + doc.data().countView + '</td>' +
                '<td>' + n + '</td>' +
                '</tr>';
            pTable.row.add([
                docID = doc.id,
                postID = doc.data().postID,
                userID = doc.data().userID,
                title = doc.data().title,
                userName = doc.data().userName,
                like = doc.data().like,
                comment = doc.data().comment,
                view = doc.data().countView,
                time = n,
            ]).draw();
            table.insertAdjacentHTML('beforeend', row);
        });
        // $('#usertable').dataTable();
        setToDataTableAllPost();
    }).catch(function (error) {
        console.log("Error getting documents: ", error);
    });
}


function showAllPostTableInDay() {
    postDB.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            console.log(doc.id, " => ", doc.data());
            var map = doc.data();
            var dateNow = new Date();
            var day = new Date(map.postTime);
            if (day.getDate() == dateNow.getDate() && day.getMonth() == dateNow.getMonth() && day.getFullYear() == dateNow.getFullYear()) {
                var table = document.getElementById("listpost");
                var map = doc.data();
                var date = new Date(map.postTime);
                var n = date.toLocaleString();
                var row = '<tr>' +
                    '<td>' + doc.id + '</td>' +
                    '<td>' + doc.data().postID + '</td>' +
                    '<td>' + doc.data().userID + '</td>' +
                    '<td>' + doc.data().title + '</td>' +
                    '<td>' + doc.data().like + '</td>' +
                    '<td>' + doc.data().comment + '</td>' +
                    '<td>' + doc.data().countView + '</td>' +
                    '<td>' + n + '</td>' +
                    '</tr>';
                pTable.row.add([
                    docID = doc.id,
                    postID = doc.data().postID,
                    userID = doc.data().userID,
                    title = doc.data().title,
                    like = doc.data().like,
                    comment = doc.data().comment,
                    view = doc.data().countView,
                    time = n,
                ]).draw();
                table.insertAdjacentHTML('beforeend', row);

            } else {
                console.log("something happen");
            }

        });
        // $('#usertable').dataTable();
        setToDataTableAllPost();
    }).catch(function (error) {
        console.log("Error getting documents: ", error);
    });
}


function showAllPostTableInWeek() {
    postDB.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            console.log(doc.id, " => ", doc.data());
            var map = doc.data();
            var dateNow = new Date();
            var day = new Date(map.postTime);
            if (weekOfYear(dateNow) == weekOfYear(day) && day.getMonth() == dateNow.getMonth() && day.getFullYear() == dateNow.getFullYear()) {
                var table = document.getElementById("listpost");
                var map = doc.data();
                var date = new Date(map.postTime);
                var n = date.toLocaleString();
                var row = '<tr>' +
                    '<td>' + doc.id + '</td>' +
                    '<td>' + doc.data().postID + '</td>' +
                    '<td>' + doc.data().userID + '</td>' +
                    '<td>' + doc.data().title + '</td>' +
                    '<td>' + doc.data().like + '</td>' +
                    '<td>' + doc.data().comment + '</td>' +
                    '<td>' + doc.data().countView + '</td>' +
                    '<td>' + n + '</td>' +
                    '</tr>';
                pTable.row.add([
                    docID = doc.id,
                    postID = doc.data().postID,
                    userID = doc.data().userID,
                    title = doc.data().title,
                    like = doc.data().like,
                    comment = doc.data().comment,
                    view = doc.data().countView,
                    time = n,
                ]).draw();
                table.insertAdjacentHTML('beforeend', row);

            } else {
                console.log("something happen");
            }

        });
        // $('#usertable').dataTable();
        setToDataTableAllPost();
    }).catch(function (error) {
        console.log("Error getting documents: ", error);
    });
}


function showAllPostTableInMonth() {
    postDB.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            console.log(doc.id, " => ", doc.data());
            var map = doc.data();
            var dateNow = new Date();
            var day = new Date(map.postTime);
            if (day.getMonth() == dateNow.getMonth() && day.getFullYear() == dateNow.getFullYear()) {
                var table = document.getElementById("listpost");
                var map = doc.data();
                var date = new Date(map.postTime);
                var n = date.toLocaleString();
                var row = '<tr>' +
                    '<td>' + doc.id + '</td>' +
                    '<td>' + doc.data().postID + '</td>' +
                    '<td>' + doc.data().userID + '</td>' +
                    '<td>' + doc.data().title + '</td>' +
                    '<td>' + doc.data().like + '</td>' +
                    '<td>' + doc.data().comment + '</td>' +
                    '<td>' + doc.data().countView + '</td>' +
                    '<td>' + n + '</td>' +
                    '</tr>';
                pTable.row.add([
                    docID = doc.id,
                    postID = doc.data().postID,
                    userID = doc.data().userID,
                    title = doc.data().title,
                    like = doc.data().like,
                    comment = doc.data().comment,
                    view = doc.data().countView,
                    time = n,
                ]).draw();
                table.insertAdjacentHTML('beforeend', row);

            } else {
                console.log("something happen");
            }

        });
        // $('#usertable').dataTable();
        setToDataTableAllPost();
    }).catch(function (error) {
        console.log("Error getting documents: ", error);
    });
}


function showAllPostTableInYear() {
    postDB.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            console.log(doc.id, " => ", doc.data());
            var map = doc.data();
            var dateNow = new Date();
            var day = new Date(map.postTime);
            if (day.getFullYear() == dateNow.getFullYear()) {
                var table = document.getElementById("listpost");
                var map = doc.data();
                var date = new Date(map.postTime);
                var n = date.toLocaleString();
                var row = '<tr>' +
                    '<td>' + doc.id + '</td>' +
                    '<td>' + doc.data().postID + '</td>' +
                    '<td>' + doc.data().userID + '</td>' +
                    '<td>' + doc.data().title + '</td>' +
                    '<td>' + doc.data().like + '</td>' +
                    '<td>' + doc.data().comment + '</td>' +
                    '<td>' + doc.data().countView + '</td>' +
                    '<td>' + n + '</td>' +
                    '</tr>';
                pTable.row.add([
                    docID = doc.id,
                    postID = doc.data().postID,
                    userID = doc.data().userID,
                    title = doc.data().title,
                    like = doc.data().like,
                    comment = doc.data().comment,
                    view = doc.data().countView,
                    time = n,
                ]).draw();
                table.insertAdjacentHTML('beforeend', row);

            } else {
                console.log("something happen");
            }

        });
        // $('#usertable').dataTable();
        setToDataTableAllPost();
    }).catch(function (error) {
        console.log("Error getting documents: ", error);
    });
}


function showBlacklistPostTable() {

    postDB.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            if (doc.data().numberOfReported > 0) {
                var table = document.getElementById("blacklist-post");
                var map = doc.data();
                var date = new Date(map.postTime);
                var n = date.toLocaleString();
                var row = '<tr>' +
                    '<td>' + doc.id + '</td>' +
                    '<td>' + doc.data().postID + '</td>' +
                    '<td>' + doc.data().userID + '</td>' +
                    '<td>' + doc.data().title + '</td>' +
                    '<td>' + doc.data().userName + '</td>' +
                    '<td>' + doc.data().like + '</td>' +
                    '<td>' + doc.data().comment + '</td>' +
                    '<td>' + doc.data().countView + '</td>' +
                    '<td>' + n + '</td>' +
                    '<td>' + doc.data().numberOfReported + '</td>' +
                    '</tr>';
                blacklistTable.row.add([
                    docID = doc.id,
                    postID = doc.data().postID,
                    userID = doc.data().userID,
                    title = doc.data().title,
                    userName = userName,
                    like = doc.data().like,
                    comment = doc.data().comment,
                    view = doc.data().countView,
                    time = n,
                    numberOfReported = doc.data().numberOfReported
                ]).draw();
                table.insertAdjacentHTML('beforeend', row);
            }

        });
        // $('#usertable').dataTable();
        setToDataTableBlackList();
    }).catch(function (error) {
        console.log("Error getting documents: ", error);
    });
}

function showBlacklistPostTableInDay() {

    postDB.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            var map = doc.data();
            var dateNow = new Date();
            var day = new Date(map.postTime);
            if (day.getDate() == dateNow.getDate() && day.getMonth() == dateNow.getMonth() && day.getFullYear() == dateNow.getFullYear()) {
                if (doc.data().numberOfReported != null || doc.data().numberOfReported > 0) {
                    var table = document.getElementById("blacklist-post");
                    var map = doc.data();
                    var date = new Date(map.postTime);
                    var n = date.toLocaleString();
                    var row = '<tr>' +
                        '<td>' + doc.id + '</td>' +
                        '<td>' + doc.data().postID + '</td>' +
                        '<td>' + doc.data().userID + '</td>' +
                        '<td>' + doc.data().title + '</td>' +
                        '<td>' + doc.data().userName + '</td>' +
                        '<td>' + doc.data().like + '</td>' +
                        '<td>' + doc.data().comment + '</td>' +
                        '<td>' + doc.data().countView + '</td>' +
                        '<td>' + n + '</td>' +
                        '<td>' + doc.data().numberOfReported + '</td>' +
                        '</tr>';
                    blacklistTable.row.add([
                        docID = doc.id,
                        postID = doc.data().postID,
                        userID = doc.data().userID,
                        title = doc.data().title,
                        userName = userName,
                        like = doc.data().like,
                        comment = doc.data().comment,
                        view = doc.data().countView,
                        time = n,
                        numberOfReported = doc.data().numberOfReported
                    ]).draw();
                    table.insertAdjacentHTML('beforeend', row);
                }
            }


        });
        // $('#usertable').dataTable();
        setToDataTableBlackList();
    }).catch(function (error) {
        console.log("Error getting documents: ", error);
    });
}

function showBlacklistPostTableInWeek() {

    postDB.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            var map = doc.data();
            var dateNow = new Date();
            var day = new Date(map.postTime);
            if (weekOfYear(dateNow) == weekOfYear(day) && day.getMonth() == dateNow.getMonth() && day.getFullYear() == dateNow.getFullYear()) {
                if (doc.data().numberOfReported != null || doc.data().numberOfReported > 0) {
                    var table = document.getElementById("blacklist-post");
                    var map = doc.data();
                    var date = new Date(map.postTime);
                    var n = date.toLocaleString();
                    var row = '<tr>' +
                        '<td>' + doc.id + '</td>' +
                        '<td>' + doc.data().postID + '</td>' +
                        '<td>' + doc.data().userID + '</td>' +
                        '<td>' + doc.data().title + '</td>' +
                        '<td>' + doc.data().userName + '</td>' +
                        '<td>' + doc.data().like + '</td>' +
                        '<td>' + doc.data().comment + '</td>' +
                        '<td>' + doc.data().countView + '</td>' +
                        '<td>' + n + '</td>' +
                        '<td>' + doc.data().numberOfReported + '</td>' +
                        '</tr>';
                    blacklistTable.row.add([
                        docID = doc.id,
                        postID = doc.data().postID,
                        userID = doc.data().userID,
                        title = doc.data().title,
                        userName = userName,
                        like = doc.data().like,
                        comment = doc.data().comment,
                        view = doc.data().countView,
                        time = n,
                        numberOfReported = doc.data().numberOfReported
                    ]).draw();
                    table.insertAdjacentHTML('beforeend', row);
                }
            }


        });
        // $('#usertable').dataTable();
        setToDataTableBlackList();
    }).catch(function (error) {
        console.log("Error getting documents: ", error);
    });
}

function showBlacklistPostTableInMonth() {

    postDB.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            var map = doc.data();
            var dateNow = new Date();
            var day = new Date(map.postTime);
            if (day.getMonth() == dateNow.getMonth() && day.getFullYear() == dateNow.getFullYear()) {
                if (doc.data().numberOfReported != null || doc.data().numberOfReported > 0) {
                    var table = document.getElementById("blacklist-post");
                    var map = doc.data();
                    var date = new Date(map.postTime);
                    var n = date.toLocaleString();
                    var row = '<tr>' +
                        '<td>' + doc.id + '</td>' +
                        '<td>' + doc.data().postID + '</td>' +
                        '<td>' + doc.data().userID + '</td>' +
                        '<td>' + doc.data().title + '</td>' +
                        '<td>' + doc.data().userName + '</td>' +
                        '<td>' + doc.data().like + '</td>' +
                        '<td>' + doc.data().comment + '</td>' +
                        '<td>' + doc.data().countView + '</td>' +
                        '<td>' + n + '</td>' +
                        '<td>' + doc.data().numberOfReported + '</td>' +
                        '</tr>';
                    blacklistTable.row.add([
                        docID = doc.id,
                        postID = doc.data().postID,
                        userID = doc.data().userID,
                        title = doc.data().title,
                        userName = userName,
                        like = doc.data().like,
                        comment = doc.data().comment,
                        view = doc.data().countView,
                        time = n,
                        numberOfReported = doc.data().numberOfReported
                    ]).draw();
                    table.insertAdjacentHTML('beforeend', row);
                }
            }


        });
        // $('#usertable').dataTable();
        setToDataTableBlackList();
    }).catch(function (error) {
        console.log("Error getting documents: ", error);
    });
}

function showBlacklistPostTableInYear() {

    postDB.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            var map = doc.data();
            var dateNow = new Date();
            var day = new Date(map.postTime);
            if (day.getFullYear() == dateNow.getFullYear()) {
                if (doc.data().numberOfReported != null || doc.data().numberOfReported > 0) {
                    var table = document.getElementById("blacklist-post");
                    var map = doc.data();
                    var date = new Date(map.postTime);
                    var n = date.toLocaleString();
                    var row = '<tr>' +
                        '<td>' + doc.id + '</td>' +
                        '<td>' + doc.data().postID + '</td>' +
                        '<td>' + doc.data().userID + '</td>' +
                        '<td>' + doc.data().title + '</td>' +
                        '<td>' + doc.data().userName + '</td>' +
                        '<td>' + doc.data().like + '</td>' +
                        '<td>' + doc.data().comment + '</td>' +
                        '<td>' + doc.data().countView + '</td>' +
                        '<td>' + n + '</td>' +
                        '<td>' + doc.data().numberOfReported + '</td>' +
                        '</tr>';
                    blacklistTable.row.add([
                        docID = doc.id,
                        postID = doc.data().postID,
                        userID = doc.data().userID,
                        title = doc.data().title,
                        userName = userName,
                        like = doc.data().like,
                        comment = doc.data().comment,
                        view = doc.data().countView,
                        time = n,
                        numberOfReported = doc.data().numberOfReported
                    ]).draw();
                    table.insertAdjacentHTML('beforeend', row);
                }
            }


        });
        // $('#usertable').dataTable();
        setToDataTableBlackList();
    }).catch(function (error) {
        console.log("Error getting documents: ", error);
    });
}


function showDeletePostTable() {

    postDB.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            if (doc.data().status == false) {
                var table = document.getElementById("delete-post");
                var map = doc.data();
                var date = new Date(map.postTime);
                var n = date.toLocaleString();
                var row = '<tr>' +
                    '<td>' + doc.id + '</td>' +
                    '<td>' + doc.data().postID + '</td>' +
                    '<td>' + doc.data().userID + '</td>' +
                    '<td>' + doc.data().title + '</td>' +
                    '<td>' + doc.data().userName + '</td>' +
                    '<td>' + doc.data().like + '</td>' +
                    '<td>' + doc.data().comment + '</td>' +
                    '<td>' + doc.data().countView + '</td>' +
                    '<td>' + n + '</td>' +
                    '<td>' + doc.data().numberOfReported + '</td>' +
                    '</tr>';
                deleteTable.row.add([
                    docID = doc.id,
                    postID = doc.data().postID,
                    userID = doc.data().userID,
                    title = doc.data().title,
                    userName = userName,
                    like = doc.data().like,
                    comment = doc.data().comment,
                    view = doc.data().countView,
                    time = n,
                    numberOfReported = doc.data().numberOfReported
                ]).draw();
                table.insertAdjacentHTML('beforeend', row);
            }

        });
        // $('#usertable').dataTable();
        setToDataTableDelete();
    }).catch(function (error) {
        console.log("Error getting documents: ", error);
    });
}

function showDeletePostTableInDay() {

    postDB.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            var map = doc.data();
            var dateNow = new Date();
            var day = new Date(map.postTime);
            if (day.getDate() == dateNow.getDate() && day.getMonth() == dateNow.getMonth() && day.getFullYear() == dateNow.getFullYear()) {
                if (doc.data().status == false) {
                    var table = document.getElementById("delete-post");
                    var map = doc.data();
                    var date = new Date(map.postTime);
                    var n = date.toLocaleString();
                    var row = '<tr>' +
                        '<td>' + doc.id + '</td>' +
                        '<td>' + doc.data().postID + '</td>' +
                        '<td>' + doc.data().userID + '</td>' +
                        '<td>' + doc.data().title + '</td>' +
                        '<td>' + doc.data().userName + '</td>' +
                        '<td>' + doc.data().like + '</td>' +
                        '<td>' + doc.data().comment + '</td>' +
                        '<td>' + doc.data().countView + '</td>' +
                        '<td>' + n + '</td>' +
                        '<td>' + doc.data().numberOfReported + '</td>' +
                        '</tr>';
                    deleteTable.row.add([
                        docID = doc.id,
                        postID = doc.data().postID,
                        userID = doc.data().userID,
                        title = doc.data().title,
                        userName = userName,
                        like = doc.data().like,
                        comment = doc.data().comment,
                        view = doc.data().countView,
                        time = n,
                        numberOfReported = doc.data().numberOfReported
                    ]).draw();
                    table.insertAdjacentHTML('beforeend', row);
                }
            }


        });
        // $('#usertable').dataTable();
        setToDataTableDelete();
    }).catch(function (error) {
        console.log("Error getting documents: ", error);
    });
}

function showDeletePostTableInWeek() {

    postDB.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            var map = doc.data();
            var dateNow = new Date();
            var day = new Date(map.postTime);
            if (weekOfYear(dateNow) == weekOfYear(day) && day.getMonth() == dateNow.getMonth() && day.getFullYear() == dateNow.getFullYear()) {
                if (doc.data().status == false) {
                    var table = document.getElementById("delete-post");
                    var map = doc.data();
                    var date = new Date(map.postTime);
                    var n = date.toLocaleString();
                    var row = '<tr>' +
                        '<td>' + doc.id + '</td>' +
                        '<td>' + doc.data().postID + '</td>' +
                        '<td>' + doc.data().userID + '</td>' +
                        '<td>' + doc.data().title + '</td>' +
                        '<td>' + doc.data().userName + '</td>' +
                        '<td>' + doc.data().like + '</td>' +
                        '<td>' + doc.data().comment + '</td>' +
                        '<td>' + doc.data().countView + '</td>' +
                        '<td>' + n + '</td>' +
                        '<td>' + doc.data().numberOfReported + '</td>' +
                        '</tr>';
                    deleteTable.row.add([
                        docID = doc.id,
                        postID = doc.data().postID,
                        userID = doc.data().userID,
                        title = doc.data().title,
                        userName = userName,
                        like = doc.data().like,
                        comment = doc.data().comment,
                        view = doc.data().countView,
                        time = n,
                        numberOfReported = doc.data().numberOfReported
                    ]).draw();
                    table.insertAdjacentHTML('beforeend', row);
                }
            }


        });
        // $('#usertable').dataTable();
        setToDataTableDelete();
    }).catch(function (error) {
        console.log("Error getting documents: ", error);
    });
}

function showDeletePostTableInMonth() {

    postDB.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            var map = doc.data();
            var dateNow = new Date();
            var day = new Date(map.postTime);
            if (day.getMonth() == dateNow.getMonth() && day.getFullYear() == dateNow.getFullYear()) {
                if (doc.data().status == false) {
                    var table = document.getElementById("delete-post");
                    var map = doc.data();
                    var date = new Date(map.postTime);
                    var n = date.toLocaleString();
                    var row = '<tr>' +
                        '<td>' + doc.id + '</td>' +
                        '<td>' + doc.data().postID + '</td>' +
                        '<td>' + doc.data().userID + '</td>' +
                        '<td>' + doc.data().title + '</td>' +
                        '<td>' + doc.data().userName + '</td>' +
                        '<td>' + doc.data().like + '</td>' +
                        '<td>' + doc.data().comment + '</td>' +
                        '<td>' + doc.data().countView + '</td>' +
                        '<td>' + n + '</td>' +
                        '<td>' + doc.data().numberOfReported + '</td>' +
                        '</tr>';
                    deleteTable.row.add([
                        docID = doc.id,
                        postID = doc.data().postID,
                        userID = doc.data().userID,
                        title = doc.data().title,
                        userName = userName,
                        like = doc.data().like,
                        comment = doc.data().comment,
                        view = doc.data().countView,
                        time = n,
                        numberOfReported = doc.data().numberOfReported
                    ]).draw();
                    table.insertAdjacentHTML('beforeend', row);
                }
            }


        });
        // $('#usertable').dataTable();
        setToDataTableDelete();
    }).catch(function (error) {
        console.log("Error getting documents: ", error);
    });
}

function showDeletePostTableInYear() {

    postDB.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            var map = doc.data();
            var dateNow = new Date();
            var day = new Date(map.postTime);
            if (day.getFullYear() == dateNow.getFullYear()) {
                if (doc.data().status == false) {
                    var table = document.getElementById("delete-post");
                    var map = doc.data();
                    var date = new Date(map.postTime);
                    var n = date.toLocaleString();
                    var row = '<tr>' +
                        '<td>' + doc.id + '</td>' +
                        '<td>' + doc.data().postID + '</td>' +
                        '<td>' + doc.data().userID + '</td>' +
                        '<td>' + doc.data().title + '</td>' +
                        '<td>' + doc.data().userName + '</td>' +
                        '<td>' + doc.data().like + '</td>' +
                        '<td>' + doc.data().comment + '</td>' +
                        '<td>' + doc.data().countView + '</td>' +
                        '<td>' + n + '</td>' +
                        '<td>' + doc.data().numberOfReported + '</td>' +
                        '</tr>';
                    deleteTable.row.add([
                        docID = doc.id,
                        postID = doc.data().postID,
                        userID = doc.data().userID,
                        title = doc.data().title,
                        userName = userName,
                        like = doc.data().like,
                        comment = doc.data().comment,
                        view = doc.data().countView,
                        time = n,
                        numberOfReported = doc.data().numberOfReported
                    ]).draw();
                    table.insertAdjacentHTML('beforeend', row);
                }
            }


        });
        // $('#usertable').dataTable();
        setToDataTableDelete();
    }).catch(function (error) {
        console.log("Error getting documents: ", error);
    });
}

function setToDataTableAllPost() {
    $('#posttable').DataTable({
        "destroy": true,
        "jQueryUI": true,
        "pagingType": "full_numbers",
        "columnDefs": [

            {
                "targets": 3,
                "render": function (data, type, row) {
                    if (type === "display") {
                        return "<a href=\"post-detail?docID=" + encodeURIComponent(row[0]) + "\">" + data + "</a>";
                    }
                    return data;
                }
            },
            {
                "targets": 4,
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
                "targets": [1],
                "visible": false
            },
            {
                "targets": [2],
                "visible": false
            },
        ]
    });
}


function setToDataTableBlackList() {
    $('#blacklist-post-table').DataTable({
        "destroy": true,
        "jQueryUI": true,
        "pagingType": "full_numbers",
        "columnDefs": [
            {
                "targets": 3,
                "render": function (data, type, row) {
                    if (type === "display") {
                        return "<a href=\"post-detail?docID=" + encodeURIComponent(row[0]) + "\">" + data + "</a>";
                    }
                    return data;
                }
            },
            {
                "targets": 4,
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
                "targets": [1],
                "visible": false
            },
            {
                "targets": [2],
                "visible": false
            },
        ]
    });
}

function setToDataTableDelete() {
    $('#delete-post-table').DataTable({
        "destroy": true,
        "jQueryUI": true,
        "pagingType": "full_numbers",
        "columnDefs": [

            {
                "targets": 3,
                "render": function (data, type, row) {
                    if (type === "display") {
                        return "<a href=\"post-detail?docID=" + encodeURIComponent(row[0]) + "\">" + data + "</a>";
                    }
                    return data;
                }
            },
            {
                "targets": 4,
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
                "targets": [1],
                "visible": false
            },
            {
                "targets": [2],
                "visible": false
            },
        ]
    });
}