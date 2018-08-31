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
        console.log("Number of step: " + doc.data().postSteps);
        var step = doc.data().postSteps;
        function Data(numberOfStep, description, imgURL, temp, time_duration) {
            this.numberOfStep = numberOfStep;
            this.description = description;
            this.imgURL = imgURL;
            this.temp = temp;
            this.time_duration = time_duration;
        }
        var i;
        var cast = [];
        for (i = 0; i < step.length; i++) {
            console.log("data of step: " + step[i].description);
            cast.push(new Data(i + 1, step[i].description, step[i].imgURL, step[i].temp, step[i].time_duration));
        }
        var jsonString = JSON.stringify(cast);
        // document.write(jsonString);

        for (var x in cast) {
            // alert(cast[x].description);
        }

        //loading information
        $(document).ready(function () {
            var source = $("#load-step-content").html();
            var template = Handlebars.compile(source);
            var el_html = template(cast);
            $("#div-step-content").html(el_html);
        });

        $(document).ready(function () {
            var source = $("#load-post-detail").html();
            var template = Handlebars.compile(source);
            var map = doc.data();
            var date = new Date(map.postTime);
            var postTime = date.toLocaleString();
            var context = {
                urlImage: doc.data().urlImage,
                title: doc.data().title,
                
                userName: doc.data().userName,
              
                dateCreate: postTime
            }
            var el_html = template(context);
            $("#post-detail-panel-div").html(el_html);
        });
        $(document).ready(function () {
            var source = $("#load-post-contain").html();
            var template = Handlebars.compile(source);

            var context = {
                // urlImage: doc.data().urlImage,
                // title: doc.data().title,
                // userID: doc.data().userID,
                userName: doc.data().userName,
                description: doc.data().description,
                userImgUrl: doc.data().userImgUrl,
                urlImage: doc.data().urlImage,

                // postID: doc.data().postID,
                // dateCreate: doc.data().dateCreate
            }
            var el_html = template(context);
            $("#div-post-content").html(el_html);
        });
        $(document).ready(function () {
            var source = $("#load-post-rate-time-view").html();
            var template = Handlebars.compile(source);
            console.log("RATE: " + doc.data().numberOfRate)
            var context = {
                numberOfRate: doc.data().numberOfRate,
                time: doc.data().time,
                countView: doc.data().countView,
                like: doc.data().like,
                comment: doc.data().comment,
            }
            var el_html = template(context);
            $("#div-rate-time-view").html(el_html);
        });
        $(document).ready(function () {
            var source = $("#load-info-post").html();
            var template = Handlebars.compile(source);
            if(doc.data().numberOfReported < 5){
                $("#btn-delete").hide();
            }else{
                $("#btn-delete").show();
            }
            var context = {
                description: doc.data().description,
                numberOfReported: doc.data().numberOfReported,
            }
            var el_html = template(context);
            $("#more-info-post").html(el_html);
            if (doc.data().numberOfReported == 0) {
                document.getElementById("process").innerHTML = "<div class=progress>" +
                    "</div>";
            }
            if (doc.data().numberOfReported == 1) {
                document.getElementById("process").innerHTML = "<div class=progress>" +
                    "<div class='progress-bar progress-bar-success' style='width: 20%'><span class=sr-only>1 Reported</span></div>" +
                    "</div>";
            }
            if (doc.data().numberOfReported == 2) {
                document.getElementById("process").innerHTML = "<div class=progress>" +
                    "<div class='progress-bar progress-bar-success' style='width: 20%'><span class=sr-only>1 Reported</span></div>" +
                    "<div class= 'progress-bar progress-bar-warning' style='width:20%'><span class=sr-only>2 Reported</span></div>" +
                    "</div>";
            }
            if (doc.data().numberOfReported == 3) {
                document.getElementById("process").innerHTML = "<div class=progress>" +
                    "<div class='progress-bar progress-bar-success' style='width: 20%'><span class=sr-only>1 Reported</span></div>" +
                    "<div class= 'progress-bar progress-bar-warning' style='width:20%'><span class=sr-only>2 Reported</span></div>" +
                    "<div class= 'progress-bar progress-bar-warning' style='width:20%'><span class=sr-only>2 Reported</span></div>" +
                    "</div>";
            }
            if (doc.data().numberOfReported == 4) {
                document.getElementById("process").innerHTML = "<div class=progress>" +
                    "<div class='progress-bar progress-bar-success' style='width: 20%'><span class=sr-only>1 Reported</span></div>" +
                    "<div class= 'progress-bar progress-bar-warning' style='width:20%'><span class=sr-only>2 Reported</span></div>" +
                    "<div class= 'progress-bar progress-bar-warning' style='width:20%'><span class=sr-only>2 Reported</span></div>" +
                    "<div class= 'progress-bar progress-bar-danger' style='width:20%'><span class=sr-only>2 Reported</span></div>" +
                    "</div>";
            }
            if (doc.data().numberOfReported == 5) {
                document.getElementById("process").innerHTML = "<div class=progress>" +
                    "<div class='progress-bar progress-bar-success' style='width: 20%'><span class=sr-only>1 Reported</span></div>" +
                    "<div class= 'progress-bar progress-bar-warning' style='width:20%'><span class=sr-only>2 Reported</span></div>" +
                    "<div class= 'progress-bar progress-bar-warning' style='width:20%'><span class=sr-only>2 Reported</span></div>" +
                    "<div class= 'progress-bar progress-bar-danger' style='width:20%'><span class=sr-only>2 Reported</span></div>" +
                    "<div class= 'progress-bar progress-bar-danger' style='width:20%'><span class=sr-only>2 Reported</span></div>" +
                    "</div>";
            }
        });
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
                            var map = doc.data();
                            var date = new Date(map.time);
                            var time = date.toLocaleString();
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
                                    // '<td>' + doc.data().userID + '</td>' +
                                    '<td>' + doc.data().userName + '</td>' +
                                    '<td>' + status + '</td>' +
                                    '<td>' + doc.data().content + '</td>' +
                                    '<td>' + time + '</td>' +
                                    '<td>' + '<button onclick="addApproval(' + "'" + doc.id + "'" + ')" class="btn btn-default" style="border-color: RED; color: red">Accept</button>' + '</td>' +
                                    '<td>' + '<button onclick="deleteReport(' + "'" + doc.id + "'" + ')" class="btn btn-default">Reject</button>' + '</td>' +
                                    '</tr>';
                                reportTable.row.add([
                                    // postID = doc.data().userID,
                                    userName = "<a href=\"profile?userID=" + doc.data().userID + "\">" + doc.data().userName + "</a>",
                                    status = status,
                                    like = doc.data().content,
                                    time = time,
                                    approval = '<button onclick="addApproval(' + "'" + doc.id + "'" + ')" class="btn btn-default" style="border-color: RED; color: red">Accept</button>',
                                    cancel = '<button onclick="deleteReport(' + "'" + doc.id + "'" + ')" class="btn btn-default">Reject</button>'
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
        db.collection("Report").doc(reportID).collection("listreport").doc(docID).update({
            status : 2,
        })
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
                if (number >= 5) {
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
                db.collection("Report").doc(reportID).collection("listreport").doc(_docID).update({
                    status : 1,
                })
            } else {
                console.log("Why!!!")
                return false;
            }
        }
    }).catch(function (error) {
        console.log("Data error: " + error);
    })
}
